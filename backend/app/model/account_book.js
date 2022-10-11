'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM, JSON, DECIMAL, BOOLEAN } = app.Sequelize;
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
      type: DECIMAL(19, 2),
      comment: '余额',
      defaultValue: 0
    },
    is_default: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否是默认'
    },
    remark: {
      type: TEXT,
      comment: '备注'
    },
    user_id: {
      type: UUID,
      comment: '用户Id'
    }
  }, {
    comment: '账本表'
  });

  AccountBook.associate = function() {
    AccountBook.belongsTo(app.model.SystemUser, { foreignKey: 'user_id', targetKey: 'id', constraints: false });
  }

  return AccountBook;
};
