<template>
  <div class="box-list">
    <div v-for="(item,index) in list" :key="index" class="item">
      <div class="left">
        {{ index + 1 }}
      </div>
      <div class="content">
        {{ item.accountInOutCategory.name }}
      </div>
      <div class="right">
        ¥{{ item.sumTotalAmount }}
      </div>
    </div>
  </div>
</template>

<script>
import { accountInOutService } from '@/services'

export default {
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
        const response = await accountInOutService.statisticsCurrentMonthCategoryRank()
        const { data } = response.data
        this.list = data
      } catch (e) {
        console.error('accountInOut.statisticsCurrentMonthCategoryRank-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box-list {
  height: 250px;
  overflow: auto;
  .item {
    border-bottom: 1px solid #dfe6ec;
    display: flex;
    align-items: center;
    color: #303133;
    padding: 8px;
    font-weight: bold;
    &:first-child {
      padding-top: 0;
    }
    &:nth-child(-n+3) {
      .left {
        background-color: orangered;
        color: #fff;
      }
    }
    .left {
      width: 30px;
      height: 30px;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      border-radius: 4px;
    }
    .content {
      font-size: 18px;
      padding-left: 20px;
      flex: 1;
    }
    .right {
      color: #909399;
    }
  }
}
</style>
