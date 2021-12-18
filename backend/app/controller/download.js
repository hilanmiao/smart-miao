'use strict';

const Controller = require('../core/controller');
const fs = require('fs-extra');
const util = require('util');
class DownloadController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  /**
   * 列表
   * @return {Promise<void>}
   */
  async index() {
    const { ctx } = this;
    const { page, limit, status, date } = ctx.request.body;
    const user = ctx.request.user;
    const data = await ctx.service.download.index({ page, limit, status, date, user })
    this.success({ ctx, data });
  }

  /**
   * 添加
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    const { name, remark } = ctx.request.body;
    const data = await ctx.service.download.create(name, remark);
    this.success({ ctx, data });
  }

  /**
   * 编辑
   * @return {Promise<void>}
   */
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { status, url, remark } = ctx.request.body;
    const data = await ctx.service.download.update(id, status, url, remark);
    this.success({ ctx, data });
  }

  /**
   * 删除
   * @return {Promise<void>}
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await ctx.service.download.destroy(id);
    this.success({ ctx, data });
  }

  // 下载
  async pull() {
    const { ctx, app: { model: { Download } } } = this;
    // 基础目录
    let url = await Download.findByPk(ctx.params.id)
    if (!url) {
      return this.fail({ ctx, message: '错误的下载参数' });
    }
    if (url.status !== '2') {
      return this.fail({ ctx, message: '错误的下载状态' });
    }
    url = 'app' + url.url
    const fileSize = (await util.promisify(fs.stat)(url)).size.toString();
    ctx.attachment(url);
    ctx.set('Content-Length', fileSize);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(url);
  }

}

module.exports = DownloadController;
