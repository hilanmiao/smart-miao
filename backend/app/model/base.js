'use strict'

// model 强制规范
// 统一主键，名称必须是 id，类型必须是 UUID
// 所有字段默认为 NULL，除非显式指定
// 统一 timestamp 机制，每个 Model 必须有 createdAt、updatedAt、deletedAt、createdBy、updatedBy、deletedBy
// 伪删除

const { v4: uuidv4 } = require('uuid')

function generateUUID() {
  // return uuidv4().replace(/-/g, '');
  return uuidv4()
}

function defineModel(app, name, attributes, options) {
  const { UUID } = app.Sequelize;

  const attrs = {};
  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull && true;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: true
      };
    }
  }

  attrs.id = {
    type: UUID,
    primaryKey: true,
    defaultValue: () => {
      return generateUUID();
    }
  };

  return app.model.define(name, attrs, Object.assign({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: true,
    // 使用自定义表名
    freezeTableName: true,
    // 不使用驼峰
    underscored: true
  }, options))
}

module.exports = { defineModel };

