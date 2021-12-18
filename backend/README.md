# backend
1. config/config_env_local、config_env_prod,存储的是mysql、redis等的账号密码的敏感信息，
所以在.gitignore文件中忽略了，请重命名config_env_local_template和config_env_prod_template文件，
并填入自己的账号密码
2. database/init.sql文件是初始化数据，新建数据库并运行它
3. 按照下面的教程开始运行项目

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
