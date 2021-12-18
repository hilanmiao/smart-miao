'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SystemRole = base.defineModel(app, 'system_role', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      comment: '名称'
    },
    remark: {
      type: STRING,
      comment: '备注'
    },
  }, {
    comment: '系统-角色表',
    paranoid: false
  });

  SystemRole.associate = function() {
    // SystemRole.hasMany(app.model.SystemRolePower, { foreignKey: 'role_id', sourceKey: 'id', constraints: false });
    SystemRole.belongsToMany(app.model.SystemPower, { through: app.model.SystemRolePower, foreignKey: 'role_id', otherKey: 'power_id', constraints: false });
    SystemRole.belongsToMany(app.model.SystemUser, { through: app.model.SystemUserRole, foreignKey: 'role_id', otherKey: 'user_id', constraints: false });
  }

  return SystemRole;
};
