'use strict';

const Controller = require('../core/controller');

class SystemLoginLogController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;

    const res = await ctx.service.systemLoginLog.create()

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    let { page, limit, dateRange } = ctx.request.query
    dateRange = JSON.parse(dateRange)

    const res = await ctx.service.systemLoginLog.page({ page, limit, dateRange })

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async pageMine() {
    const { ctx } = this;
    let { page, limit, dateRange } = ctx.request.query
    dateRange = JSON.parse(dateRange)
    const user = ctx.request.user

    const res = await ctx.service.systemLoginLog.page({ page, limit, dateRange, username: user.username })

    this.success({ ctx, data: res })
  }
}

module.exports = SystemLoginLogController;
