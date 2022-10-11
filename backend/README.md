# 后端

> 完整教程，可查看 [Bilibili-招财猫记账软件视频教程]()

- 基于 [Egg.js 2.x](https://www.eggjs.org/zh-CN) 和 [nodejs 16.x](https://nodejs.org)
- 重要说明
  1.  config/config_env_local、config_env_prod,存储的是mysql、redis等的账号密码的敏感信息，
  所以在.gitignore文件中忽略了，请重命名config_env_local_template和config_env_prod_template文件，
  并填入自己的账号密码
  2. database/init.sql文件是初始化数据，新建数据库并运行它
  3. 按照下面的官方说明开始运行项目

## 快速开始

请参阅 [egg docs][egg] 了解更多详情

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 其他命令

- 使用 `npm run lint` 检查代码样式
- 使用 `npm test` 运行单元测试
- 使用 `npm run autod` 来自动检测依赖升级，更多细节参见 [autod](https://www.npmjs.com/package/autod)

[egg]: https://eggjs.org
