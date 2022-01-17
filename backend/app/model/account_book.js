'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM, JSON, DECIMAL } = app.Sequelize;
  const AccountBook = base.defineModel(app, 'account_book', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    name: {
      type: STRING,
      comment: '名称'
    },
    balance: {
      type: DECIMAL,
      comment: '余额',
      defaultValue: 0
    },
    remark: {
      type: TEXT,
      comment: '备注'
    }
  }, {
    comment: '账本表'
  });

  return AccountBook;
};
