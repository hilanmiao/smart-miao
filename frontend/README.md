# 前端

> 完整教程，可查看 [Bilibili-招财猫记账软件视频教程]()

- 基于 [Vue.js 2.x](https://v2.cn.vuejs.org)、[ElementUI 2.15.x](https://element.eleme.cn/#/zh-CN)
- 参考 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 二次开发，
不熟悉的同学建议先浏览一遍官方文档

## 开发

```bash
# 安装依赖
npm install

# 启动服务
npm run dev
```

这将自动打开 http://localhost:9527

## 编译

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 高级

```bash
# 预览发布环境效果
npm run preview

#预览发布环境效果+静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```