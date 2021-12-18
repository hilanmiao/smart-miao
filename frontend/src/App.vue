<template>
  <div id="app">
    <loading v-show="routerLoading" />
    <router-view />
  </div>
</template>

<script>
import loading from '@/components/Loading'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    loading
  },
  computed: {
    ...mapGetters([
      'routerLoading'
    ])
  }
}
</script>
