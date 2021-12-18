'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemServer } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/system/server', tokenRequired, systemServer.get);
};
