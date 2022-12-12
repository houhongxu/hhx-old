export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: Pairs
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: Pairs
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: number
  request?: XMLHttpRequest
  response?: AxiosResponse
}

export type AxiosPromise = Promise<AxiosResponse>

export type Pairs = { [key: string]: string }
