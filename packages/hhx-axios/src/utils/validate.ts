const toString = (value: any) => Object.prototype.toString.call(value)

/**
 * @description: 判断是否为Date对象
 * @param {any} value
 */
export function isDate(value: any): value is Date {
  return toString(value) === '[object Date]'
}

/**
 * @description: 判断是否为普通对象
 * @param {any} value
 */
export function isPlainObject(value: any): value is Object {
  return toString(value) === '[object Object]'
}

/**
 * @description: 判断是否为空数组
 * @param {any} value
 */
export const isArrayEmpty = (value?: any) => !Array.isArray(value) || value.length === 0

/**
 * @description: 判断是否为空对象
 * @param {any} value
 */
export const isObjectEmpty = (value?: any) => !isPlainObject(value) || isArrayEmpty(Object.keys(value))
