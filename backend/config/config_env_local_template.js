'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
module.exports = {
  name: 'smartmiao',
  host: '127.0.0.1',
  port: '7001',
  domain: 'http://127.0.0.1:7001',
  jwtSecret: 'smartmiao',
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '你的密码',
    database: 'smartmiao',
  },
  redis: {
    host: '127.0.0.1',
    port: '6379',
    password: '你的密码',
    db: '1',
  },
  alinode: {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '',
    secret: ''
  },
}
