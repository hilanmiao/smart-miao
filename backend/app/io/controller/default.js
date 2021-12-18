'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseSocketMsg({ action: 'exchange', payload, metadata: { client, target } });
      nsp.emit(target, msg);
    } catch (error) {
      app.logger.error(error);
    }
  }

}

module.exports = DefaultController;
