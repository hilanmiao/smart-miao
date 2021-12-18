'use strict';

const dayjs = require('dayjs')


/**
 * 在每一个客户端连接或者退出时发生作用
 * @param app
 * @return {(function(*, *): Promise<void>)|*}
 */
module.exports = app => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;
    const { socketOnlineUserRoomName: room } = app.config.sysConfig.socket
    const { redisOnlineUsersKey, redisOnlineUserSocketKey } = app.config.sysConfig.redis

    // 用户信息
    const rooms = [ room ];
    const { accessToken } = query;

    logger.debug('#user_info', id, room);

    const kick = (id, msg) => {
      logger.debug('#kick', id, msg);

      // 踢出用户前发送消息
      socket.emit(id, helper.parseSocketMsg({ action: 'deny', payload: msg }));

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      nsp.adapter.remoteDisconnect(id, true, err => {
        logger.error(err);
      });
    };

    /**
     * 在线用户列表模块并不准确，只能算个玩具，要求不高的话可以用用，产品级别还需要加很多东西
     * 如：accessToken应该校验有效性、包含的用户是否已经删除、用户是否在黑名单、用户是否已经被踢下线了等等很多逻辑
     * 再如：使用redis有序集合存储用户列表，但是上线和下线是很频繁发生的，索引会经常变动，分页的正确性就是个很大问题，还有数据过滤的问题
     */

    // 校验accessToken
    const decodedToken = ctx.helper.decodeToken(accessToken);

    // 如果token验证不正确或没有
    if (!decodedToken) {
      kick(id, {
        type: 'deleted',
        message: 'deleted, accessToken is valid'
      });
      return;
    }

    // token过期
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      kick(id, {
        type: 'deleted',
        message: 'deleted, accessToken is expired'
      });
      return;
    }

    // 用户加入
    logger.info('#join', room);
    socket.join(room);

    // 在线列表
    nsp.adapter.clients(rooms, async (err, clients) => {
      logger.info('#online_join', clients);

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${id}) joined.`,
      });

      // 存储到有序集合中
      await app.redis.zadd(redisOnlineUsersKey, dayjs().valueOf(), decodedToken.user.username)
      // 并映射username 和 socketid
      const MAX_TTL = 24 * 60 * 60;// 最大过期时长，兜底用
      await app.redis.setex(`${redisOnlineUserSocketKey}:${decodedToken.user.username}`, MAX_TTL, id)
    });

    await next();

    // 用户离开
    logger.info('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, async (err, clients) => {
      logger.info('#online_leave', clients);

      // 获取 client 信息
      // const clientsDetail = {};
      // clients.forEach(client => {
      //   const _client = app.io.sockets.sockets[client];
      //   const _query = _client.handshake.query;
      //   clientsDetail[client] = _query;
      // });

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `User(${id}) leaved.`,
      });

      // 更新有序集合
      await app.redis.zrem(redisOnlineUsersKey, decodedToken.user.username)
      await app.redis.del(`${redisOnlineUserSocketKey}:${decodedToken.user.username}`)
    });
  };
};
