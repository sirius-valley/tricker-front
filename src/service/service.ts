import axios from 'axios'
import { setUpAxiosInterceptors } from './AxiosInterceptor'
import { type User } from '@utils/types'

const url: string =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080/api'

setUpAxiosInterceptors(axios)

const service = {
  me: async (): Promise<User | null> => {
    const res = await axios.get(`${url}/user/me`)
    if (res.status === 200) {
      return res.data
    }
    return null
  }
}

export { service }
