<template>
  <el-row :gutter="30" class="panel-group">
    <el-col :lg="6" class="card-panel-col">
      <el-card class="box-card">
        <div class="box-title">
          本月支出
        </div>
        <div class="box-content">
          <div class="box-amount">
            ¥<count-to :start-val="0" :end-val="statisticsData.monthOut" :duration="2000" />
          </div>
          <div class="box-tag">
            <el-tag v-if="diffPercentOut < 0" type="danger" size="small">{{ diffPercentOut }}%</el-tag>
            <el-tag v-else type="success" size="small">+{{ diffPercentOut }}%</el-tag>
          </div>
        </div>
        <div class="box-footer">
          上月支出 ¥{{ statisticsData.monthOutPrevious }}
        </div>
      </el-card>
    </el-col>
    <el-col :lg="6" class="card-panel-col">
      <el-card class="box-card">
        <div class="box-title">
          本月收入
        </div>
        <div class="box-content">
          <div class="box-amount">
            ¥<count-to :start-val="0" :end-val="statisticsData.monthIn" :duration="2000" />
          </div>
          <div class="box-tag">
            <el-tag v-if="diffPercentIn < 0" type="danger" size="small">{{ diffPercentIn }}%</el-tag>
            <el-tag v-else type="success" size="small">+{{ diffPercentIn }}%</el-tag>
          </div>
        </div>
        <div class="box-footer">
          上月收入 ¥{{ statisticsData.monthInPrevious }}
        </div>
      </el-card>
    </el-col>
    <el-col :lg="6" class="card-panel-col">
      <el-card class="box-card">
        <div class="box-title">
          本月记账笔数
        </div>
        <div class="box-content">
          <div class="box-amount">
            <count-to :start-val="0" :end-val="statisticsData.monthCount" :duration="2000" />
          </div>
          <div class="box-tag">
            <el-tag v-if="diffPercentCount < 0" type="danger" size="small">{{ diffPercentCount }}%</el-tag>
            <el-tag v-else type="success" size="small">+{{ diffPercentCount }}%</el-tag>
          </div>
        </div>
        <div class="box-footer">
          上月记账笔数 {{ statisticsData.monthCountPrevious }}
        </div>
      </el-card>
    </el-col>
    <el-col :lg="6" class="card-panel-col">
      <el-card class="box-card">
        <div class="box-title">
          净资产
        </div>
        <div class="box-content">
          <div class="box-amount">
            ¥<count-to :start-val="0" :end-val="statisticsData.allBalance" :duration="2000" />
          </div>
          <div class="box-tag" />
        </div>
        <div class="box-footer">
          上月结余 ¥{{ statisticsData.monthSurplusPrevious }}
        </div>
      </el-card>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { accountBookService } from '@/services'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      statisticsData: {
        monthCount: 0,
        monthIn: 0,
        monthOut: 0,
        monthCountPrevious: 0,
        monthInPrevious: 0,
        monthOutPrevious: 0,
        allBalance: 0,
        monthSurplusPrevious: 0
      },
      diffPercentIn: 0,
      diffPercentOut: 0,
      diffPercentCount: 0
    }
  },
  watch: {
    statisticsData: {
      handler(val) {
        const { monthOut, monthOutPrevious, monthIn, monthInPrevious, monthCount, monthCountPrevious } = val
        const diffOut = monthOut - monthOutPrevious
        let percentOut = (Math.abs(diffOut) / monthOutPrevious * 100).toFixed(2)
        if (diffOut < 0) {
          percentOut = percentOut * -1
        }
        this.diffPercentOut = percentOut

        const diffIn = monthIn - monthInPrevious
        let percentIn = (Math.abs(diffIn) / monthInPrevious * 100).toFixed(2)
        if (diffIn < 0) {
          percentIn = percentIn * -1
        }
        this.diffPercentIn = percentIn

        const diffCount = monthCount - monthCountPrevious
        let percentCount = (Math.abs(diffCount) / monthCountPrevious * 100).toFixed(2)
        if (diffCount < 0) {
          percentCount = percentCount * -1
        }
        this.diffPercentCount = percentCount
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await accountBookService.statisticsCurrentMonthComprehensive()
        const { data } = response.data
        this.statisticsData = data
      } catch (e) {
        console.error('accountBook.statisticsCurrentMonthComprehensive-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .box-card {
    color: #909399;
    border-radius: 8px;
    .box-title {
      font-weight: bold;
    }
    .box-content {
      display: flex;
      align-items: center;
      margin: 18px 0;
      .box-amount {
        color: #303133;
        font-size: 20px;
        font-weight: bold;
      }
      .box-tag {
        margin-left: 20px;
      }
    }
    .box-footer {
      font-size: 14px;
    }
  }
}
</style>
