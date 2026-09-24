<template>
  <el-select
      v-model="selectedValue"
      :multiple="multiple"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :filterable="true"
      :filter-method="handleFilter"
      :style="width ? { width } : {}"
      :collapse-tags="multiple"
      :collapse-tags-tooltip="multiple"
      :max-collapse-tags="maxCollapseTags"
      @change="handleChange"
      @clear="handleClear"
  >
    <el-option
        v-for="item in filteredList"
        :key="item[optionKey]"
        :label="item[optionLabel]"
        :value="item[optionValue]"
    />
  </el-select>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { pinyin } from 'pinyin-pro'

const props = defineProps({
  // 单选：string/number/null；多选：array
  modelValue: {
    type: [String, Number, Array, null],
    default: null
  },
  list: {
    type: Array,
    default: () => [],
    // validator: (list) => list.every(item => item.id !== undefined && typeof item.name === 'string')
  },
  optionKey: { type: String, default: 'id' },
  optionLabel: { type: String, default: 'name' },
  optionValue: { type: String, default: 'id' },
  multiple: { type: Boolean, default: false }, // 控制模式
  placeholder: { type: String, default: '请输入或选择' },
  width: { type: String, default: '' },
  maxCollapseTags : { type: Number, default: 3 },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false }
})

// 在运行时进行动态验证，此时 props 已完全可用
if (import.meta.env.DEV) {
  watch(
      () => [props.list, props.optionKey, props.optionLabel],
      ([list, key, label]) => {
        const invalid = list.some(
            item => item[key] === undefined || typeof item[label] !== 'string'
        )
        if (invalid) {
          console.warn(
              `[MyComponent] Invalid list item: each item must have "${key}" defined and "${label}" as string.`,
              toRaw(list)
          )
        }
      },
      { immediate: true, deep: true }
  )
}

const emit = defineEmits(['update:modelValue', 'change', 'clear'])

// v-model 绑定（自动适配单/多选）
const selectedValue = computed({
  get: () => props.modelValue ?? (props.multiple ? [] : null),
  set: (val) => {
    // 多选时确保是数组，单选时确保不是数组
    const normalized = props.multiple
        ? (Array.isArray(val) ? val : [])
        : (Array.isArray(val) ? val[0] ?? null : val)
    emit('update:modelValue', normalized)
  }
})

// 过滤后的列表
const filteredList = ref([...props.list])

// 预处理拼音
const processedList = computed(() => {
  return props.list.map(item => ({
    ...item,
    // 设置 options.v 为 true 之后，转换结果中的 ü 将会被替换为 v
    _pinyin: pinyin(item[props.optionLabel], { toneType: 'none', type: 'array', v: true }).join('').toLowerCase(),
    _abbr: pinyin(item[props.optionLabel], { toneType: 'none', type: 'array', pattern: 'first', v: true }).join('').toLowerCase()
  }))
})

// 拼音搜索
const handleFilter = (query) => {
  if (!query.trim()) {
    filteredList.value = [...props.list]
    return
  }
  const q = query.toLowerCase()
  filteredList.value = processedList.value.filter(item =>
      item[props.optionLabel].includes(query) ||
      item._pinyin.includes(q) ||
      item._abbr.includes(q)
  )
}

// change 事件：统一返回选中的完整对象（单选）或对象数组（多选）
const handleChange = (val) => {
  if (props.multiple) {
    const selectedItems = props.list.filter(item => val.includes(item[props.optionValue]))
    emit('change', selectedItems)
  } else {
    const selectedItem = props.list.find(item => item[props.optionValue] === val) || null
    emit('change', selectedItem)
  }
}

const handleClear = () => {
  emit('clear')
}

// 监听 list 变化
watch(() => props.list, () => {
  filteredList.value = [...props.list]
}, { deep: true })

// 初始化
filteredList.value = [...props.list]
</script>