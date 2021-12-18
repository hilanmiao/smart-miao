'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, TEXT, ENUM } = app.Sequelize;
  const Notification = base.defineModel(app, 'notification', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    title: {
      type: STRING,
      comment: '标题'
    },
    content: {
      type: TEXT,
      comment: '内容'
    },
    type: {
      type: ENUM,
      values: ['1', '2'],
      defaultValue: '1',
      comment: '发送类型：1单用户 2全体用户'
    },
    recipient_id: {
      type: UUID,
      comment: '接受通知的用户Id'
    },
    manager_id: {
      type: UUID,
      comment: '发布通知的管理员Id'
    },
    remark: {
      type: STRING,
      comment: '备注'
    }
  }, {
    comment: '消息通知表'
  });

  Notification.associate = function() {
    Notification.hasMany(app.model.NotificationUser, { foreignKey: 'notification_id', sourceKey: 'id', constraints: false });
    Notification.belongsTo(app.model.SystemUser, { as: 'manager_user', foreignKey: 'manager_id', targetKey: 'id', constraints: false });
    Notification.belongsTo(app.model.SystemUser, { as: 'recipient_user', foreignKey: 'recipient_id', targetKey: 'id', constraints: false });
  }

  return Notification;
};
