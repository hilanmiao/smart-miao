'use strict';

const { v4: uuidv4 } = require('uuid')

const base = require('./base');

// 如果不需要保留用户的所有登录时间的话，可以不用伪删除
module.exports = app => {
  const { STRING, UUID, Op } = app.Sequelize;
  const SystemSession = base.defineModel(app, 'system_session', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: UUID,
      allowNull: false,
      comment: '用户Id'
    },
    key: {
      type: STRING,
      allowNull: false,
      comment: 'key'
    },
    password_hash: {
      type: STRING,
      allowNull: false,
      comment: '用户密码'
    }
  }, {
    comment: '系统-用户会话表'
  });

  SystemSession.createInstance = async function(user) {
    const document = {
      user_id: user.id,
      key: uuidv4(),
      password_hash: user.password
    }

    const newSession = await SystemSession.create(document)
    const query = { where: { user_id: user.id, key: { [Op.ne]: document.key } } };
    // 上一步如果没有出错的话，再删除旧的
    await SystemSession.destroy(query)

    return newSession
  }

  SystemSession.findByCredentials = async function(id, key) {
    const session = await SystemSession.findByPk(id);
    if (!session) {
      return false;
    }

    return session.key === key ? session : false;
  };

  return SystemSession;
};
