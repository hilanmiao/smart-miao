<template>
  <div class="sys-user-container">
    <table-layout class="table-layout">
      <!--      <template v-slot:asside>-->
      <!--      </template>-->
      <template v-slot:headerLeft>
        <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
        <warning-confirm-button
          button-type="danger"
          :content="`确认批量删除 ${tableMultipleSelection.length} 条数据？`"
          :closed="handleRefresh"
          @confirm="(o) => { handleBulkDelete(o) }"
        >批量删除</warning-confirm-button>
      </template>
      <template v-slot:headerRight>
        <el-input v-model="tableSearchParams.username" size="mini" placeholder="请输入用户名" class="search-input">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="loadTableData">搜索</el-button>
        </el-input>
        <span class="line">|</span>
        <el-button size="mini" icon="el-icon-refresh" @click="handleRefresh" />
        <el-button size="mini" icon="el-icon-download" />
      </template>
      <template>
        <el-table
          v-loading="tableLoading"
          class="has-checkbox"
          :data="tableData"
          size="small"
          :header-cell-style="{ backgroundColor: '#ebeef4' }"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" width="30" fixed="left" />
          <el-table-column type="selection" align="center" width="30" fixed="left" />
          <el-table-column
            prop="headImg"
            label="头像"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-avatar
                v-if="!scope.row.avatar"
                size="small"
                icon="el-icon-user-solid"
              />
              <el-avatar v-else size="small" :src="VUE_APP_BASE_API + scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="180"
          >
            <template slot-scope="{row}">
              <span class="link-type" @click="handleEdit(row)">{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="实名"
            width="160"
            align="center"
          />
          <el-table-column
            prop="displayName"
            label="昵称"
            width="160"
            align="center"
          />
          <el-table-column
            prop="roleNames"
            label="所属角色"
            align="center"
            header-align="center"
            width="220"
          >
            <template slot-scope="scope">
              <el-tag
                v-for="item in scope.row.systemRoles"
                :key="item.id"
                type="success"
                size="small"
                :style="{ 'margin-right': '3px' }"
              >{{ item.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="300"
          />
          <el-table-column
            prop="mobile"
            label="手机"
            align="center"
            width="300"
          />
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 1 ? 'success' : 'danger'"
                effect="dark"
                size="small"
              >{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <warning-confirm-button
                :closed="handleRefresh"
                @confirm="(o) => { handleDelete(scope.row, o) }"
              >删除</warning-confirm-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-slot:pagination>
        <pagination v-show="tablePagination.total>0" :total="tablePagination.total" :page.sync="tablePagination.currentPage" :limit.sync="tablePagination.pageSize" @pagination="loadTableData" />
      </template>
    </table-layout>

    <user-form-dialog ref="formDialog" v-model="dialogVisible" :form-id="formId" @save-success="handleRefresh" />
  </div>
</template>

<script>
import _ from 'lodash'
import userFormDialog from './components/user-form-dialog'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import TableLayout from '@/layout/components/TableLayout'
import Pagination from '@/components/Pagination'
import { userService } from '@/services'

export default {
  name: 'SystemMenu',
  components: {
    TableLayout,
    Pagination,
    WarningConfirmButton,
    userFormDialog
  },
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
        username: ''
      },
      tablePaginationDefault: null,
      tableSearchParamsDefault: null,
      tableMultipleSelection: [],
      // 导出配置
      // 表单相关
      dialogVisible: false,
      formId: '-1'
    }
  },
  created() {
    this.loadTableData()
    // 拷贝默认值
    this.tablePaginationDefault = _.cloneDeep(this.tablePagination)
    this.tableSearchParamsDefault = _.cloneDeep(this.tableSearchParams)
  },
  destroyed() {
    this.tablePaginationDefault = null
    this.tableSearchParamsDefault = null
  },
  methods: {
    // 加载表格数据
    async loadTableData() {
      this.tableLoading = true
      const page = this.tablePagination.currentPage
      const limit = this.tablePagination.pageSize
      const username = this.tableSearchParams.username
      try {
        const response = await userService.getUserListByPage({ page, limit, username })
        const { data } = response.data
        this.tableData = data.list
        this.tablePagination.total = data.pagination.total
        this.tableLoading = false
      } catch (e) {
        console.error('user.getUserListByPage-error:', e)
        this.tableLoading = false
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 多选框选择事件
    handleSelectionChange(selection) {
      this.tableMultipleSelection = selection
    },
    // 刷新表格数据
    handleRefresh() {
      // 重置
      this.tablePagination = _.cloneDeep(this.tablePaginationDefault)
      this.tableSearchParams = _.cloneDeep(this.tableSearchParamsDefault)

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
        await userService.deleteUser({ ids: [row.id] })
        close()
      } catch (e) {
        console.error('user.deleteUser-error:', e)
        done()
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 批量删除
    async handleBulkDelete({ done, close }) {
      try {
        const ids = _.map(this.tableMultipleSelection, 'id')
        await userService.deleteUser({ ids })
        close()
      } catch (e) {
        console.error('user.deleteUser-error:', e)
        done()
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/table-layout.scss";

</style>
