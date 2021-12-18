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
      <el-row>
        <el-col>
          <el-form-item label="名称" :label-width="labelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <!--        <el-col :span="12">-->
        <!--          <el-form-item label="标识" :label-width="labelWidth" prop="label">-->
        <!--            <el-input v-model="form.label" autocomplete="off" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
      <el-form-item label="备注" :label-width="labelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单权限" :label-width="labelWidth" prop="powerMenu">
            <el-tree
              ref="treeMenu"
              class="role-form-dialog-tree-container"
              node-key="id"
              :show-checkbox="true"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="true"
              :data="menus"
              :props="{ children: 'children', label: 'label' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作权限" :label-width="labelWidth" prop="powerOperation" />
        </el-col>
      </el-row>
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
import { menuService, roleService } from '@/services'
import PowerMenuMixin from '@/core/mixins/power-menu'

export default {
  components: {

  },
  mixins: [PowerMenuMixin],
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
      labelWidth: '80px',
      defaultForm: null,
      form: {
        id: '',
        name: '',
        remark: '',
        powerMenus: [],
        powerOperations: []
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      saving: false,
      // 业务属性
      menus: [],
      operations: []
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
      return this.form.id === '-1' ? '添加角色' : '编辑角色'
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
        const response = await menuService.getMenuList()
        const { data: menusData } = response.data
        this.menus = this.filterMenuToTree(menusData, null)
      } catch (e) {
        console.error('role.getMenuList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 设置数据
    async setData() {
      try {
        const response = await roleService.getRole({ id: this.form.id })
        const { data: role } = response.data
        const { name, remark, systemPowers } = role
        this.form.name = name
        this.form.remark = remark
        const powerMenus = _.map(systemPowers, 'systemMenu')
        // 设置节点
        if (powerMenus && powerMenus.length > 0) {
          powerMenus.forEach(o => {
            const node = this.$refs.treeMenu.getNode(o.id)
            console.log(node)
            if (node && node.isLeaf) {
              this.$refs.treeMenu.setChecked(node, true)
            }
          })
        }
      } catch (e) {
        console.error('role.getRole-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 关闭回调
    close() {
      this.visible = false
      this.saving = false
      this.loading = false
      this.clearValidate()
    },
    // 关闭回调
    closed() {
      // 重置form
      this.form = _.cloneDeep(this.defaultForm)
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
        this.$refs.form.clearValidate(props)
      }
    },
    // 提交
    submit() {
      // 提交前处理
      this.form.powerMenus = this.getTreeMenuCheckedKeys()

      // 提交通用处理
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.saving = true
          const formData = _.cloneDeep(this.form)
          let response = null
          try {
            if (formData.id === '-1') {
              response = await roleService.createRole(formData)
            } else {
              response = await roleService.updateRole(formData)
            }
            const { data } = response.data
            console.log(data)
            this.$emit('save-success')
            this.close()
          } catch (e) {
            console.error('role.submitRole-error:', e)
            this.done()
            const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
            this.$message.error(errorMessage)
          }
        }
      })
    },
    // 获取树选中的数据
    getTreeMenuCheckedKeys() {
      const childKeys = this.$refs.treeMenu.getCheckedKeys()
      const halfKeys = this.$refs.treeMenu.getHalfCheckedKeys()
      return [...childKeys, ...halfKeys]
    }
  }
}
</script>
<style lang="scss" scoped>
.role-form-dialog-tree-container {
  height: 300px;
  padding-top: 5px;
  overflow: auto;
  border-radius: 6px;
  border: 1px solid #dcdfe6;

&:hover {
   border-color: #C0C4CC;
 }
}
</style>
