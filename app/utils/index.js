
/**
 * 递归下划线转驼峰
 * @param list
 * @returns {unknown[]}
 */
export function camelizeKeys(obj) {
  if (uni.$_.isArray(obj)) {
    return obj.map(v => camelizeKeys(v))
  } else if (uni.$_.isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [uni.$_.camelCase(key)]: camelizeKeys(obj[key])
      }),
      {}
    )
  }
  return obj
}
