'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemOnlineUser } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.delete('/system/online-user/kick', tokenRequired, systemOnlineUser.kick);
  apiRouter.get('/system/online-user/page', tokenRequired, systemOnlineUser.page);
  // apiRouter.resources('system/role', '/system/role', systemRole)
};
