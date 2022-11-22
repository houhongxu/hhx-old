import { parseData, parseHeaders } from 'helper'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

/**
 * @description: 根据处理后的配置对XMLHttpRequest请求封装
 * @param {AxiosRequestConfig} config
 */
export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'GET', headers = {}, responseType } = config

    const request = new XMLHttpRequest()

    // 配置返回类型
    if (responseType) {
      request.responseType = responseType
    }

    // 配置请求url
    request.open(method.toUpperCase(), url, true)

    // 配置请求头
    Object.keys(headers).forEach((name) => {
      if (data === null && name === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    // 配置响应
    request.onreadystatechange = function handleLoad() {
      // 4为请求完成
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: parseData(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request,
      }

      resolve(response)
    }
  })
}
