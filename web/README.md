# 营销网站

> 完整教程，可查看 [Bilibili-招财猫记账软件视频教程]()

- 基于 [Bulma.css 0.9.x](https://bulma.io/)
- 基于 [Bulma-start](https://github.com/jgthms/bulma-start) 快速开发模板

## 开发

```bash
# 安装依赖
npm install

# 启动服务
npm run start
```

- 然后打开 index.html 即可预览
- `npm run start` 命令将会监控 _javascript、_sass 文件夹，并编译成相应的普通 js、css 文件
- 本质就是静态html，所以修改代码后需要刷新下浏览器才能看到最新效果

## 部署

```bash
npm run deploy
```

- `npm run deploy` 会使用 postcss 处理 css 
- 借助成百上千插件实现自动添加前缀、面向未来的CSS 语法，CSS模块化，代码检查以及其它功能
- 如果忘记执行此命令也没有关系，大部分人用的还是主流的浏览器，并没有那么多兼容性等问题
