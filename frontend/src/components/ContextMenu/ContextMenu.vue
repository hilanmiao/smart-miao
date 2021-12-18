<template>
  <div
    v-show="visible"
    class="s-context-menu"
    :style="{
      left: style.left + 'px',
      top: style.top + 'px'
    }"
  >
    <div class="context-menu-box">
      <div
        v-for="(o, i) in items"
        :key="i"
        class="item"
        :class="{ enable: !o.disabled }"
        :style="{
          cursor: o.disabled ? 'no-drop' : 'pointer',
          width: style.width + 'px'
        }"
        @click="clickRow(o, i)"
      >
        <span>{{ o.title }}</span>
        <i v-if="o.icon" :class="o.icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'SContextMenu',
  data() {
    return {
      visible: false,
      style: {
        left: 0,
        top: 0,
        width: 160
      },
      meta: null,
      /**
       * {
       *  disabled: true,
       *  title: '测试',
       *  icon 'icon',
       *  meta: {}, // custom
       *  callback: (this, close) => {}
       * }
       */
      items: []
    }
  },
  mounted() {
    document.body.addEventListener('mousedown', e => {
      if (!this.containEl(this.$el, e.target) && e.target !== this.$el) {
        this.close()
      }
    })
    window.addEventListener('resize', this.close)

    // append el
    document.body.appendChild(this.$el)
  },
  methods: {
    show(event, options) {
      if (options.width) {
        this.style.width = options.width
      }

      if (options.meta) {
        this.meta = options.meta
      }

      if (options.items && options.items.length > 0) {
        this.items = cloneDeep(options.items)
      }

      const offest = 10

      // calc position
      const { pageX, pageY } = event || {}
      this.style.left = pageX + offest
      this.style.top = pageY + offest

      event.preventDefault()
      event.stopPropagation()

      this.visible = true
    },
    close() {
      this.meta = null
      this.visible = false
    },
    clickRow(item, i) {
      if (item.disabled) {
        return
      }
      if (item.callback) {
        item.callback({
          close: this.close,
          meta: this.meta,
          index: i,
          item
        })
        return
      }
      this.close()
    },
    containEl(parent, node) {
      return parent !== node && parent.contains(node)
    }
  }
}
</script>

<style lang="scss" scoped>
.s-context-menu {
  position: absolute;
  z-index: 4444;

  .context-menu-box {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    padding: 5px 0;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 0;

    .item {
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 12px;
      padding: 0 15px;
      color: #666;
      position: relative;
      margin-bottom: 2px;

      span {
        height: 30px;
        line-height: 30px;
        flex: 1;
      }
    }

    .enable {
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
