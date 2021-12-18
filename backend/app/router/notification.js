'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { notification } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.put('/notification/read', tokenRequired, notification.read);
  apiRouter.get('/notification/page-mine', tokenRequired, notification.pageMine);
  apiRouter.get('/notification/my-unread', tokenRequired, notification.countMyUnread);
  apiRouter.post('/notification/sync', tokenRequired, notification.sync);
  apiRouter.post('/notification', tokenRequired, notification.create);
  apiRouter.put('/notification', tokenRequired, notification.update);
  apiRouter.delete('/notification', tokenRequired, notification.delete);
  apiRouter.get('/notification', tokenRequired, notification.get);
  apiRouter.get('/notification/list', tokenRequired, notification.list);
  apiRouter.get('/notification/page', tokenRequired, notification.page);
  // apiRouter.resources('notification', '/notification', notification)
};
