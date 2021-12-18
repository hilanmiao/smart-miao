'use strict';

const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN, TEXT } = app.Sequelize;
  const NotificationUser = base.defineModel(app, 'notification_user', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    notification_id: {
      type: UUID,
      comment: '系统通知Id'
    },
    recipient_id: {
      type: UUID,
      comment: '接受通知的用户Id'
    },
    is_read: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否已读'
    }
  }, {
    comment: '系统通知用户表'
  });

  NotificationUser.associate = function() {
    NotificationUser.belongsTo(app.model.Notification, { foreignKey: 'notification_id', targetKey: 'id', constraints: false });
  };

  return NotificationUser;
};
