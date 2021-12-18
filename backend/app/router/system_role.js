'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemRole } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/role', tokenRequired, systemRole.create);
  apiRouter.put('/system/role', tokenRequired, systemRole.update);
  apiRouter.delete('/system/role', tokenRequired, systemRole.delete);
  apiRouter.get('/system/role', tokenRequired, systemRole.get);
  apiRouter.get('/system/role/list', tokenRequired, systemRole.list);
  apiRouter.get('/system/role/page', tokenRequired, systemRole.page);
  // apiRouter.resources('system/role', '/system/role', systemRole)
};
