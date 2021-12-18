/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

// 系统公共配置项目
const sysConfig = require('./config_sys');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626422927421_6940';

  // 打开前置代理模式
  config.proxy = true
  config.maxProxyCount = 1;

  // 日志
  config.logger = {
    outputJSON: true
  }

  // 模板配置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks', // 默认模板引擎
    defaultExtension: '.nj', // 省略.nj后缀名
  };

  //  关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: ['*'],
  };

  // 允许跨域
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 上传文件配置
  config.multipart = {
    // mode: 'file',  //file模式上传  默认是流的形式上传
    fileExtensions: ['.rar', '.7z'], // 添加不在默认白名单中的文件类型
    fileSize: '100mb'
  };

  // 配置表单提交的最大限制
  config.bodyParser = {
    jsonLimit: '10mb'
  };

  // 添加你的全局中间件(路由的单独中间件顺序在全局之后)
  config.middleware = ['errorHandler'];

  // 其他配置
  config.sysConfig = sysConfig

  return {
    ...config
  };
};
