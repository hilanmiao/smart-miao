'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemMenuService extends Service {

  /**
   * 创建
   * @param parent_id
   * @param name
   * @param router
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_hidden
   * @return {Promise<{id}|{code: number}>}
   */
  async create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }) {
    const { ctx } = this

    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 查找父级菜单
      if (type === 'menu' && parent_id !== '-1') {
        const parent = await ctx.model.SystemMenu.findByPk(parent_id, { transaction })
        if (!parent) {
        // 父节点菜单不存在
          return { code: 20202 }
        }
        if (parent && parent.type === 'menu') {
        // 当前节点为菜单但父节点也为菜单时为非法操作
          return { code: 20203 }
        }
      }

      if (parent_id === '-1') {
        parent_id = null
      }

      // 创建菜单
      const modelMenu = await ctx.model.SystemMenu.create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }, { transaction })
      // 创建权限
      await ctx.model.SystemPower.create({ type: 'menu', ref_id: modelMenu.id }, { transaction })

      // TODO
      // 刷新所有用户的权限

      // 提交事务
      await transaction.commit()
      res = { id: modelMenu.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 更新
   * @param id
   * @param parent_id
   * @param name
   * @param router
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_hidden
   * @return {Promise<{id}|{code: number}>}
   */
  async update({ id, parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }) {
    const { ctx } = this

    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      const modelMenu = await ctx.model.SystemMenu.findByPk(id, { transaction })
      if (!modelMenu) {
        this.fail({ ctx, code: 20204 })
        return;
      }
      if (type === 'menu' && parent_id !== '-1') {
        const modelMenuParent = await ctx.model.SystemMenu.findByPk(parent_id, { transaction })
        if (!modelMenuParent) {
        // 父节点菜单不存在
          return { code: 20202 }
        }
        if (modelMenuParent && modelMenuParent.type === 'menu') {
        // 当前节点为菜单但父节点也为菜单时为非法操作
          return { code: 20203 }
        }
      }

      if (parent_id === '-1') {
        parent_id = null
      }

      // 更新菜单
      await modelMenu.update({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }, { transaction })

      // TODO
      // 刷新所有用户的权限

      // 提交事务
      await transaction.commit()
      res = { id: modelMenu.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<{code: number}|{count}>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;

    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        // 递归子目录
        const childMenus = await this.getChildMenus({ id, transaction })
        const menuIds = _.flattenDeep([id, childMenus])
        // 删除菜单
        await ctx.model.SystemMenu.destroy({ where: { id: { [Op.in]: menuIds } }, transaction })
        // 删除权限
        await ctx.model.SystemPower.destroy({ where: { type: 'menu', ref_id: { [Op.in]: menuIds } }, transaction })
      }

      // 提交事务
      await transaction.commit()
      res = { count: ids.length }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   * @param id
   * @return {Promise<{menu: *, parentMenu: null}|{code: number}>}
   */
  async getMenuAndParentMenu({ id }) {
    const { ctx } = this

    const menu = await ctx.model.SystemMenu.findByPk(id)
    if (!menu) {
      // 未找到节点
      return { code: 20204 }
    }
    let parentMenu = null
    if (menu && menu.parent_id) {
      parentMenu = await ctx.model.SystemMenu.findByPk(menu.parent_id)
    }

    return { menu, parentMenu };
  }

  /**
   * 获取所有菜单
   * @return {Promise<*>}
   */
  async list() {
    const { ctx } = this

    const res = await ctx.model.SystemMenu.findAll()

    return res
  }

  /**
   * 获取当前菜单下的子菜单、目录以及菜单
   * @param id
   * @param transaction
   * @return {Promise<*[]>}
   */
  async getChildMenus({ id, transaction }) {
    const { ctx } = this
    const res = []

    const menus = await ctx.model.SystemMenu.findAll({ where: { parent_id: id }, transaction })
    for (let i = 0; i < menus.length; i++) {
      // 子目录下是菜单或目录，继续往下级查找
      const child = await this.getChildMenus({ id: menus[i].id })
      res.push(child)
      res.push(menus[i].id)
    }

    return res
  }
}

module.exports = SystemMenuService;
