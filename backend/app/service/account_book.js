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
    let res,
      is_default = false
    try {
      balance = parseFloat(balance)
      // 查找是否有默认的
      const findOne = await ctx.model.AccountBook.findOne({ where: { is_default: true } })
      if (!findOne) {
        is_default = true
      }
      const model = await ctx.model.AccountBook.create({ name, remark, balance, is_default })
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
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.AccountBook.findAll()

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

  /**
   * 统计本月综合信息
   * @return {Promise<{monthIn: number, monthOut: number, allBalance: number, monthCount: number}>}
   */
  async statisticsCurrentMonthComprehensive() {
    const { ctx, app: { Sequelize, Sequelize: { Op } } } = this;

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

    // TODO: 属于我的账本
    const listAccountBook = await ctx.model.AccountBook.findAll({ where: {} })
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

    // TODO: 属于我的账本
    const listAccountBook = await ctx.model.AccountBook.findAll()
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
}

module.exports = AccountBookService;
