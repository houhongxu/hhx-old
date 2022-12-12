import { AxiosRequestConfig, AxiosResponse } from 'types'
import { isPlainObject } from 'utils'

/**
 * @description: 根据配置生成可接受的数据
 * @description: 注意：先处理请求头再处理数据
 * @param {AxiosRequestConfig} config
 */
export function transformData(config: AxiosRequestConfig) {
  const { data } = config

  // 将普通对象转为json
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

/**
 * @description: 解析响应字符串为对象
 * @param {AxiosResponse} data
 */
export function parseData(data: AxiosResponse['data']) {
  if (data && typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {
      console.log(err)
    }
  }

  return data
}
