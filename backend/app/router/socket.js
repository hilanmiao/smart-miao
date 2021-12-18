'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { io } = app;

  // socket.io
  io.of('/').route('exchange', io.controller.default.exchange);

};
