

<template>
  <div class="dashboard-container">
    <el-card>
      如果你喜欢这个项目，欢迎star、pr。
      <el-link type="primary" href="https://gitee.com/XiaoLanMiao/smart-miao" target="_blank">
        https://gitee.com/XiaoLanMiao/smart-miao
      </el-link>
    </el-card>
    <el-card>
      <div class="markdown-body">
        <vue-markdown :source="manualMd" />
      </div>
    </el-card>
    <el-card>
      <div class="markdown-body">
        <vue-markdown :source="yapiMd" />
      </div>
    </el-card>
    <el-card>
      <div class="markdown-body">
        <vue-markdown :source="minioMd" />
      </div>
    </el-card>
    <el-card>
      <div class="markdown-body">
        <vue-markdown :source="md" />
      </div>
    </el-card>
    <!--    <ul class="chatList">-->
    <!--      <li v-for="(item,index) in msgList" :key="index">-->
    <!--        <div>-->
    <!--          <div class="content">-->
    <!--            <p>姓名：{{ item.name }}</p>-->
    <!--            <p>消息:{{ item.msg }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <div class="chat-input">-->
    <!--      <el-input-->
    <!--        v-model="msg"-->
    <!--        type="textarea"-->
    <!--        :autosize="{ minRows: 4, maxRows: 6 }"-->
    <!--        maxlength="300"-->
    <!--        placeholder="请输入内容"-->
    <!--        @keyup.enter.native="send()"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import VueMarkdown from 'vue-markdown'
const md = `
## 平台目录
- [x] backend：基于\`Egg.js 2.x\`和\`nodejs 16.x\`的后端工程
- [x] frontend：基于\`Vue.js 2.x\`的前端工程
- [x] web：基于\`Bulma.css 0.9.x\`的产品营销网站
- [ ] app：基于\`uni-app、uviewui 2.x\`的移动端工程
- [x] desktop：基于\`Electron 16.x\`的桌面工程

## 功能
- [x] 系统管理-用户管理
- [x] 系统管理-角色管理
- [x] 权限管理-菜单管理
- [ ] 权限管理-操作管理
- [ ] 权限管理-页面元素管理
- [ ] 权限管理-文件管理
- [x] 系统监控-在线用户
- [x] 系统监控-登录日志
- [x] 系统监控-服务监控
- [x] 消息通知
- [x] 登录-Token、RefreshToken
- [x] 登录-账号密码登录
- [ ] 登录-手机短信登录
- [ ] 登录-Github、微信、钉钉第三方登录
- [ ] 登录-app扫码登录
- [x] 个人中心
- [ ] 注册
- [x] 卡证照管理
- [x] 记账
- [ ] 智能提醒
- [ ] 运维-数据备份
- [ ] 运维-版本管理
- [ ] 增强网站无障碍功能的
- [x] 应用链接-YApi、MinIO、开发手册

`

const manualMd = `
按照手册上的要求进行学习和编码，提高工作效率，减少bug，避免在「浪费时间」和「无价值」的小事上投入太多精力。

规则就是用来执行的，争取大家的代码风格都一样，大家的工作环境都一样，而这需要所有人一起不断的完善规则。

演示地址: https://hilanmiao.github.io/standards-recommendations/
`

const yapiMd = `
YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。

演示环境及账号密码：

| 账号    | 密码   | 权限        |
|-------| ------ |-----------|
| admin | 123456 | 管理员，一般不用，全部功能      |
| 18353674768  | 123456 | 项目owner |
`
const minioMd = `
MinIO 是在 GNU Affero 通用公共许可证 v3.0 下发布的高性能对象存储。 它是与 Amazon S3 云存储服务兼容的 API。 使用 MinIO 为机器学习、分析和应用程序数据工作负载构建高性能基础架构。

演示环境及账号密码：

| 账号    | 密码   | 权限        |
|-------| ------ |-----------|
| admin | 123456 | 管理员  |
`
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    VueMarkdown
  },
  data() {
    return {
      msg: '',
      msgList: [],
      md,
      manualMd,
      yapiMd,
      minioMd
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  // sockets: {
  //   connect: function() {
  //     const id = this.$socket.client.id
  //     console.log(id + ' connected')
  //   },
  //   customEmit: function(data) {
  //     console.log(data)
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   },
  //   res: function(data) {
  //     this.msgList.push(data)
  //     console.log('接收到服务端消息', data)
  //   }
  // },
  methods: {
    // send() {
    //   // 给服务器发送一个字符串:
    //   console.log('send')
    //   this.msgList.push({
    //     name: 'smartmiao',
    //     msg: this.msg
    //   })
    //   this.$socket.client.emit('server', {
    //     name: 'smartmiao',
    //     msg: this.msg
    //   })
    //   this.msg = ''
    // }
  }
}
</script>

<style lang="scss" scoped>
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
.dashboard-container {
  margin: 20px;

  h4,
  h5 {
    img {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
