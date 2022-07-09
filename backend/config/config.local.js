/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const { v4: uuidv4 } = require('uuid');

// 根据不同环境导入不同配置
const envConfig = require('./config_env_local');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 集群
  config.cluster = {
    listen: {
      path: '',
      port: parseInt(envConfig.port),
      hostname: '',
    },
  };

  // 全局设置响应头
  config.globalHeader = {
    'Powered-by': envConfig.name,
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: envConfig.mysql.host, // 连接的数据库主机地址
    port: envConfig.mysql.port, // mysql服务端口
    database: envConfig.mysql.database, // 数据库名
    username: envConfig.mysql.user, // 数据库用户名
    password: envConfig.mysql.password, // 数据库密码
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    define: {
      freezeTableName: true, // 设置后表不用加s
      timestamps: true, // 禁用时间戳 creaedAt 转 created_at问题
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    },
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: false,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  // redis
  config.redis = {
    client: {
      port: envConfig.redis.port,
      host: envConfig.redis.host,
      password: envConfig.redis.password,
      db: envConfig.redis.db,
    },
  };

  // socket.io
  exports.io = {
    init: {
      // transports: ['websocket'],
      // pingInterval: 5000,
      // allowEIO3: true,
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['packet'],
      },
    },
    redis: {
      port: envConfig.redis.port,
      host: envConfig.redis.host,
      password: envConfig.redis.password,
      db: envConfig.redis.db,
    },
    generateId: req => {
      // 自定义 socket.id 生成函数
      // const data = qs.parse(req.url.split('?')[1]);
      // console.log('socket generateId:', req)
      // 添加username仅仅是为了方便调试查看用户，不能做其他用途，请使用token解析获取用户信息
      return `${req._query.username}_${uuidv4()}`; // custom id must be unique
    },
  };

  // alinode 性能平台
  config.alinode = {
    server: envConfig.alinode.server,
    appid: envConfig.alinode.appid,
    secret: envConfig.alinode.secret
  };

  // 其他配置
  config.envConfig = envConfig

  return {
    ...config
  };
};
