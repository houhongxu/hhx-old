import { xhr } from 'xhr'
import { AxiosPromise, AxiosRequestConfig } from './types'
import { transformData, transformHeaders, transformUrl } from 'helper'

export function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

/**
 * @description: 将配置数据处理为可发送的数据
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig) {
  config.headers = transformHeaders(config)

  config.url = transformUrl(config)

  config.data = transformData(config)
}
