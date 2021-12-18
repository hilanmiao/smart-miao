'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemPower } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/system/power/my-power-operations', tokenRequired, systemPower.getMyPowerOperations);
  apiRouter.get('/system/power/my-power-menus', tokenRequired, systemPower.getMyPowerMenus);
};
