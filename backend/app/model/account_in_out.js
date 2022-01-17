'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM, JSON, DECIMAL } = app.Sequelize;
  const AccountInOut = base.defineModel(app, 'account_in_out', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    account_book_id: {
      type: UUID,
      comment: '账本Id'
    },
    account_in_out_category_id: {
      type: UUID,
      comment: '收支分类Id'
    },
    type: {
      type: ENUM,
      values: [ 'in', 'out' ],
      defaultValue: 'out',
      comment: '收/支：out:支 in：收'
    },
    amount: {
      type: DECIMAL,
      comment: '金额'
    },
    remark: {
      type: TEXT,
      comment: '备注'
    }
  }, {
    comment: '收支明细表'
  });

  AccountInOut.associate = function() {
    AccountInOut.belongsTo(app.model.AccountInOutCategory, { foreignKey: 'account_in_out_category_id', targetKey: 'id', constraints: false });
    AccountInOut.belongsTo(app.model.AccountBook, { foreignKey: 'account_book_id', targetKey: 'id', constraints: false });
  }

  return AccountInOut;
};
