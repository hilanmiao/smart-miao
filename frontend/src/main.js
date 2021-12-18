import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './styles/element-variables.scss'

import './styles/index.scss' // global css

import './bootstrap'
import './core/use' // vue use
import './icons' // icon

import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export default vm
