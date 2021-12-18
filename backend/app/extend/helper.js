'use strict';

const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const yaml = require('js-yaml');
const { v4: uuidv4 } = require('uuid')

let errorMap;

module.exports = {

  /**
   * 成功
   * @param ctx
   * @param data
   */
  success({ ctx, code = 200, data, message = 'success', status = 200 }) {
    ctx.body = {
      code: 200,
      data,
      message
    };
    ctx.status = status;
  },

  /**
   * 失败
   * @param ctx
   * @param code
   * @param data
   * @param message
   */
  fail({ ctx, code, data, message = '', status = 200 }) {
    ctx.body = {
      code,
      data,
      message: message ? message : this.getErrorMessageByCode(code),
    };
    ctx.status = status;
  },

  /**
   * 生成一个uuid
   * @return {*}
   */
  generateUUID() {
    return uuidv4();
  },

  // 创建token
  async createToken(user, session, expirationPeriod) {
    let token = {};

    const JwtSecret = this.config.envConfig.jwtSecret;

    if (session) {
      token = jwt.sign(
        {
          sessionId: session.id,
          sessionKey: session.key,
          passwordHash: session.password_hash,
        },
        JwtSecret,
        { algorithm: 'HS256', expiresIn: expirationPeriod }
      );
    } else {
      const tokenUser = {
        username: user.username,
        // role: user.role,
        // roleName: user.roleName,
        // createdAt: user.createdAt,
        // updatedAt: user.updatedAt,
        id: user.id,
      };

      // console.log(tokenUser)

      token = jwt.sign(
        {
          user: tokenUser,
        },
        JwtSecret,
        { algorithm: 'HS256', expiresIn: expirationPeriod }
      );
    }

    return token;
  },

  // 解码 token
  decodeToken(token) {
    let result;
    // ignoreExpiration: true 不验证令牌到期时间（因为验证逻辑不在这里，不能返回error）
    jwt.verify(token, this.config.envConfig.jwtSecret, { ignoreExpiration: true }, (err, decoded) => {
      if (!err) {
        result = decoded;
      }
    });
    return result;
  },

  /**
   * 根据code获取错误信息
   */
  getErrorMessageByCode(code) {
    if (!errorMap) {
      errorMap = yaml.load(fs.readFileSync(path.join(this.app.config.baseDir, 'config/error_constants.yaml'), 'utf8'));
    }
    return errorMap[code];
  },

  /**
   * socket消息规则解析
   * @param action
   * @param payload
   * @param metadata
   * @returns {{data: {payload: {}, action}, meta: {timestamp: number}}}
   */
  parseSocketMsg({ action, payload = {}, metadata = {} }) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
};
