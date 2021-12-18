'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemLoginLog } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/login-log', tokenRequired, systemLoginLog.create);
  apiRouter.get('/system/login-log/page', tokenRequired, systemLoginLog.page);
};
