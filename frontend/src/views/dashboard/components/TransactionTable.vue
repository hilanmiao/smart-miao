<template>
  <el-table :data="list" size="mini" max-height="250">
    <el-table-column label="分类" width="150">
      <template slot-scope="{ row }">
        <el-avatar size="small">
          <svg-icon :icon-class="row.accountInOutCategory.icon" />
        </el-avatar>
        {{ row.accountInOutCategory.name }}
      </template>
    </el-table-column>
    <el-table-column label="时间" width="150" align="left">
      <template slot-scope="{ row }">
        {{ row.inOutDate }}
      </template>
    </el-table-column>
    <el-table-column label="备注" align="left">
      <template slot-scope="{ row }">
        {{ row.remark }}
      </template>
    </el-table-column>
    <el-table-column label="金额" width="100" align="left">
      <template slot-scope="{row}">
        <el-tag v-if="row.type === 'out'" type="danger" size="mini">
          -{{ row.amount }}
        </el-tag>
        <el-tag v-else type="success" size="mini">
          +{{ row.amount }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { accountInOutService } from '@/services'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await accountInOutService.statisticsCurrentWeekInOut()
        const { data } = response.data
        this.list = data
      } catch (e) {
        console.error('accountInOut.statisticsCurrentWeekInOut-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table {
  ::v-deep .cell {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 8px;
    }
  }
}
</style>
