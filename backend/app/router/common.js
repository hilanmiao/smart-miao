'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller } = app;
  const { common } = controller

  // 获取图片验证码
  apiRouter.get('/common/captcha/img', common.getImgCaptcha);

};
