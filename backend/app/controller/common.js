'use strict';

const Controller = require('../core/controller');

class CommonController extends Controller {

  /**
   * 获取图片验证码
   * @returns {Promise<void>}
   */
  async getImgCaptcha() {
    const { ctx } = this;
    const { width, height } = ctx.request.query

    const res = await ctx.service.common.getImgCaptcha({ width, height })

    this.success({ ctx, data: res })
  }
}

module.exports = CommonController;
