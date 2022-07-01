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
      <el-form-item label="菜单类型" :label-width="labelWidth" prop="type">
        <el-radio v-model="form.type" label="directory">目录</el-radio>
        <el-radio v-model="form.type" label="menu">菜单</el-radio>
      </el-form-item>
      <el-form-item label="上级节点" :label-width="labelWidth" prop="parentId">
        <el-popover
          v-model="popoverVisible"
          placement="bottom-start"
          width="300"
          trigger="click"
        >
          <el-scrollbar wrap-style="max-height: 300px;">
            <el-tree
              node-key="id"
              :expand-on-click-node="false"
              :data="menus"
              :props="{ children: 'children', label: 'label' }"
              @node-click="handleMenuNodeClick"
            />
          </el-scrollbar>
          <el-input
            slot="reference"
            v-model="form.parentName"
            placeholder="请选择上级节点"
            readonly
          />
        </el-popover>
      </el-form-item>
      <el-form-item label="节点名称" :label-width="labelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="节点路由" :label-width="labelWidth" prop="router">
        <el-input v-model="form.router" autocomplete="off" placeholder="例：/system/power/menu" />
      </el-form-item>
      <el-form-item label="节点图标" :label-width="labelWidth" prop="icon">
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
      <el-form-item v-show="form.type === 'menu'" label="隐藏" :label-width="labelWidth" prop="isHidden">
        <el-switch v-model="form.isHidden" />
      </el-form-item>
      <el-form-item v-show="form.type === 'menu'" label="是否缓存" :label-width="labelWidth" prop="keepalive">
        <el-switch v-model="form.keepalive" />
      </el-form-item>
      <el-form-item v-show="form.type === 'menu'" label="文件路径" :label-width="labelWidth">
        <el-select
          v-model="form.viewPath"
          placeholder="请选择文件路径"
          style="width: 100%;"
        >
          <el-option
            v-for="item in getViewFiles()"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" :label-width="labelWidth" prop="orderNum">
        <el-input v-model="form.orderNum" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="saving" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
// import IconSelector from './icon-selector'
import IconSelector from '@/components/IconSelector'
import { constantRouterComponents } from '@/router'
import { menuService } from '@/services'

export default {
  components: {
    IconSelector
  },
  model: {
    prop: 'dialogVisible',
    event: 'close'
  },
  props: {
    menutree: {
      type: Array,
      required: true
    },
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
        id: '-1',
        parentId: null,
        parentName: null,
        name: null,
        router: null,
        type: 'directory',
        icon: null,
        orderNum: 1,
        viewPath: null,
        keepalive: false,
        isHidden: false
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        parentId: [{ required: true, message: '必填', trigger: 'input' }],
        router: [{ required: true, message: '必填', trigger: 'blur' }]
        // viewPath: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      saving: false,
      popoverVisible: false,
      popoverVisibleIcon: false
      // 业务属性
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
      return this.form.id === '-1' ? '添加菜单' : '编辑菜单'
    },
    menus() {
      return this.menutree
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
      this.form.id = this.formId
    },
    // 设置数据
    async setData() {
      try {
        const response = await menuService.getMenuAndParentMenu({ id: this.form.id })
        const { data } = response.data
        const { menu, parentMenu } = data
        this.form.parentId = parentMenu ? menu.parentId : '-1'
        this.form.parentName = parentMenu ? parentMenu.name : '一级菜单'
        this.form.name = menu.name
        this.form.router = menu.router
        this.form.type = menu.type
        this.form.icon = menu.icon
        this.form.orderNum = menu.orderNum
        this.form.viewPath = menu.viewPath
        this.form.keepalive = menu.keepalive
        this.form.isHidden = menu.isHidden
      } catch (e) {
        console.error('menu.getMenuAndParentMenu-error:', e)
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

      // 提交通用处理
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.saving = true
          const formData = _.cloneDeep(this.form)
          let response = null
          try {
            if (formData.id === '-1') {
              response = await menuService.createMenu(formData)
            } else {
              response = await menuService.updateMenu(formData)
            }
            const { data } = response.data
            console.log(data)
            this.$emit('save-success')
            this.close()
          } catch (e) {
            console.error('menu.submitMenu-error:', e)
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
    },
    // 菜单点击回调
    handleMenuNodeClick(data) {
      const { id, label } = data
      this.form.parentId = id
      this.form.parentName = label
      this.popoverVisible = false
    },
    // 获取视图文件路径
    getViewFiles() {
      return Object.keys(constantRouterComponents)
    }
  }
}
</script>
