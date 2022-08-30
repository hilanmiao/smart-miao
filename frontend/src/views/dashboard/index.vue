<template>
  <div class="dashboard-container">
    <panel-group />

    <el-row :gutter="30" style="margin-top:30px;">
      <el-col :lg="16">
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>年度统计</span>
            <!--            <div>-->
            <!--              <el-select v-model="value" size="mini" placeholder="请选择">-->
            <!--                <el-option-->
            <!--                  v-for="item in options"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--              <el-button size="mini" icon="el-icon-more" circle style="margin-left: 16px;" />-->
            <!--            </div>-->
          </div>
          <line-chart :chart-data="lineChartData" />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>本月支出类别排名</span>
          </div>
          <ranking style="height: 300px;" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="30" style="margin-top:30px;">
      <el-col :lg="16">
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>本周收支记录</span>
            <!--            <div>-->
            <!--              <el-select v-model="value" size="mini" placeholder="请选择">-->
            <!--                <el-option-->
            <!--                  v-for="item in options"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--              <el-button size="mini" icon="el-icon-more" circle style="margin-left: 16px;" />-->
            <!--            </div>-->
          </div>
          <transaction-table />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>智能提醒</span>
            <el-button size="mini" icon="el-icon-more" circle />
          </div>
          <alerts />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import Alerts from './components/Alerts'
import Ranking from './components/Ranking'
import { accountBookService } from '@/services'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable,
    Alerts,
    Ranking
  },
  data() {
    return {
      lineChartData: {},
      options: [{
        value: '1',
        label: '我的账本'
      }],
      value: '1'
    }
  },
  computed: {},
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await accountBookService.statisticsEveryMonthInOut()
        const { data } = response.data
        const { inData, outData } = data
        const inDataFull = []
        const outDataFull = []
        for (let i = 1; i <= 12; i++) {
          const findObjIn = inData.find(o => o.month === i)
          const valueIn = findObjIn ? findObjIn.sumTotalAmount : ''
          inDataFull.push(valueIn)

          const findObjOut = outData.find(o => o.month === i)
          const valueOut = findObjOut ? findObjOut.sumTotalAmount : ''
          outDataFull.push(valueOut)
        }
        this.lineChartData = { inDataFull, outDataFull }
      } catch (e) {
        console.error('accountBook.statisticsEveryMonthInOut-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 30px;

  .box-card {
    color: #909399;
    border-radius: 8px;

    .box-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
