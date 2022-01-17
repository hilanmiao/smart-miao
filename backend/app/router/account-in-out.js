'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { accountInOut } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/account-in-out', tokenRequired, accountInOut.create);
  apiRouter.put('/account-in-out', tokenRequired, accountInOut.update);
  apiRouter.delete('/account-in-out', tokenRequired, accountInOut.delete);
  apiRouter.get('/account-in-out', tokenRequired, accountInOut.get);
  apiRouter.get('/account-in-out/list', tokenRequired, accountInOut.list);
  apiRouter.get('/account-in-out/page', tokenRequired, accountInOut.page);
  // apiRouter.resources('account-in-out', '/account-in-out', accountInOut)
};
