'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM, JSON } = app.Sequelize;
  const AccountInOutCategory = base.defineModel(app, 'account_in_out_category', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    name: {
      type: STRING,
      comment: '名称'
    }
  }, {
    comment: '收支分类表'
  });

  return AccountInOutCategory;
};
