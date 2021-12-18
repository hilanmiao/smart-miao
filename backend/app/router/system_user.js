'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemUser } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.put('/system/user/profile', tokenRequired, systemUser.updateCurrentUserProfile);
  apiRouter.post('/system/user', tokenRequired, systemUser.create);
  apiRouter.put('/system/user', tokenRequired, systemUser.update);
  apiRouter.delete('/system/user', tokenRequired, systemUser.delete);
  apiRouter.get('/system/user', tokenRequired, systemUser.get);
  apiRouter.get('/system/user/list', tokenRequired, systemUser.list);
  apiRouter.get('/system/user/page', tokenRequired, systemUser.page);
  apiRouter.get('/system/user/basic', tokenRequired, systemUser.getUserBasic);
  // apiRouter.resources('system/user', '/system/user', systemUser)
};
