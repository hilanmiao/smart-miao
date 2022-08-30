<template>
  <view class="wrap">
    <u-navbar :back-text="title"
              back-icon-color="#fff"
              :border-bottom="false"
              :back-text-style="{ color: '#fff'}"
              :background="{ background: '#DC4232' }">
      <view class="navbar-right" slot="right">
        <view class="right-item">
          <text class="u-font-28" @click="save">保存</text>
        </view>
      </view>
    </u-navbar>
    <view>
      <u-form class="u-form" :model="form" ref="uForm" :errorType="errorType"
              label-width="150" label-align="left">
        <u-form-item label="账本名称" prop="name" required>
          <u-input v-model="form.name" placeholder="请输入账本名称" />
        </u-form-item>
        <u-form-item label="初始余额" prop="balance" v-if="form.id === '-1'">
          <u-input v-model="form.balance" placeholder="请输入初始余额" />
        </u-form-item>
        <u-form-item label="备注" prop="remark">
          <u-input v-model="form.remark" placeholder="请输入备注" type="textarea" />
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
import {accountBookService } from '@/services'
import _ from "lodash";

export default {
  data() {
    return {
      form: {
        id: '-1',
        name: '',
        balance: 0,
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      errorType: ['toast']
    }
  },
  computed: {
    title() {
      return this.form.id === '-1' ? '添加账本' : '编辑账本'
    }
  },
  onBackPress(e) {
    console.log('onBacePress')
    this.openPage()
    return true
  },
  async onLoad(options) {
    console.log(options)
    if(options.id) {
      this.form.id = options.id
    }

    await this.init()
    // 添加
    if (this.form.id === '-1') return
    // 编辑
    await this.setData()
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    openPage(url = '/pages/home/index', type = 'tab', params) {
      this.$u.route({
        url,
        type,
        params
      })
    },
    init() {},
    async setData() {
      try {
        const response = await accountBookService.getAccountBook({id: this.form.id})
        const { data: accountBook } = response.data
        const { name, balance, remark } = accountBook
        this.form.name = name
        this.form.balance = balance
        this.form.remark = remark
      } catch (e) {
        console.error('accountBook.getAccountBook-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$u.toast(errorMessage)
      }
    },
    save() {
      this.$refs.uForm.validate(async valid => {
        if (valid) {
          uni.showLoading()
          const formData = _.cloneDeep(this.form)
          try {
            if (formData.id === '-1') {
              await accountBookService.createAccountBook(formData)
            } else {
              await accountBookService.updateAccountBook(formData)
            }

            uni.hideLoading()
            this.$u.toast('保存成功')
            this.openPage()
          } catch (e) {
            console.error(e)
            uni.hideLoading()
            const errorMessage = e && e.data.message || '出错了，请重试'
            this.$u.toast(errorMessage)
          }
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: rpx(24);
  min-height: 100%;
  overflow: auto;
}

.navbar-right {
  margin-right: rpx(44);
  display: flex;
  color: #FFFFFF;
}
</style>
