'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');

  const { controller, middleware } = app;
  const { login } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/login', login.login);
  apiRouter.put('/logout', tokenRequired, login.logout);

};
