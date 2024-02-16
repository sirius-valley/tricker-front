import { type CognitoResponse, type Tokens } from '@utils/types'
import Cookies from 'universal-cookie'

export const cookies: Cookies = new Cookies()

export const setLoginCookie = (response: CognitoResponse): void => {
  cookies.set('id_token', response.tokens.id_token)
  cookies.set('access_token', response.tokens.access_token)
  cookies.set('refresh_token', response.tokens.refresh_token)
}

export const removeLoginCookie = (): void => {
  cookies.remove('id_token')
  cookies.remove('access_token')
  cookies.remove('refresh_token')
}

export const getTokens = (): Tokens => {
  return {
    id_token: getIdToken(),
    access_token: getAccessToken(),
    refresh_token: getRefreshToken()
  }
}

export const getIdToken = (): string => {
  return cookies.get('id_token')
}
export const getAccessToken = (): string => {
  return cookies.get('access_token')
}
export const getRefreshToken = (): string => {
  return cookies.get('refresh_token')
}
