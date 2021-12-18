'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')
const cryptoRandomString = require('crypto-random-string')

class SystemUserService extends Service {

  /**
   * 创建
   * @param roleIds
   * @param username
   * @param display_name
   * @param real_name
   * @param position
   * @param company
   * @param email
   * @param mobile
   * @param sex
   * @param avatar
   * @param introduction
   * @return {Promise<{password: string | *, user_id}|{code: number}>}
   */
  async create({ roleIds, username, display_name, real_name, position, company, email, mobile, sex, avatar, introduction }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 查看登录名是否已被注册
      const isExist = await ctx.model.SystemUser.findOne({ where: { username }, transaction })
      if (isExist) {
        await transaction.rollback();
        // 登录名已被注册
        return { code: 20502 }
      }

      // 创建用户
      // 生成6位随机字符password
      const password = cryptoRandomString({ length: 6 })
      const modelUser = await ctx.model.SystemUser.create({ username, password, display_name, real_name, position, company, email, mobile, sex, avatar, introduction }, { transaction });
      // 创建用户角色
      for (const roleId of roleIds) {
        await ctx.model.SystemUserRole.create({ role_id: roleId, user_id: modelUser.id }, { transaction });
      }

      // 提交事务
      await transaction.commit()
      res = { id: modelUser.id, password }

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
   * @param roleIds
   * @param display_name
   * @param real_name
   * @param position
   * @param company
   * @param email
   * @param mobile
   * @param sex
   * @param avatar
   * @param introduction
   * @return {Promise<{user_id}|{code: number}>}
   */
  async update({ id, roleIds, display_name, real_name, position, company, email, mobile, sex, avatar, introduction }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新用户
      const modelUser = await ctx.model.SystemUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelUser.update({ display_name, real_name, position, company, email, mobile, sex, avatar, introduction }, { transaction })
      // 删除用户的所有角色
      await ctx.model.SystemUserRole.destroy({ where: { user_id: id }, transaction })
      // 重新创建用户角色
      for (const roleId of roleIds) {
        await ctx.model.SystemUserRole.create({ role_id: roleId, user_id: id }, { transaction });
      }

      // 提交事务
      await transaction.commit()
      res = { id: modelUser.id }

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
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        const modelUser = await ctx.model.SystemUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        // 删除用户
        await modelUser.destroy({ transaction })
        // 删除用户的所有角色
        await ctx.model.SystemUserRole.destroy({ where: { user_id: id }, transaction })
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
   * @return {Promise<*|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: ctx.model.SystemRole
        }
      ]
    }

    const res = await ctx.model.SystemUser.findOne(op);
    if (!res) {
      // 未找到用户
      return { code: 20501 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<*>}
   */
  async list({ keyword }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
      },
      order: [
        [ 'created_at', 'desc' ]
      ]
    }
    if (keyword) {
      op.where = {
        [Op.or]: [
          { username: { [Op.like]: `%${keyword || ''}%` } },
          { mobile: { [Op.like]: `%${keyword || ''}%` } }
        ]
      }
    }

    const res = await ctx.model.SystemUser.findAll(op)

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param username
   * @return {Promise<{pagination: {total, size, page}, list: (number|number|M[]|TInstance[]|SQLResultSetRowList|HTMLCollectionOf<HTMLTableRowElement>|string|*)}>}
   */
  async page({ page, limit, username }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        username: { [Op.like]: `%${username || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      include: [
        {
          model: ctx.model.SystemRole
        }
      ]
    }

    let res = await ctx.model.SystemUser.findAndCountAll(op);
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

  /**
   * 获取详情-基本信息
   * @param id
   * @return {Promise<*>}
   */
  async getUserBasic({ id }) {
    const { ctx } = this;
    const op = {
      where: {
        id
      },
      attributes: ['id', 'username', 'display_name', 'real_name', 'position', 'company', 'email', 'mobile', 'sex', 'avatar', 'introduction', 'status']
    }

    const res = await ctx.model.SystemUser.findOne(op);

    if (!res) {
      // 未找到用户
      return { code: 20501 }
    }

    return res
  }

  /**
   * 更新当前用户资料
   * @param id
   * @param display_name
   * @param real_name
   * @param position
   * @param company
   * @param sex
   * @param avatar
   * @param introduction
   * @return {Promise<{code: number}|{id}>}
   */
  async updateCurrentUserProfile({ id, display_name, real_name, position, company, sex, avatar, introduction }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新用户
      const modelUser = await ctx.model.SystemUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelUser.update({ display_name, real_name, position, company, sex, avatar, introduction }, { transaction })

      // 提交事务
      await transaction.commit()
      // res = { id: modelUser.id }
      // 重新获取完整关联信息
      res = await this.getUserBasic({ id })

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

}

module.exports = SystemUserService;
