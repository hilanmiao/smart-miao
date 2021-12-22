<template>
  <div class="notification-container">
    <el-tabs v-model="activeTab" tab-position="left">
      <el-tab-pane label="身份证" name="IDCard">
        <identity-card />
      </el-tab-pane>
      <el-tab-pane label="驾驶证" name="drivingLicense">
        <driving-license />
      </el-tab-pane>
      <el-tab-pane label="行驶证" name="vehicleLicense">
        <driving-license />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import identityCard from './identityCard/index'
import drivingLicense from './driving-license/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Wallet',
  components: { identityCard, drivingLicense },
  data() {
    return {
      user: {},
      activeTab: 'IDCard'
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    activeTab(newValue) {
      this.currentValue = newValue
      // if (newValue === 'read') {
      //   // 更新已读组件数据
      //   this.$refs.read.loadTableData()
      // }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.notification-container {
  padding: 20px;

  ::v-deep .el-card {
    margin: 0 !important;
    box-shadow: none;
    .el-card__body {
      padding: 0 !important;
    }
  }
}
</style>
