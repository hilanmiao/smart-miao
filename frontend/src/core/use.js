import Vue from 'vue'
import store from '@/store'

import ElementUI from 'element-ui'
import EventBus from '@/utils/event-bus'
import VEcharts from '@/components/Echarts'

import dayjs from 'dayjs'

import VueSocketIOExt from 'vue-socket.io-extended'
// import { io } from 'socket.io-client'
import io from 'socket.io-client'
const socket = io(process.env.VUE_APP_BASE_SOCKET, {
  // transports: ['websocket'],
  path: '/socket.io',
  reconnection: true,
  reconnectionAttempts: Infinity,
  autoConnect: false
})

Vue.use(EventBus)
// directives

// ui
Vue.use(ElementUI)
Vue.use(VEcharts)

// tools
Vue.prototype.dayjs = dayjs
Vue.prototype.VUE_APP_BASE_API = process.env.VUE_APP_BASE_API

// socket
Vue.use(VueSocketIOExt, socket, { store })

