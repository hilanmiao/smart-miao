<template>
  <el-select
    :value="value"
    placeholder="请选择图标"
    style="width: 100%;"
    @change="handleSelectChange"
  >
    <el-option v-for="item in svgIcons" :key="item" :label="item" :value="item">
      <span style="float: left; font-size: 16px; color: #444444;">
        <svg-icon :icon-class="item" class-name="select-icon" />
      </span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{
        item
      }}</span>
    </el-option>
  </el-select>
</template>

<script>
// load svg icon name
const req = require.context('@/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()
const re = /\.\/(.*)\.svg/
const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default {
  name: 'IconSelector',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      svgIcons
    }
  },
  methods: {
    handleSelectChange(v) {
      this.$emit('selected', v)
    }
  }
}
</script>

<style></style>
