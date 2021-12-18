'use strict';

// 通常在应用系统里面的权限我们把它表现为菜单的访问(页面级)、功能模块的操作(功能级)、文件上传的删改，甚至页面上某个按钮、图片是否可见等等都属于权限的范畴。
// 有些权限设计，会把功能操作作为一类，而把文件、菜单、页面元素等作为另一类，这样构成“用户-角色-权限-资源”的授权模型。
// 而在做数据表建模时，可把功能操作和资源统一管理，也就是都直接与权限表进行关联，这样可能更具便捷性和易扩展性。

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, ENUM } = app.Sequelize;
  const SystemPower = base.defineModel(app, 'system_power', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    ref_id: {
      type: UUID,
      comment: '外表Id'
    },
    type: {
      type: ENUM,
      values: [ 'menu', 'file', 'element', 'operation' ],
      comment: '权限类型：menu:菜单的访问权限、file:文件的修改权限、element:页面元素的可见性控制、operation:功能模块的操作权限、'
    }
  }, {
    comment: '系统-权限表',
    paranoid: false
  });

  SystemPower.associate = function() {
    SystemPower.hasOne(app.model.SystemMenu, { foreignKey: 'id', sourceKey: 'ref_id', constraints: false });
    SystemPower.hasOne(app.model.SystemOperation, { foreignKey: 'id', sourceKey: 'ref_id', constraints: false });
    SystemPower.belongsToMany(app.model.SystemRole, { through: app.model.SystemRolePower, foreignKey: 'power_id', otherKey: 'role_id', constraints: false });
  }

  return SystemPower;
};
