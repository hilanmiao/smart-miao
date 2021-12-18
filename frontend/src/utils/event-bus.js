// Vue2.x使用EventBus进行组件通信，而Vue3.x推荐使用mitt.js

import mitt from 'mitt'

const install = (Vue) => {
  const emitter = mitt()
  Vue.prototype.$eventBus = emitter
}

export default install
