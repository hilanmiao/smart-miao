'use strict';

/**
 * 对消息进行预处理
 * @param app
 * @return {(function(*, *): Promise<void>)|*}
 */
module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('res', 'packet received!');
    console.log('packet:', ctx.packet);
    await next();
  };
};
