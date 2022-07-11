<template>
  <div>
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录名" :label-width="labelWidth" prop="username">
              <el-input v-model="form.username" autocomplete="off" :disabled="form.id !== '-1'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" :label-width="labelWidth">
              <el-input v-model="form.realName" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称" :label-width="labelWidth">
              <el-input v-model="form.displayName" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" :label-width="labelWidth">
              <el-radio v-model="form.sex" label="1">男</el-radio>
              <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" :label-width="labelWidth" prop="mobile">
              <el-input v-model="form.mobile" autocomplete="off" />
            </el-form-item>        </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" :label-width="labelWidth">
              <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="简介" :label-width="labelWidth">
          <el-input v-model="form.introduction" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色" :label-width="labelWidth" prop="roleIds">
              <el-select
                v-model="form.roleIds"
                multiple
                placeholder="请选择"
                style="width: 100%;"
                :multiple-limit="3"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" />
        </el-row>
        <el-form-item label="头像" :label-width="labelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept="image/png, image/jpeg"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-progress="handlePicUploadProgress"
            :http-request="upload"
          >
            <img v-show="form.avatar" :src="VUE_APP_BASE_API + form.avatar" class="avatar">
            <i v-show="!form.avatar" class="el-icon-plus avatar-uploader-icon" />
            <div v-show="uploadProgressPercent !== 0" class="progress-wrapper">
              <el-progress type="circle" :percentage="uploadProgressPercent" />
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="end">
          <el-button size="mini" @click="close">取 消</el-button>
          <el-button size="mini" type="primary" :loading="saving" @click="submit">确 定</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visiblePassword"
      width="30%"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-result icon="success" title="创建成功" sub-title="初始密码只显示一次，可前往个人中心修改密码！">
        <template slot="extra">
          <p style="font-size: 20px;font-weight: bold;">{{ password }}</p>
          <el-button size="mini" type="primary" icon="el-icon-document" @click="handleCopy(password,$event)">
            复制密码
          </el-button>
        </template>
      </el-result>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="info" @click="closePassword">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import _ from 'lodash'
import { roleService, userService, fileService } from '@/services'

export default {
  components: {

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
        username: '',
        realName: '',
        displayName: '',
        sex: '1',
        mobile: '',
        email: '',
        roleIds: '',
        introduction: '',
        avatar: ''
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'blur' }],
        mobile: [{ required: true, message: '必填', trigger: 'blur' }],
        roleIds: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      saving: false,
      // 图片上传
      uploadProgressPercent: 0,
      // 业务属性
      roleList: [],
      visiblePassword: false,
      password: ''
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
      return this.form.id === '-1' ? '添加用户' : '编辑用户'
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
        const response = await roleService.getRoleList()
        const { data: roleList } = response.data
        this.roleList = roleList
      } catch (e) {
        console.error('user.getRoleList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 设置数据
    async setData() {
      try {
        const response = await userService.getUser({ id: this.form.id })
        const { data: user } = response.data
        const { username, realName, displayName, sex, mobile, email, systemRoles, introduction, avatar } = user
        this.form.username = username
        this.form.realName = realName
        this.form.displayName = displayName
        this.form.sex = sex
        this.form.mobile = mobile
        this.form.email = email
        this.form.roleIds = _.map(systemRoles, 'id')
        this.form.introduction = introduction
        this.form.avatar = avatar
      } catch (e) {
        console.error('user.getUser-error:', e)
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
    // 提交成功
    closePassword() {
      this.visiblePassword = false
      this.$emit('save-success')
      this.close()
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
              response = await userService.createUser(formData)
            } else {
              response = await userService.updateUser(formData)
            }
            const { data } = response.data
            // 如果是添加，成功后显示密码
            if (this.form.id === '-1') {
              this.password = data.password
              this.visiblePassword = true
            } else {
              this.$emit('save-success')
              this.close()
            }
          } catch (e) {
            console.error('user.submitUser-error:', e)
            this.done()
            const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
            this.$message.error(errorMessage)
          }
        }
      })
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLtXM = file.size / 1024 / 1024 < 5

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
        return false
      }
      if (!isLtXM) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }
      return true
    },
    upload(content) {
      const checkUpload = this.beforeUpload(content.file)
      if (!checkUpload) {
        return
      }
      console.log(content)
      fileService.uploadAvatar(content.file.name, content.file, {
        // axios 上传进度事件
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
          // 更新element upload progress
          content.onProgress({ percent: percentCompleted })
          this.uploadProgressPercent = percentCompleted
        }
      }).then(response => {
        content.onSuccess(response)
        setTimeout(() => {
          this.uploadProgressPercent = 0
        }, 1000)
      }).catch(error => {
        content.onError(error)
      })
    },
    handleUploadSuccess(response, file) {
      console.log(response)
      this.form.avatar = response.data.data.url
    },
    handleUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    handlePicUploadProgress(event, file, fileList) {
      console.log(event, file)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: #409EFF;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .progress-wrapper {
    width: 100%;
    position: absolute;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-progress {
    position: absolute;
  }
}
</style>
