<template>
  <div class="account-settings-container">
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="基本设置"><account-basic-setting /></el-tab-pane>
        <el-tab-pane label="安全设置"><account-safe-setting /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AccountBasicSetting from './components/basic'
import AccountSafeSetting from './components/safe'

export default {
  name: 'AccountSettings',
  components: {
    AccountBasicSetting,
    AccountSafeSetting
  }
}
</script>

<style lang="scss" scoped>
.account-settings-container {
  margin: 20px;
}
</style>
