'use strict';

const Controller = require('../core/controller');

class BagController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ type: 'string' }, ctx.request.body)
    const { type, content } = ctx.request.body

    const res = await ctx.service.bag.create({ type, content })

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
    ctx.validate({ id: 'string', type: 'string' }, ctx.request.body)
    const { id, type, content } = ctx.request.body

    const res = await ctx.service.bag.update({ id, type, content })

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

    const res = await ctx.service.bag.delete({ ids })

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

    const res = await ctx.service.bag.get({ id })

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

    const res = await ctx.service.bag.list()

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, name } = ctx.request.query

    const res = await ctx.service.bag.page({ page, limit, name })

    this.success({ ctx, data: res })
  }
}

module.exports = BagController;
