import axios from 'axios'
import { setUpAxiosInterceptors } from './AxiosInterceptor'
import { type User, type CognitoResponse } from '@utils/types'

const url: string = import.meta.env.VITE_API_URL

setUpAxiosInterceptors(axios)

const service = {
  me: async (): Promise<User | null> => {
    const res = await axios.get(`${url}/user/me`)
    if (res.status === 200) {
      return res.data
    }
    return null
  },
  verifyToken: async (code: string): Promise<CognitoResponse | null> => {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', '1uibn62hen866a6qufocjp8uuk')
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:5173/login/')
    const res = await axios.post(
      `https://tricker.auth.us-east-2.amazoncognito.com/oauth2/token`,
      params
    )
    if (res.status === 200) {
      return res.data
    }
    return null
  }
}

export { service }
