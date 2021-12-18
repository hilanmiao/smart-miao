'use strict';

const Controller = require('../core/controller');

class NotificationController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ title: 'string' }, ctx.request.body)
    const { title, content, type, recipientIds: recipient_ids, remark } = ctx.request.body

    const res = await ctx.service.notification.create({ title, content, type, recipient_ids, remark })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const { ctx } = this;
    ctx.validate({ id: 'string', title: 'string' }, ctx.request.body)
    const { id, title, content, type, remark } = ctx.request.body

    const res = await ctx.service.notification.update({ id, title, content, type, remark })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 删除
   * @return {Promise<void>}
   */
  async delete() {
    const { ctx } = this;
    const { ids } = ctx.request.body

    const res = await ctx.service.notification.delete({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 详情
   * @return {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    ctx.validate({ id: 'string' }, ctx.request.query)
    const { id } = ctx.request.query

    const res = await ctx.service.notification.get({ id })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 查询
   * @return {Promise<void>}
   */
  async list() {
    const { ctx } = this;

    const res = await ctx.service.notification.list()

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, title } = ctx.request.query

    const res = await ctx.service.notification.page({ page, limit, title })

    this.success({ ctx, data: res })
  }

  /**
   * 分页我的
   * @return {Promise<void>}
   */
  async pageMine() {
    const { ctx } = this;
    const { page, limit, isRead: is_read } = ctx.request.query

    const res = await ctx.service.notification.pageMine({ page, limit, is_read })

    this.success({ ctx, data: res })
  }

  /**
   * 同步
   * @return {Promise<void>}
   */
  async sync() {
    const { ctx } = this;

    const res = await ctx.service.notification.sync()

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 统计我的未读
   * @return {Promise<void>}
   */
  async countMyUnread() {
    const { ctx } = this;

    const res = await ctx.service.notification.countMyUnread()

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 已读
   * @return {Promise<void>}
   */
  async read() {
    const { ctx } = this;
    const { ids } = ctx.request.body

    const res = await ctx.service.notification.read({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }
}

module.exports = NotificationController;
