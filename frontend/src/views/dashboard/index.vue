<template>
  <div class="dashboard-container">
    <el-card>
      如果你喜欢这个项目，欢迎star、pr。
      <el-link type="primary" href="https://gitee.com/XiaoLanMiao/smart-miao">
        https://gitee.com/XiaoLanMiao/smart-miao
      </el-link>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      msg: '',
      msgList: []
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
