'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')
const NP = require('number-precision');

class AccountInOutService extends Service {

  /**
   * 创建
   * @param account_book_id
   * @param account_in_out_category_id
   * @param type
   * @param amount
   * @param remark
   * @param in_out_date
   * @return {Promise<{code: number}|{id}>}
   */
  async create({ account_book_id, account_in_out_category_id, type, amount, remark, in_out_date }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      const model = await ctx.model.AccountInOut.create({ account_book_id, account_in_out_category_id, type, amount, remark, in_out_date }, { transaction })
      // 更新账本余额
      const modelAccountBook = await ctx.model.AccountBook.findOne({ where: { id: account_book_id }, transaction, lock: true, skipLocked: true });
      let balance = modelAccountBook.balance
      if (type === 'in') {
        // 使用 number-precision 实现精确四则运算
        balance = NP.plus(balance, amount)
      } else {
        balance = NP.minus(balance, amount)
      }
      await modelAccountBook.update({ balance }, { transaction })

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

  /**
   * 更新
   * @param id
   * @param account_book_id
   * @param account_in_out_category_id
   * @param type
   * @param amount
   * @param remark
   * @param in_out_date
   * @return {Promise<{code: number}|{id}>}
   */
  async update({ id, account_book_id, account_in_out_category_id, type, amount, remark, in_out_date }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      const model = await ctx.model.AccountInOut.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      const { account_book_id: acccountBookIdOld, amount: amountOld, type: typeOld } = model

      if (account_book_id !== acccountBookIdOld) {
        // 回退原账本余额
        const modelAccountBookOld = await ctx.model.AccountBook.findOne({ where: { id: acccountBookIdOld }, transaction, lock: true, skipLocked: true });
        let balanceOld = modelAccountBookOld.balance
        if (typeOld === 'in') {
          balanceOld = NP.minus(balanceOld, amountOld)
        } else {
          balanceOld = NP.plus(balanceOld, amountOld)
        }
        await modelAccountBookOld.update({ balance: balanceOld }, { transaction })

        // 更新新账本余额
        const modelAccountBook = await ctx.model.AccountBook.findOne({ where: { id: account_book_id }, transaction, lock: true, skipLocked: true });
        let balance = modelAccountBook.balance
        if (type === 'in') {
          balance = NP.plus(balance, amount)
        } else {
          balance = NP.minus(balance, amount)
        }
        await modelAccountBook.update({ balance }, { transaction })
      } else {
        // 更新新账本余额
        const modelAccountBook = await ctx.model.AccountBook.findOne({ where: { id: account_book_id }, transaction, lock: true, skipLocked: true });
        let balance = modelAccountBook.balance
        if (typeOld === 'in') {
          balance = NP.minus(balance, amountOld)
        } else {
          balance = NP.plus(balance, amountOld)
        }
        if (type === 'in') {
          balance = NP.plus(balance, amount)
        } else {
          balance = NP.minus(balance, amount)
        }
        await modelAccountBook.update({ balance }, { transaction })
      }
      await model.update({ account_book_id, account_in_out_category_id, type, amount, remark, in_out_date }, { transaction })

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
        const model = await ctx.model.AccountInOut.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        await model.destroy({ transaction })
        // 回退账本余额
        const modelAccountBook = await ctx.model.AccountBook.findOne({ where: { id: model.account_book_id }, transaction, lock: true, skipLocked: true });
        const { type, amount } = model
        let { balance } = modelAccountBook
        if (type === 'in') {
          balance = NP.minus(balance, amount)
        } else {
          balance = NP.plus(balance, amount)
        }
        await modelAccountBook.update({ balance }, { transaction })
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
      },
      include: [
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountBook,
        },
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountInOutCategory,
        },
      ]
    }

    const res = await ctx.model.AccountInOut.findOne(op);
    if (!res) {
      // 未找到收支明细
      return { code: 20903 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<awaited Bluebird<TInstance[]> | Promise<Model[]>>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.AccountInOut.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param account_book_id
   * @param account_in_out_category_id
   * @param type
   * @param dateRange
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async page({ page, limit, account_book_id, account_in_out_category_id, type, dateRange }) {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const op = {
      where: {
        // name: { [Op.like]: `%${name || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      include: [
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountBook,
        },
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountInOutCategory,
        },
      ]
    }
    if (account_book_id) {
      op.where.account_book_id = account_book_id
    } if (account_in_out_category_id) {
      op.where.account_in_out_category_id = account_in_out_category_id
    }
    if (type) {
      op.where.type = type
    }
    if (dateRange && dateRange.length) {
      op.where.in_out_date = {
        [Op.between]: dateRange
      }
    }

    let res = await ctx.model.AccountInOut.findAndCountAll(op);
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

module.exports = AccountInOutService;
