'use strict';

const Controller = require('../core/controller');

class SystemPowerController extends Controller {

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
    const { page, limit, dateRange } = ctx.request.query
    const res = await ctx.service.systemLoginLog.page({ page, limit, dateRange })

    this.success({ ctx, data: res })
  }
}

module.exports = SystemPowerController;
