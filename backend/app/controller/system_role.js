'use strict';

const Controller = require('../core/controller');

class SystemRoleController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ name: 'string' }, ctx.request.body)
    const { name, remark, powerMenus, powerOperations } = ctx.request.body

    const res = await ctx.service.systemRole.create({ name, remark, powerMenus, powerOperations })

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
    ctx.validate({ id: 'string', name: 'string' }, ctx.request.body)
    const { id, name, remark, powerMenus, powerOperations } = ctx.request.body

    const res = await ctx.service.systemRole.update({ id, name, remark, powerMenus, powerOperations })

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

    const res = await ctx.service.systemRole.delete({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 详情
   * @returns {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    ctx.validate({ id: 'string' }, ctx.request.query)
    const { id } = ctx.request.query

    const res = await ctx.service.systemRole.get({ id })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 查询
   * @returns {Promise<void>}
   */
  async list() {
    const { ctx } = this;

    const res = await ctx.service.systemRole.list()

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @returns {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, name } = ctx.request.query

    const res = await ctx.service.systemRole.page({ page, limit, name })

    this.success({ ctx, data: res })
  }
}

module.exports = SystemRoleController;
