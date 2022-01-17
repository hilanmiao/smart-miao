'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { accountBook } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/account-book', tokenRequired, accountBook.create);
  apiRouter.put('/account-book', tokenRequired, accountBook.update);
  apiRouter.delete('/account-book', tokenRequired, accountBook.delete);
  apiRouter.get('/account-book', tokenRequired, accountBook.get);
  apiRouter.get('/account-book/list', tokenRequired, accountBook.list);
  apiRouter.get('/account-book/page', tokenRequired, accountBook.page);
  // apiRouter.resources('account-book', '/account-book', accountBook)
};
