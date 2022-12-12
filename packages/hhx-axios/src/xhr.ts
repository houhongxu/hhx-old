import { createError, parseData, parseHeaders } from 'helper'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

/**
 * @description: 根据处理后的配置对XMLHttpRequest请求封装
 * @param {AxiosRequestConfig} config
 */
export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'GET', headers = {}, responseType, timeout } = config

    const request = new XMLHttpRequest()

    // 配置返回类型
    if (responseType) {
      request.responseType = responseType
    }

    // 配置超时
    if (timeout) {
      request.timeout = timeout
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

    // 响应回调
    request.onreadystatechange = function handleLoad() {
      // 4为请求已完成，不需要处理
      if (request.readyState !== 4) {
        return
      }

      // 请求未完成：网络错误或超时,在其他回调处理
      if (request.status === 0) {
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

      handleResponse(response)
    }

    // 网络错误回调
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 超时回调
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    /**
     * @description: 处理非200状态码情况
     * @param {AxiosResponse} response
     */
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}
