'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemUserService extends Service {

  /**
   * 创建
   * @param ref_id
   * @param type
   * @returns {Promise<*>}
   */
  async create({ ref_id, type }) {
    const { ctx } = this;
    const res = await ctx.model.SystemPower.create({ ref_id, type });
    return res
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<*>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };
    const res = await ctx.model.SystemPower.destroy(query);
    return res
  }

  /**
   * 获取我的菜单权限
   * @return {Promise<*[]>}
   */
  async getMyPowerMenus() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = []

    // 获取用户的所有角色
    const user_id = ctx.request.user.id
    const roles = await ctx.model.SystemUserRole.findAll({ where: { user_id } })
    const roleIds = _.map(roles, 'role_id')

    // 获取所有角色的所有权限
    let powerIds = []
    for (const id of roleIds) {
      const rolePowers = await ctx.model.SystemRolePower.findAll({ where: { role_id: id } })
      if (rolePowers) {
        powerIds = _.concat(powerIds, _.map(rolePowers, 'power_id'))
        powerIds = _.uniq(powerIds)
      }
    }

    // 获取所有菜单
    const menuIds = []
    for (const id of powerIds) {
      const power = await ctx.model.SystemPower.findOne({ where: { type: 'menu', id } })
      if (power) {
        menuIds.push(power.ref_id)
      }
    }
    for (const id of menuIds) {
      const menu = await ctx.model.SystemMenu.findByPk(id)
      if (menu) {
        res.push(menu)
      }
    }

    return res
  }

  /**
   * 获取我的操作权限
   * @return {Promise<*[]>}
   */
  async getMyPowerOperations() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = []

    return res
  }

  /**
   * 获取我的文件权限（需要的时候再查，例如到某个具体的页面时？不然上亿个文件名称不可能登录的时候一下子全返回给前端）
   */
  getMyPowerFiles() {}

  /**
   * 获取我的页面元素权限（需要的时候再查，例如到某个具体的页面时？）
   */
  getMyPowerElements() {}
}

module.exports = SystemUserService;
