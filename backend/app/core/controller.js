'use strict';

// controller 编写规范
// 1.方法名和 service 方法名需要一致
// 3.验证规则命名前缀是该方法的名称，如：createRule
// 4.伪删除的表获取数据时注意要判断deleted_at字段
// 5.动作名称和业务不要有关系，例：create不要写成courseCreate

// 常见公共方法名如下：
// create: 添加
// update: 编辑
// delete: 删除
// get：详情-关联表
// getXxxBasic：详情-单表基础信息
// count: 统计
// list：查询
// page: 分页
// batch: 批量
// copy: 复制
// enable: 设置为可用
// disable: 设置为不可用
// sort: 排序
// top: 置顶
// cancelTop: 取消置顶
// isExist: 是否存在
// isExistChildren: 是否存在子项目
// statistics: 统计


// 其他方法名请遵循"动作+内容"，举例
// sendEmail: 发送邮件
// enableAccount: 启用账户

// 返回内容结构为:
// {
//   code,
//   data: {} 必须是对象,
//   message
// }

const Controller = require('egg').Controller;

class BaseController extends Controller {

  /**
   * 成功
   * @param ctx
   * @param data
   */
  success({ ctx, code = 200, data, message = 'success', status = 200 }) {
    ctx.body = {
      code: 200,
      data,
      message
    };
    ctx.status = status;
  }

  /**
   * 失败
   * @param ctx
   * @param code
   * @param data
   * @param message
   */
  fail({ ctx, code, data, message = '', status = 200 }) {
    ctx.body = {
      code,
      data,
      message: message ? message : ctx.helper.getErrorMessageByCode(code),
    };
    ctx.status = status;
  }
}

module.exports = BaseController;
