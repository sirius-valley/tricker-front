import axios from 'axios'
// import { setUpAxiosInterceptors } from './AxiosInterceptor'
import {
  type User,
  type CognitoResponse,
  type ProjectPreIntegrated,
  type MemberPreIntegrated,
  type AuthorizationRequest,
  type Project
} from '@utils/types'
import { getAccessToken, getIdToken, setLoginCookies } from './Cookies'

const url: string =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080/api'

// setUpAxiosInterceptors(axios)

export const me = async (): Promise<User | null> => {
  const res = await axios.get(`${url}/user/me`, {
    headers: {
      Authorization: getIdToken()
    }
  })
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getUserProjects = async (): Promise<Project[] | null> => {
  const res = await axios.get(`${url}/me/projects`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
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
  if (res.status === 200 || res.status === 201) {
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

export const getPreIntegratedProjects = async (
  key: string,
  provider: string
): Promise<ProjectPreIntegrated[] | null> => {
  // const res = await axios.post(
  //   `${url}/integration/linear/projects`,
  //   {
  //     key,
  //     provider
  //   },
  //   {
  //     headers: {
  //       Authorization: 'Bearer ' + getAccessToken()
  //     }
  //   }
  // )
  // console.log(res)
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null

  // TESTING
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      providerProjectId: '1',
      name: 'Tricker',
      image: null
    },
    {
      providerProjectId: '2',
      name: 'WeCan',
      image: null
    },
    {
      providerProjectId: '3',
      name: 'Bonterms',
      image: null
    },
    {
      providerProjectId: '4',
      name: 'Mandiant',
      image: null
    },
    {
      providerProjectId: '5',
      name: 'Sawyer',
      image: null
    }
  ]
}

export const getPreIntegratedMembers = async (
  projectId: string
): Promise<MemberPreIntegrated[] | null> => {
  // const res = await axios.get(
  //   `${url}/integration/linear/project/${projectId}/members`,
  //   {
  //     headers: {
  //       Authorization: 'Bearer ' + getAccessToken()
  //     }
  //   }
  // )
  // console.log(res)
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null

  // TESTING
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      providerUserId: '1',
      email: 'victoriacapurro@sirius.com.ar',
      name: 'Victoria Capurro',
      profileImage: null
    },
    {
      providerUserId: '2',
      email: 'fabrizioserial@sirius.com.ar',
      name: 'Fabrizio Serial',
      profileImage: null
    },
    {
      providerUserId: '3',
      email: 'matiaspizzi@gmail.com',
      name: 'Matias Pizzi',
      profileImage: null
    },
    {
      providerUserId: '4',
      email: 'otro@sirius.com.ar',
      name: 'Otro 1',
      profileImage: null
    },
    {
      providerUserId: '5',
      email: 'otro2@sirius.com.ar',
      name: 'Otro 2',
      profileImage: null
    }
  ]
}

export const postProjectIntegrationRequest = async (
  provider: string,
  authorizationRequest: AuthorizationRequest
): Promise<null> => {
  // const res = await axios.post(
  //   `${url}/integration/${provider}/authorization`,
  //   {
  //     authorizationRequest
  //   },
  //   {
  //     headers: {
  //       Authorization: 'Bearer ' + getAccessToken()
  //     }
  //   }
  // )
  // console.log(res)
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null

  // TESTING
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return null
}
