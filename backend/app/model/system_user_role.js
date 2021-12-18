'use strict';

const base = require('./base');

module.exports = app => {
  const { UUID } = app.Sequelize;
  const SystemUserRole = base.defineModel(app, 'system_user_role', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: UUID,
      comment: '用户Id'
    },
    role_id: {
      type: UUID,
      comment: '角色Id'
    }
  }, {
    comment: '系统-用户角色表',
    paranoid: false
  });

  return SystemUserRole;
};
