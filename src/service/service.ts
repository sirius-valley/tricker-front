import axios from 'axios'
import { setUpAxiosInterceptors } from './AxiosInterceptor'

const url: string = process.env.API_URL || 'http://localhost:8080/api'

setUpAxiosInterceptors(axios)

const service = {
  me: async () => {
    const res = await axios.get(`${url}/user/me`)
    if (res.status === 200) {
      return res.data
    }
  }
}

export { service }
