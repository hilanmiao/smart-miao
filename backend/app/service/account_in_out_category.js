'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class AccountInOutCategoryService extends Service {

  /**
   * 创建
   * @param name
   * @param icon
   * @return {Promise<{code: number}|{id}>}
   */
  async create({ name, icon }) {
    const { ctx } = this;
    let res
    try {
      const model = await ctx.model.AccountInOutCategory.create({ name, icon })
      res = { id: model.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 更新
   * @param id
   * @param name
   * @param icon
   * @return {Promise<{code: number}|{id}>}
   */
  async update({ id, name, icon }) {
    const { ctx } = this;
    let res
    try {
      const model = await ctx.model.AccountInOutCategory.findByPk(id);
      await model.update({ name, icon })
      res = { id: model.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)

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
        const model = await ctx.model.AccountInOutCategory.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        await model.destroy({ transaction })
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
   * 详情
   * @param id
   * @return {Promise<awaited Bluebird<TInstance | null> | Promise<Model> | Promise<Model | null>|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      }
    }

    const res = await ctx.model.AccountInOutCategory.findOne(op);
    if (!res) {
      // 未找到收支分类
      return { code: 20901 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<awaited Bluebird<TInstance[]> | Promise<Model[]>>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.AccountInOutCategory.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param name
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async page({ page, limit, name }) {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
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

    let res = await ctx.model.AccountInOutCategory.findAndCountAll(op);
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

module.exports = AccountInOutCategoryService;
