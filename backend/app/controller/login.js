'use strict';

const Controller = require('../core/controller');
const _ = require('lodash')

class LoginController extends Controller {

  /**
   * 登录
   * @return {Promise<void>}
   */
  async login() {
    const { ctx } = this;
    const { username, password, captchaId, verifyCode } = ctx.request.body

    // 检查验证码
    const resVerify = await ctx.service.common.verifyImgCaptcha({ id: captchaId, code: verifyCode })
    if (resVerify.code) {
      this.fail({ ctx, code: resVerify.code })
      return
    }

    // 登录
    const res = await ctx.service.login.login({ username, password })
    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 登录-仅使用账号密码
   * @return {Promise<void>}
   */
  async loginByUsernameAndPassword() {
    const { ctx } = this;
    const { username, password } = ctx.request.body

    // 登录
    const res = await ctx.service.login.login({ username, password })
    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 登出
   */
  async logout() {
    const { ctx } = this

    const res = await ctx.service.login.logout()
    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }
}

module.exports = LoginController;
