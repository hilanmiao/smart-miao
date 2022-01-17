'use strict';

const Controller = require('../core/controller');

class AccountInOutController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ amount: 'string' }, ctx.request.body)
    const { accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, amount, remark } = ctx.request.body

    const res = await ctx.service.accountInOut.create({ account_book_id, account_in_out_category_id, type, amount, remark })

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
    ctx.validate({ id: 'string', amount: 'string' }, ctx.request.body)
    const { id, accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, amount, remark } = ctx.request.body

    const res = await ctx.service.accountInOut.update({ id, account_book_id, account_in_out_category_id, type, amount, remark })

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

    const res = await ctx.service.accountInOut.delete({ ids })

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

    const res = await ctx.service.accountInOut.get({ id })

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

    const res = await ctx.service.accountInOut.list()

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, dateRange } = ctx.request.query

    const res = await ctx.service.accountInOut.page({ page, limit, account_book_id, account_in_out_category_id, type, dateRange })

    this.success({ ctx, data: res })
  }
}

module.exports = AccountInOutController;
