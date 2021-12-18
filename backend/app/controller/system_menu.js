'use strict';

const Controller = require('../core/controller');
const _ = require('lodash');

class SystemMenuController extends Controller {

  /**
   * 创建
   * @returns {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ parentId: 'string', name: 'string', router: 'string' }, ctx.request.body)
    const { parentId: parent_id, name, router, type, icon, orderNum: order_num, viewPath: view_path, keepalive, isHidden: is_hidden } = ctx.request.body

    const res = await ctx.service.systemMenu.create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden })

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
    ctx.validate({ id: 'string', parentId: 'string', name: 'string', router: 'string' }, ctx.request.body)
    const { id, parentId: parent_id, name, router, type, icon, orderNum: order_num, viewPath: view_path, keepalive, isHidden: is_hidden } = ctx.request.body

    const res = await await ctx.service.systemMenu.update({ id, parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden })

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

    const res = await ctx.service.systemMenu.delete({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   * @returns {Promise<void>}
   */
  async getMenuAndParentMenu() {
    const { ctx } = this;
    ctx.validate({ id: 'string' }, ctx.request.query)
    const { id } = ctx.request.query

    const res = await ctx.service.systemMenu.getMenuAndParentMenu({ id })

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

    const res = await ctx.service.systemMenu.list()

    this.success({ ctx, data: res })
  }
}

module.exports = SystemMenuController;
