'use strict';

const Controller = require('../core/controller');

class SystemOnlineUserController extends Controller {

  /**
   * 下线
   * @return {Promise<void>}
   */
  async kick() {
    const { ctx } = this;
    const { usernames } = ctx.request.body

    const res = await ctx.service.systemOnlineUser.kick({ usernames })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @returns {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, dateRange } = ctx.request.query

    const res = await ctx.service.systemOnlineUser.page({ page, limit, dateRange })

    this.success({ ctx, data: res })
  }
}

module.exports = SystemOnlineUserController;
