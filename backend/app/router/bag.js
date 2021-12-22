'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { bag } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/bag', tokenRequired, bag.create);
  apiRouter.put('/bag', tokenRequired, bag.update);
  apiRouter.delete('/bag', tokenRequired, bag.delete);
  apiRouter.get('/bag', tokenRequired, bag.get);
  apiRouter.get('/bag/list', tokenRequired, bag.list);
  apiRouter.get('/bag/page', tokenRequired, bag.page);
  // apiRouter.resources('bag', '/bag', bag)
};
