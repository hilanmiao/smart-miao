'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemMenu } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/menu', tokenRequired, systemMenu.create);
  apiRouter.put('/system/menu', tokenRequired, systemMenu.update);
  apiRouter.delete('/system/menu', tokenRequired, systemMenu.delete);
  apiRouter.get('/system/menu/menu-and-parent-menu', tokenRequired, systemMenu.getMenuAndParentMenu);
  apiRouter.get('/system/menu/list', tokenRequired, systemMenu.list);
};
