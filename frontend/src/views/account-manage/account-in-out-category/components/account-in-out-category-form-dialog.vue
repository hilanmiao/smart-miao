<template>
  <el-dialog
    :title="title"
    width="50%"
    :close-on-click-modal="false"
    :append-to-body="true"
    :center="true"
    :visible.sync="visible"
    @open="open"
    @close="close"
    @closed="closed"
  >
    <el-form ref="form" label-position="right" :model="form" :rules="rules">
      <el-form-item label="名称" :label-width="labelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图标" :label-width="labelWidth" prop="icon">
        <!--        <icon-selector :value="form.icon" @selected="iconSelected" />-->
        <el-popover
          v-model="popoverVisibleIcon"
          placement="bottom-start"
          width="700"
          trigger="click"
        >
          <el-scrollbar wrap-style="max-height: 300px;">
            <icon-selector :value="form.icon" @selected="iconSelected" />
          </el-scrollbar>
          <el-input
            slot="reference"
            v-model="form.icon"
            placeholder="请选择图标"
            readonly
          >
            <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon" />
            <span v-else slot="prefix" />
          </el-input>
        </el-popover>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-row type="flex" justify="end">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button size="mini" type="primary" :loading="saving" @click="submit">确 定</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { accountInOutCategoryService } from '@/services'
import IconSelector from '@/components/IconSelector'

export default {
  components: {
    IconSelector
  },
  model: {
    prop: 'dialogVisible',
    event: 'close'
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    formId: {
      type: String,
      default: '-1'
    }
  },
  data() {
    return {
      // 通用属性
      labelWidth: '100px',
      defaultForm: null,
      form: {
        id: '',
        name: '',
        icon: ''
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        icon: [{ required: true, message: '必选', trigger: 'input' }]
      },
      loading: false,
      saving: false,
      // 业务属性
      popoverVisibleIcon: false
    }
  },
  computed: {
    visible: {
      get() {
        // 父组件向下传递dialogVisible的值时通过计算属性赋值到visible
        return this.dialogVisible
      },
      set() {
        // 当dialog关闭时，会触发this.visible = false，从而来到这个方法，我们在这里将关闭事件同步给父组件
        this.$emit('close', false)
      }
    },
    title() {
      return this.form.id === '-1' ? '添加收支分类' : '编辑收支分类'
    }
  },
  created() {
    // 拷贝form默认值
    this.defaultForm = _.cloneDeep(this.form)
  },
  destroyed() {
    this.defaultForm = null
  },
  methods: {
    // 打开回调
    async open() {
      await this.init()
      // 添加
      if (this.form.id === '-1') return
      // 编辑
      await this.setData()
    },
    // 初始化数据事件等
    async init() {
      try {
        this.form.id = this.formId
        // const response = await userService.getUserList()
        // const { data: userList } = response.data
        // this.userList = userList
      } catch (e) {
        console.error('accountInOutCategory.getUserList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 设置数据
    async setData() {
      try {
        const response = await accountInOutCategoryService.getAccountInOutCategory({ id: this.form.id })
        const { data: accountInOutCategory } = response.data
        const { name, icon } = accountInOutCategory
        this.form.name = name
        this.form.icon = icon
      } catch (e) {
        console.error('accountInOutCategory.getAccountInOutCategory-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 关闭回调
    close() {
      this.visible = false
      this.saving = false
      this.loading = false
    },
    // 关闭回调
    closed() {
      // 重置form
      this.form = _.cloneDeep(this.defaultForm)
      this.clearValidate()
    },
    // 完成
    done() {
      this.saving = false
    },
    // 检验表单
    validate(callback) {
      if (this.$refs.form) {
        this.$refs.form.validate(callback)
      }
    },
    // 重置表单
    resetFields() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 移除表单校验
    clearValidate(props) {
      if (this.$refs.form) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate(props)
        })
      }
    },
    // 提交
    submit() {
      // 提交前处理

      // 提交通用处理
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.saving = true
          const formData = _.cloneDeep(this.form)
          let response = null
          try {
            if (formData.id === '-1') {
              response = await accountInOutCategoryService.createAccountInOutCategory(formData)
            } else {
              response = await accountInOutCategoryService.updateAccountInOutCategory(formData)
            }
            const { data } = response.data
            console.log(data)
            this.$emit('save-success')
            this.close()
          } catch (e) {
            console.error('accountInOutCategory.submitAccountInOutCategory-error:', e)
            this.done()
            const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
            this.$message.error(errorMessage)
          }
        }
      })
    },
    // 图标选择
    iconSelected(val) {
      this.form.icon = val
      this.popoverVisibleIcon = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
