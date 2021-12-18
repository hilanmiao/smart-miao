'use strict';

const Controller = require('../core/controller');

class SystemPowerController extends Controller {

  /**
   * 获取我的菜单权限
   * @return {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    const res = await ctx.service.systemServer.get()

    this.success({ ctx, data: res })
  }

}

module.exports = SystemPowerController;
