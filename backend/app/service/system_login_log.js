'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemLoginLogService extends Service {

  /**
   * 创建
   * @return {Promise<*>}
   */
  async create({ username }) {
    const { ctx } = this;
    try {
      const ip = ctx.ip
      const ua = ctx.get('user-agent')

      const res = await ctx.model.SystemLoginLog.create({ username, ip, ua });

      return { id: res.id }
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param dateRange
   * @return {Promise<{pagination: {total, size, page}, list: number | M[] | TInstance[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async page({ page, limit, dateRange, username }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        // name: { [Op.like]: `%${name || ''}%` },
        username: { [Op.like]: `%${username || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }
    if (dateRange && dateRange.length) {
      op.where.created_at = {
        [Op.between]: dateRange
      }
    }

    let res = await ctx.model.SystemLoginLog.findAndCountAll(op);
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

module.exports = SystemLoginLogService;
