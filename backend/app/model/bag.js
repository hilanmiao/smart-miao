'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM, JSON } = app.Sequelize;
  const Bag = base.defineModel(app, 'bag', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    type: {
      type: STRING,
      comment: '类型'
    },
    content: {
      type: JSON,
      comment: '内容'
    }
  }, {
    comment: '卡证照表'
  });

  return Bag;
};
