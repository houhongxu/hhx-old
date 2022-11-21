import { xhr } from 'xhr'
import { AxiosRequestConfig } from './types'
import { buildUrl } from 'helper'

export function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config

  return buildUrl(url, params)
}
