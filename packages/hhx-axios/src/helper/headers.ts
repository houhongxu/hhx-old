import { AxiosRequestConfig, AxiosResponse, Pairs } from 'types'
import { isPlainObject } from 'utils'

/**
 * @description: 根据配置生成标准请求头，并提供默认请求头
 * @description: 注意：先处理请求头再处理数据
 * @param {AxiosRequestConfig} config
 */
export function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config

  normalizeHeaderName(headers)

  if (isPlainObject(data)) {
    if (headers && !headers['content-type']) {
      headers['content-type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * @description: 解析响应头成对象
 * @param {string} headers
 */
export function parseHeaders(headers: string): Pairs {
  const parsedHeaders: Pairs = {}

  headers.split('\r\n').forEach((line) => {
    let [key, value] = line.split(':')
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    key = key.trim().toLowerCase()
    parsedHeaders[key] = value
  })

  return parsedHeaders
}

/**
 * @description: 将传入的请求头转换为小写标准
 * @param {AxiosRequestConfig} headers
 */
function normalizeHeaderName(headers: AxiosRequestConfig['headers']) {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach((name) => {
    headers[name.toLowerCase()] = headers[name]
    delete headers[name]
  })
}
