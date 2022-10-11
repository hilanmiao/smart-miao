'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')
const NP = require('number-precision');

class AccountBookService extends Service {

  /**
   * 创建
   * @param name
   * @param remark
   * @param balance
   * @return {Promise<{code: number}|{id}>}
   */
  async create({ name, remark, balance }) {
    const { ctx } = this;
    const user_id = ctx.request.user.id

    let res,
      is_default = false
    try {
      balance = parseFloat(balance)
      // 查找是否有默认的
      const findOne = await ctx.model.AccountBook.findOne({ where: { user_id, is_default: true } })
      if (!findOne) {
        is_default = true
      }
      const model = await ctx.model.AccountBook.create({ user_id, name, remark, balance, is_default })
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
   * @param remark
   * @return {Promise<{code: number}|{id}>}
   */
  async update({ id, name, remark }) {
    const { ctx } = this;
    let res
    try {
      const model = await ctx.model.AccountBook.findByPk(id);
      // 账本创建完后，余额不再支持更新
      await model.update({ name, remark })
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
        const model = await ctx.model.AccountBook.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        await model.destroy({ transaction })
        // 删除所有收支明细
        await ctx.model.AccountInOut.destroy({ where: { account_book_id: id }, transaction })
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

    const res = await ctx.model.AccountBook.findOne(op);
    if (!res) {
      // 未找到账本
      return { code: 20902 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<awaited Bluebird<TInstance[]> | Promise<Model[]>>}
   */
  async list() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const user_id = ctx.request.user.id

    const op = {
      where: {
        user_id
      },
      attributes: {
        include: [
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'in'
              and account_book_id = account_book.id
            )`), 'sum_total_amount_in'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'out'
              and account_book_id = account_book.id
            )`), 'sum_total_amount_out'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'in'
              and account_book_id = account_book.id
              and DATE_FORMAT( in_out_date, '%Y%m' ) = DATE_FORMAT( CURDATE( ), '%Y%m' )
            )`), 'sum_total_amount_in_month'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'out'
              and account_book_id = account_book.id
              and DATE_FORMAT( in_out_date, '%Y%m' ) = DATE_FORMAT( CURDATE( ), '%Y%m' )
            )`), 'sum_total_amount_out_month'],
        ]
      }
    }
    const res = await ctx.model.AccountBook.findAll(op)

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
    const user_id = ctx.request.user.id

    const op = {
      where: {
        name: { [Op.like]: `%${name || ''}%` },
        user_id
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      attributes: {
        include: [
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'in'
              and account_book_id = account_book.id
            )`), 'sum_total_amount_in'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'out'
              and account_book_id = account_book.id
            )`), 'sum_total_amount_out'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'in'
              and account_book_id = account_book.id
              and DATE_FORMAT( in_out_date, '%Y%m' ) = DATE_FORMAT( CURDATE( ), '%Y%m' )
            )`), 'sum_total_amount_in_month'],
          [Sequelize.literal(`(
              SELECT SUM(amount) FROM account_in_out 
              where type = 'out'
              and account_book_id = account_book.id
              and DATE_FORMAT( in_out_date, '%Y%m' ) = DATE_FORMAT( CURDATE( ), '%Y%m' )
            )`), 'sum_total_amount_out_month'],
        ]
      }
    }

    let res = await ctx.model.AccountBook.findAndCountAll(op);
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
   * 设置是否默认
   * @param id
   * @param is_default
   * @return {Promise<{code: number}|{id}>}
   */
  async setIsDefault({ id, is_default }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 只能有一个默认
      if (is_default) {
        await ctx.model.AccountBook.update({ is_default: false }, { where: { is_default: true }, transaction })
      }
      const model = await ctx.model.AccountBook.findByPk(id);
      await model.update({ is_default }, { transaction })

      // 提交事务
      await transaction.commit()
      res = { id: model.id }

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

module.exports = AccountBookService;
