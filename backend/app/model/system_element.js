'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID } = app.Sequelize;
  const SystemElement = base.defineModel(app, 'system_element', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      comment: '名称'
    }
  }, {
    comment: '系统-页面元素表'
  });

  return SystemElement;
};
