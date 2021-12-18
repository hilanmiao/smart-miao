'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class NotificationService extends Service {

  /**
   * 创建
   * @param title
   * @param content
   * @param type
   * @param recipient_ids
   * @param remark
   * @return {Promise<{code: number}|{count}>}
   */
  async create({ title, content, type, recipient_ids, remark }) {
    const { ctx } = this;
    const manager_id = ctx.request.user.id
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 批量创建
      if (type === '1') {
        const notifications = _.map(recipient_ids, item => {
          return { title, content, type, recipient_id: item, manager_id, remark }
        });
        await ctx.model.Notification.bulkCreate(notifications, { ignoreDuplicates: true, transaction })
      } else {
        await ctx.model.Notification.create({ title, content, type, manager_id, remark }, { transaction })
      }

      // 提交事务
      await transaction.commit()
      res = { count: recipient_ids.length }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 更新
   * @param id
   * @param title
   * @param content
   * @param type
   * @param remark
   * @return {Promise<{code: number}|{id}>}
   */
  async update({ id, title, content, type, remark }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新通知（不能更新接收者，而且最好是不要更新，而是删除并发送新的通知，社会）
      const modelNofication = await ctx.model.Notification.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelNofication.update({ title, content, type, remark }, { transaction })

      // 提交事务
      await transaction.commit()
      res = { id: modelNofication.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<{code: number}|{count}>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        const modelNotification = await ctx.model.Notification.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        // 删除用户通知
        await ctx.model.NotificationUser.destroy({ where: { notification_id: id }, transaction })
        // 删除通知
        await modelNotification.destroy({ transaction })
      }

      // 提交事务
      await transaction.commit()
      res = { count: ids.length }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 详情
   * @param id
   * @return {Promise<awaited Bluebird<TInstance | null> | Promise<Model> | Promise<Model | null>|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      },
      include: [
        {
          attributes: ['id', 'username'],
          model: ctx.model.SystemUser,
          as: 'manager_user'
        },
        {
          attributes: ['id', 'username'],
          model: ctx.model.SystemUser,
          as: 'recipient_user'
        },
      ]
    }

    const res = await ctx.model.Notification.findOne(op);
    if (!res) {
      // 未找到通知
      return { code: 20701 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<awaited Bluebird<TInstance[]> | Promise<Model[]>>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.Notification.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param title
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async page({ page, limit, title }) {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const op = {
      where: {
        title: { [Op.like]: `%${title || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      attributes: {
        include: [
          [Sequelize.literal(`(
              SELECT COUNT(*)
              FROM notification_user
              WHERE
              notification_user.notification_id = notification.id
              and is_read = 1
          )`),
          'readCount']
        ]
      },
      include: [
        {
          attributes: ['id', 'username'],
          model: ctx.model.SystemUser,
          as: 'manager_user'
        },
        {
          attributes: ['id', 'username'],
          model: ctx.model.SystemUser,
          as: 'recipient_user'
        },
      ]
    }

    let res = await ctx.model.Notification.findAndCountAll(op);
    res = {
      list: res.rows,
      pagination: {
        page,
        size: limit,
        total: res.count
      }
    }

    return res;
  }

  /**
   * 分页
   * @param page
   * @param title
   * @param is_read
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async pageMine({ page, limit, is_read }) {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const currentUser = ctx.request.user
    const op = {
      where: {
        recipient_id: currentUser.id,
        is_read
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      include: [
        {
          model: ctx.model.Notification,
          include: [
            {
              attributes: ['id', 'username'],
              model: ctx.model.SystemUser,
              as: 'manager_user'
            },
          ]
        }
      ],
    }
    let res = await ctx.model.NotificationUser.findAndCountAll(op);
    res = {
      list: res.rows,
      pagination: {
        page,
        size: limit,
        total: res.count
      }
    }

    return res;
  }

  /**
   * 同步
   * @return {Promise<{count}>}
   */
  async sync() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const currentUser = ctx.request.user
    // 查询我没有同步的消息通知，并同步
    const op1 = {
      attributes: ['id'],
      where: {
        [Op.or]: [
          { recipient_id: currentUser.id },
          { type: '2' }
        ]
      }
    }
    const op2 = {
      attributes: ['notification_id'],
      where: {
        recipient_id: currentUser.id
      }
    }
    const ids1 = (await ctx.model.Notification.findAll(op1)).map(item => item.id)
    const ids2 = (await ctx.model.NotificationUser.findAll(op2)).map(item => item.notification_id)
    const ids = _.xor(ids1, ids2)
    const notificationUsers = _.map(ids, id => {
      return { notification_id: id, recipient_id: currentUser.id }
    });
    let res = await ctx.model.NotificationUser.bulkCreate(notificationUsers)
    res = { count: res.length }

    return res;
  }

  /**
   * 统计我的未读
   * @return {Promise<{count: *}>}
   */
  async countMyUnread() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const currentUser = ctx.request.user
    const op = {
      where: {
        is_read: false,
        recipient_id: currentUser.id
      }
    }
    let res = await ctx.model.NotificationUser.count(op)
    res = {
      count: res
    }

    return res;
  }

  /**
   * 已读
   * @param ids
   * @return {Promise<{code: number}|{count}>}
   */
  async read({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        const modelNotificationUser = await ctx.model.NotificationUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        await modelNotificationUser.update({ is_read: true }, { transaction })
      }

      // 提交事务
      await transaction.commit()
      res = { count: ids.length }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }
}

module.exports = NotificationService;
