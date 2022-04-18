<template>
  <u-tabbar class="u-tabbar"
            :list="vuex_tabbar"
            :border-top="true"
            :bg-color="vuex_tabbar_bg_color"
            :active-color="vuex_tabbar_active_color"
            :inactive-color="vuex_tabbar_inactive_color"
            :mid-button="vuex_tabbar_mid"></u-tabbar>
</template>

<script>
export default {
  name: "tabbar"
}
</script>

<style scoped>

</style>
