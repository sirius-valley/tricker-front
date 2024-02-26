import axios from 'axios'
// import { setUpAxiosInterceptors } from './AxiosInterceptor'
import { type User, type CognitoResponse } from '@utils/types'
import { getAccessToken, getIdToken, setLoginCookies } from './Cookies'

const url: string =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080/api'

// setUpAxiosInterceptors(axios)

export const me = async (): Promise<User | null> => {
  const res = await axios.get(`${url}/user/me`, {
    headers: {
      Authorization: getAccessToken()
    }
  })
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getOrCreateUser = async (): Promise<User | null> => {
  const res = await axios.post(
    `${url}/user/getOrCreate`,
    {
      idToken: getIdToken()
    },
    {
      headers: {
        Authorization: 'Bearer ' + getAccessToken()
      }
    }
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const verifyToken = async (
  code: string
): Promise<CognitoResponse | null> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_id', '1uibn62hen866a6qufocjp8uuk')
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:5173/login/')
  const res = await axios.post(
    `https://tricker.auth.us-east-2.amazoncognito.com/oauth2/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  if (res.status === 200) {
    const cognitoResponse: CognitoResponse = res.data
    setLoginCookies(cognitoResponse)
    return cognitoResponse
  }
  return null
}
