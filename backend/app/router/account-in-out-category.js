'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { accountInOutCategory } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/account-in-out-category', tokenRequired, accountInOutCategory.create);
  apiRouter.put('/account-in-out-category', tokenRequired, accountInOutCategory.update);
  apiRouter.delete('/account-in-out-category', tokenRequired, accountInOutCategory.delete);
  apiRouter.get('/account-in-out-category', tokenRequired, accountInOutCategory.get);
  apiRouter.get('/account-in-out-category/list', tokenRequired, accountInOutCategory.list);
  apiRouter.get('/account-in-out-category/page', tokenRequired, accountInOutCategory.page);
  // apiRouter.resources('account-in-out-category', '/account-in-out-category', accountInOutCategory)
};
