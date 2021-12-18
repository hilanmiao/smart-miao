'use strict';

const svgCaptcha = require('svg-captcha');
const _ = require('lodash')

const Service = require('egg/index').Service;

class CommonService extends Service {

  /**
   * 获取图片验证码
   * @param width
   * @param height
   * @return {Promise<{img: string, id: *}>}
   */
  async getImgCaptcha({ width = 100, height = 50 } = {}) {
    const { ctx } = this;
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 1,
      width,
      height,
      ignoreChars: '0Oo1iIl', // 过滤掉一些字符，例如0o1i
      // background: '#cc9966'
    });
    const res = {
      img: `data:image/svg+xml;base64,${new Buffer(svg.data).toString('base64')}`,
      id: ctx.helper.generateUUID()
    };

    // 放入缓存中，并设置过期时间
    const { redisCaptchaImgKeyPrefix } = this.config.sysConfig.redis
    await this.app.redis.setex(`${redisCaptchaImgKeyPrefix}:${res.id}`, 60 * 10, svg.text)

    return res
  }

  /**
   * 校验图片验证码
   * @param id
   * @param code
   * @returns {Promise<{res: string, key: string}|{code: number}>}
   */
  async verifyImgCaptcha({ id, code }) {
    const { ctx } = this;
    const { redisCaptchaImgKeyPrefix } = this.config.sysConfig.redis
    const key = `${redisCaptchaImgKeyPrefix}:${id}`
    // 从缓存中取出
    const res = await this.app.redis.get(key)

    if (_.isEmpty(res)) {
      // 验证码已失效
      return { code: 20108 }
    }
    if (code.toLowerCase() !== res.toLowerCase()) {
      // 验证码不正确
      return { code: 20106 }
    }

    // 检验成功移除验证码
    await this.app.redis.del(key)

    return { key, res }
  }
}

module.exports = CommonService;
