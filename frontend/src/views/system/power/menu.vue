<template>
  <div class="sys-menu-container">
    <table-layout class="table-layout">
      <template v-slot:headerLeft>
        <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
      </template>
      <template v-slot:headerRight>
        <el-button size="mini" icon="el-icon-refresh" @click="handleRefresh" />
      </template>
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="tableData"
          size="small"
          :header-cell-style="{ backgroundColor: '#ebeef4' }"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="handleRowClick"
        >
          <el-table-column prop="name" label="名称" width="240">
            <template slot-scope="scope">
              <span style="margin-right: 16px">{{ scope.row.name }}</span>
              <el-tag
                v-if="scope.row.isHidden"
                type="danger"
                effect="dark"
                size="small"
              >隐藏</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="icon" label="图标" width="60" align="center">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="80" align="center">
            <template slot-scope="scope">
              <el-tag size="small" effect="dark">{{ getMenuType(scope.row.type) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="router"
            label="节点路由"
            align="center"
            width="240"
          />
          <el-table-column
            prop="keepalive"
            label="路由缓存"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <i
                v-if="scope.row.keepalive && scope.row.type === 1"
                class="el-icon-check"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="viewPath"
            label="文件路径"
            align="center"
            width="280"
          />
          <el-table-column
            prop="orderNum"
            label="排序号"
            width="80"
            align="center"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="180"
            align="center"
          />
          <el-table-column label="操作" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click.stop="handleEdit(scope.row)"
              >编辑</el-button>
              <warning-confirm-button
                :closed="handleRefresh"
                @confirm="(o) => { handleDelete(scope.row, o) }"
              >删除</warning-confirm-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </table-layout>

    <menu-form-dialog ref="formDialog" v-model="dialogVisible" :form-id="formId" :menutree="menutree" @save-success="handleRefresh" />
  </div>
</template>

<script>
import MenuFormDialog from '../components/power-menu-form-dialog'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import PowerMenuMixin from '@/core/mixins/power-menu'
import TableLayout from '@/layout/components/TableLayout'
import { menuService } from '@/services'

export default {
  name: 'SystemPowerMenu',
  components: {
    MenuFormDialog,
    TableLayout,
    WarningConfirmButton
  },
  mixins: [PowerMenuMixin],
  data() {
    return {
      // 列表相关
      tableData: [],
      tableLoading: false,
      tablePagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableSearchParams: {
        name: ''
      },
      tableMultipleSelection: [],
      // 表单相关
      dialogVisible: false,
      formId: '-1',
      menutree: []
    }
  },
  created() {
    this.loadTableData()
  },
  methods: {
    // 加载表格数据
    async loadTableData() {
      this.tableLoading = true

      try {
        const response = await menuService.getMenuList()
        const { data } = response.data
        // clean
        if (this.menutree && this.menutree.length > 0) {
          this.menutree = []
        }
        // 同时缓存树形菜单
        const parentNode = { id: '-1', label: '一级菜单' }
        parentNode.children = this.filterMenuToTree(data, null)
        this.menutree.push(parentNode)

        this.tableData = this.filterMenuToTable(data, null)
        this.tableLoading = false
      } catch (e) {
        console.error('menu.getMenuList-error:', e)
        this.tableLoading = false
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 刷新表格数据
    handleRefresh() {
      this.loadTableData()
    },
    // 新增
    handleAdd() {
      this.formId = '-1'
      this.dialogVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.formId = row.id
      this.dialogVisible = true
    },
    // 删除
    async handleDelete(row, { done, close }) {
      try {
        await menuService.deleteMenu({ ids: [row.id] })
        close()
      } catch (e) {
        console.error('role.deleteRole-error:', e)
        done()
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 将对应菜单类型转为字符串字意
    getMenuType(type) {
      switch (type) {
        case 'directory':
          return '目录'
        case 'menu':
          return '菜单'
      }
    },
    // 展开
    handleRowClick(row) {
      this.$refs.table.toggleRowExpansion(row)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/table-layout.scss";

</style>
