import { xhr } from 'xhr'
import { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig) {
  xhr(config)
}

export default axios
