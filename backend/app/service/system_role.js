'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemRoleService extends Service {

  /**
   * 创建
   * @param name
   * @param remark
   * @param powerMenus
   * @param powerOperations
   * @returns {Promise<{role_id}|{code: number}>}
   */
  async create({ name, remark, powerMenus, powerOperations }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 创建角色
      const modelRole = await ctx.model.SystemRole.create({ name, remark }, { transaction });

      const powerIds = []
      // 获取菜单的权限
      for (const menuId of powerMenus) {
        const power = await ctx.model.SystemPower.findOne({ where: { type: 'menu', ref_id: menuId }, transaction })
        if (power) {
          powerIds.push(power.id)
        }
      }
      // 获取操作的权限

      // 批量创建角色权限
      const rolePowers = _.map(powerIds, item => {
        return { role_id: modelRole.id, power_id: item }
      });
      await ctx.model.SystemRolePower.bulkCreate(rolePowers, { transaction })

      // 提交事务
      await transaction.commit()
      res = { id: modelRole.id }

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
   * @param name
   * @param remark
   * @param powerMenus
   * @param powerOperations
   * @returns {Promise<{role_id}|{code: number}>}
   */
  async update({ id, name, remark, powerMenus, powerOperations }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新角色
      const modelRole = await ctx.model.SystemRole.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelRole.update({ name, remark }, { transaction })

      // 删除角色的所有权限
      await ctx.model.SystemRolePower.destroy({ where: { role_id: id }, transaction })

      const powerIds = []
      // 获取菜单的权限
      for (const menuId of powerMenus) {
        const power = await ctx.model.SystemPower.findOne({ where: { type: 'menu', ref_id: menuId }, transaction })
        if (power) {
          powerIds.push(power.id)
        }
      }
      // 获取操作的权限

      // 批量创建角色权限
      const rolePowers = _.map(powerIds, item => {
        return { role_id: modelRole.id, power_id: item }
      });
      await ctx.model.SystemRolePower.bulkCreate(rolePowers, { transaction })

      // 提交事务
      await transaction.commit()
      res = { id: modelRole.id }

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
   * @returns {Promise<{code: number}|{count}>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        const modelRole = await ctx.model.SystemRole.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        // 删除角色的所有权限
        await ctx.model.SystemRolePower.destroy({ where: { role_id: id }, transaction })
        // 删除角色
        await modelRole.destroy({ transaction })
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
   * 查询
   * @param id
   * @returns {Promise<*|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      },
      include: [
        {
          model: ctx.model.SystemPower,
          include: [
            {
              model: ctx.model.SystemMenu
            },
            {
              model: ctx.model.SystemOperation
            }
          ]
        }
      ]
    }

    const res = await ctx.model.SystemRole.findOne(op);
    if (!res) {
      // 未找到角色
      return { code: 20401 }
    }

    return res
  }

  /**
   * 查询
   * @returns {Promise<*>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.SystemRole.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param name
   * @returns {Promise<{pagination: {total, size, page}, list: (number|number|M[]|TInstance[]|SQLResultSetRowList|HTMLCollectionOf<HTMLTableRowElement>|string|*)}>}
   */
  async page({ page, limit, name }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        name: { [Op.like]: `%${name || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }

    let res = await ctx.model.SystemRole.findAndCountAll(op);
    res = {
      list: res.rows,
      pagination: {
        page,
        size: limit,
        total: res.count
      }
    }

    return res;
  }
}

module.exports = SystemRoleService;
