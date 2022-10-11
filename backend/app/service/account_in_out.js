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
    const user_id = ctx.request.user.id

    const op = {
      include: [
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountBook,
          where: {
            user_id
          }
        }
      ]
    }

    const res = await ctx.model.AccountInOut.findAll(op)

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
    const user_id = ctx.request.user.id

    const op = {
      where: {
        // name: { [Op.like]: `%${name || ''}%` },
      },
      order: [
        [ 'in_out_date', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      include: [
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountBook,
          where: {
            user_id
          }
        },
        {
          attributes: ['name', 'icon'],
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

  /**
   * 分页
   * 综合：选择的账本、选择的年月、收或支
   * @param page
   * @param limit
   * @param account_book_id
   * @param type
   * @param yearMonth
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async pageComprehensive({ page, limit, account_book_id, type, yearMonth }) {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    let whereAccountBookId
    let whereYearMonth
    let whereType

    if (account_book_id) {
      whereAccountBookId = { account_book_id }
    }
    if (yearMonth) {
      whereYearMonth = Sequelize.where(
        Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m'),
        yearMonth ? yearMonth : Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y-%m')
      )
    }
    if (type) {
      whereType = { type }
    }

    const op = {
      where: {
        [Op.and]: [
          whereType,
          whereAccountBookId,
          whereYearMonth
        ]
      },
      order: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m'), 'DESC'],
        ['in_out_date', 'DESC'],
      ],
      attributes: {
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m'), 'year_month'],
        ]
      },
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      include: [
        {
          attributes: ['id', 'name'],
          model: ctx.model.AccountBook,
        },
        {
          attributes: ['name', 'icon'],
          model: ctx.model.AccountInOutCategory,
        },
      ]
    }
    console.log(op)
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

  /**
   * 统计本月综合信息
   * @return {Promise<{monthIn: number, monthOut: number, allBalance: number, monthCount: number}>}
   */
  async statisticsCurrentMonthComprehensive() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const user_id = ctx.request.user.id

    let monthOut = 0
    let monthIn = 0
    let monthCount = 0
    let monthOutPrevious = 0
    let monthInPrevious = 0
    let monthCountPrevious = 0
    let monthSurplusPrevious = 0
    let allBalance = 0

    const monthWhere = Sequelize.where(
      Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m'),
      Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y-%m')
    )
    const monthWherePrevious = Sequelize.where(
      Sequelize.fn('PERIOD_DIFF',
        // Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y-%m'),
        // Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m')
        // PERIOD_DIFF 只能用Ym格式
        Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y%m'),
        Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y%m')
      ),
      {
        [Op.eq]: 1
      }
    )

    const listAccountBook = await ctx.model.AccountBook.findAll({ where: { user_id } })
    for (const accountBook of listAccountBook) {
      // 统计本月收支
      const sumAmountOut = await ctx.model.AccountInOut.sum('amount', {
        where: {
          [Op.and]: [
            { type: 'out' },
            { account_book_id: accountBook.id },
            monthWhere
          ]
        }
      })
      const sumAmountIn = await ctx.model.AccountInOut.sum('amount', {
        where: {
          [Op.and]: [
            { type: 'in' },
            { account_book_id: accountBook.id },
            monthWhere
          ]
        }
      })
      monthOut = NP.round(monthOut, 2) + NP.round(sumAmountOut, 2)
      monthIn = NP.round(monthIn, 2) + NP.round(sumAmountIn, 2)
      // 统计本月记账笔数
      monthCount += await ctx.model.AccountInOut.count({
        where: {
          [Op.and]: [
            { account_book_id: accountBook.id },
            monthWhere
          ]
        }
      })

      // 统计上月收支
      const sumAmountOutPrevious = await ctx.model.AccountInOut.sum('amount', {
        where: {
          [Op.and]: [
            { type: 'out' },
            { account_book_id: accountBook.id },
            monthWherePrevious
          ]
        }
      })
      const sumAmountInPrevious = await ctx.model.AccountInOut.sum('amount', {
        where: {
          [Op.and]: [
            { type: 'in' },
            { account_book_id: accountBook.id },
            monthWherePrevious
          ]
        }
      })
      monthOutPrevious = NP.round(monthOutPrevious, 2) + NP.round(sumAmountOutPrevious, 2)
      monthInPrevious = NP.round(monthInPrevious, 2) + NP.round(sumAmountInPrevious, 2)
      // 统计上月记账笔数
      monthCountPrevious += await ctx.model.AccountInOut.count({
        where: {
          [Op.and]: [
            { account_book_id: accountBook.id },
            monthWherePrevious
          ]
        }
      })

      // 统计所有账本的余额
      allBalance = NP.round(allBalance, 2) + NP.round(accountBook.balance, 2)
    }

    // 统计上月节余
    monthSurplusPrevious = NP.minus(monthInPrevious, monthOutPrevious)

    const res = {
      monthOut,
      monthIn,
      monthCount,
      monthOutPrevious,
      monthInPrevious,
      monthCountPrevious,
      monthSurplusPrevious,
      allBalance
    }

    return res;
  }

  /**
   * 统计本月支出分类排名
   * @return {Promise<Model[]|any[]>}
   */
  async statisticsCurrentMonthCategoryRank() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const user_id = ctx.request.user.id

    const listAccountBook = await ctx.model.AccountBook.findAll({ where: { user_id } })
    const accountBookIds = listAccountBook.map(o => o.id)
    const options = {
      where: {
        [Op.and]: [
          { type: 'out' },
          { account_book_id: { [Op.in]: accountBookIds } },
          Sequelize.where(
            Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m'),
            Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y-%m')
          )
        ]
      },
      order: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'DESC'],
      ],
      limit: 6,
      include: [
        {
          attributes: ['name'],
          model: ctx.model.AccountInOutCategory
        }
      ],
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'sum_total_amount']
      ],
      group: ['account_in_out_category.id']
    }

    const res = await ctx.model.AccountInOut.findAll(options)

    return res;
  }

  /**
   * 统计本年每月收支信息
   * @return {Promise<{in: Promise<Model[]> | Bluebird<any[]>, out: Promise<Model[]> | Bluebird<any[]>}>}
   */
  async statisticsEveryMonthInOut() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const user_id = ctx.request.user.id

    const listAccountBook = await ctx.model.AccountBook.findAll({ where: { user_id } })
    const accountBookIds = listAccountBook.map(o => o.id)
    const optionsIn = {
      where: {
        [Op.and]: [
          { type: 'in' },
          { account_book_id: { [Op.in]: accountBookIds } },
          Sequelize.where(
            Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y'),
            Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y')
          )
        ]
      },
      order: [
        [Sequelize.fn('MONTH', Sequelize.col('in_out_date')), 'ASC'],
      ],
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('in_out_date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'sum_total_amount']
      ],
      group: ['month']
    }
    const resIn = await ctx.model.AccountInOut.findAll(optionsIn)
    const optionsOut = {
      where: {
        [Op.and]: [
          { type: 'out' },
          { account_book_id: { [Op.in]: accountBookIds } },
          Sequelize.where(
            Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y'),
            Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y')
          )
        ]
      },
      order: [
        [Sequelize.fn('MONTH', Sequelize.col('in_out_date')), 'ASC'],
      ],
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('in_out_date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'sum_total_amount']
      ],
      group: ['month']
    }
    const resOut = await ctx.model.AccountInOut.findAll(optionsOut)

    const res = {
      inData: resIn,
      outData: resOut
    }
    return res;
  }

  /**
   * 统计本周收支记录
   * @return {Promise<{in: Promise<Model[]> | Bluebird<any[]>, out: Promise<Model[]> | Bluebird<any[]>}>}
   */
  async statisticsCurrentWeekInOut() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;
    const user_id = ctx.request.user.id

    const listAccountBook = await ctx.model.AccountBook.findAll({ where: { user_id } })
    const accountBookIds = listAccountBook.map(o => o.id)
    const options = {
      where: {
        [Op.and]: [
          { account_book_id: { [Op.in]: accountBookIds } },
          Sequelize.where(
            Sequelize.fn('YEARWEEK', Sequelize.fn('DATE_FORMAT', Sequelize.col('in_out_date'), '%Y-%m-%d')),
            Sequelize.fn('YEARWEEK', Sequelize.fn('CURDATE'))
          )
        ]
      },
      order: [
        ['in_out_date', 'DESC'],
      ],
      include: [
        {
          attributes: ['name', 'icon'],
          model: ctx.model.AccountInOutCategory
        }
      ],
      attributes: ['in_out_date', 'amount', 'remark', 'type']
    }
    const res = await ctx.model.AccountInOut.findAll(options)

    return res;
  }

}

module.exports = AccountInOutService;
