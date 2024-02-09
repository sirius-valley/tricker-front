import Cookies from 'universal-cookie'

export const cookies: Cookies = new Cookies()

export const setLoginCookie = (token: string): void => {
  cookies.set('jwt', token)
}

export const removeLoginCookie = (): void => {
  cookies.remove('jwt')
}

export const getToken = (): string => {
  const jwt: string = cookies.get('jwt')

  return jwt
}
