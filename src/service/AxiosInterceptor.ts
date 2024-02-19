import {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { getAccessToken, removeLoginCookies } from './Cookies'

export const setUpAxiosInterceptors = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)

  return axiosInstance
}

const onRequest = (
  req: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const accessToken: string = getAccessToken()
  req.headers = { Authorization: accessToken } as AxiosRequestHeaders

  return req
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`Request error: ${JSON.stringify(error)}`)

  return await Promise.reject(error)
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    removeLoginCookies()
    window.location.href = '/login'
  }
  console.error(`Response error: ${JSON.stringify(error)}`)

  return await Promise.reject(error)
}
