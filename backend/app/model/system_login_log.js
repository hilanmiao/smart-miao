'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SystemLoginLog = base.defineModel(app, 'system_login_log', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: STRING,
      comment: '登录名'
    },
    ip: {
      type: STRING,
      comment: '登录IP'
    },
    ua: {
      type: STRING,
      comment: '用户代理'
    }
  }, {
    comment: '系统-登录日志表'
  });

  SystemLoginLog.associate = function() {
  }

  return SystemLoginLog;
};
