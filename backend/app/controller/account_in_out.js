'use strict';

const Controller = require('../core/controller');

class AccountInOutController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ accountBookId: 'string', accountInOutCategoryId: 'string' }, ctx.request.body)
    const { accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, amount, remark, inOutDate: in_out_date } = ctx.request.body

    const res = await ctx.service.accountInOut.create({ account_book_id, account_in_out_category_id, type, amount, remark, in_out_date })

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
    const { id, accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, amount, remark, inOutDate: in_out_date } = ctx.request.body

    const res = await ctx.service.accountInOut.update({ id, account_book_id, account_in_out_category_id, type, amount, remark, in_out_date })

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
    let { page, limit, accountBookId: account_book_id, accountInOutCategoryId: account_in_out_category_id, type, dateRange } = ctx.request.query
    dateRange = JSON.parse(dateRange)

    const res = await ctx.service.accountInOut.page({ page, limit, account_book_id, account_in_out_category_id, type, dateRange })

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * 综合：选择的账本、选择的年月、收或支
   * * @return {Promise<void>}
   */
  async pageComprehensive() {
    const { ctx } = this;
    const { page, limit, accountBookId: account_book_id, type, accountInOutCategoryId: account_in_out_category_id, yearMonth } = ctx.request.query

    const res = await ctx.service.accountInOut.pageComprehensive({ page, limit, account_book_id, type, yearMonth })

    this.success({ ctx, data: res })
  }

  /**
   * 统计本月综合信息
   * @return {Promise<void>}
   */
  async statisticsCurrentMonthComprehensive() {
    const { ctx } = this;

    const res = await ctx.service.accountInOut.statisticsCurrentMonthComprehensive()

    this.success({ ctx, data: res })
  }

  /**
   * 统计本月支出分类排名
   * @return {Promise<void>}
   */
  async statisticsCurrentMonthCategoryRank() {
    const { ctx } = this;

    const res = await ctx.service.accountInOut.statisticsCurrentMonthCategoryRank()

    this.success({ ctx, data: res })
  }

  /**
   * 统计本年每月收支信息
   * @return {Promise<void>}
   */
  async statisticsEveryMonthInOut() {
    const { ctx } = this;

    const res = await ctx.service.accountInOut.statisticsEveryMonthInOut()

    this.success({ ctx, data: res })
  }

  /**
   * 统计本周收支记录
   * @return {Promise<void>}
   */
  async statisticsCurrentWeekInOut() {
    const { ctx } = this;

    const res = await ctx.service.accountInOut.statisticsCurrentWeekInOut()

    this.success({ ctx, data: res })
  }

}

module.exports = AccountInOutController;
