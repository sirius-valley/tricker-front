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
import config from '@utils/config'

const url: string = config.apiUrl || 'http://localhost:8080/api'

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

  // TESTING
  // const mockedUser: User = {
  //   id: '1',
  //   email: 'username@sirius.com.ar',
  //   name: 'User Name',
  //   projectsRoleAssigned: [
  // {
  //   id: '1',
  //   userId: '1',
  //   projectId: '1',
  //   user: {
  //     id: '1',
  //     cognitoId: '',
  //     profileImage: '',
  //     email: '',
  //     name: ''
  //   },
  //   role: {
  //     id: '1',
  //     name: 'Project Manager',
  //     users: []
  //   }
  // }
  //   ]
  // }
  // await new Promise((resolve) => setTimeout(resolve, 500))
  // return mockedUser
}

export const verifyToken = async (
  code: string
): Promise<CognitoResponse | null> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_id', config.cognitoClientId)
  params.append('code', code)
  params.append('redirect_uri', window.location.href.split('?')[0])
  const res = await axios.post(config.cognitoUrl, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
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
  const res = await axios.post(
    `${url}/integration/linear/projects`,
    {
      key,
      provider
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

  // TESTING
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  // return [
  //   {
  //     providerProjectId: '1',
  //     name: 'Tricker',
  //     image: null
  //   },
  //   {
  //     providerProjectId: '2',
  //     name: 'WeCan',
  //     image: null
  //   },
  //   {
  //     providerProjectId: '3',
  //     name: 'Bonterms',
  //     image: null
  //   },
  //   {
  //     providerProjectId: '4',
  //     name: 'Mandiant',
  //     image: null
  //   },
  //   {
  //     providerProjectId: '5',
  //     name: 'Sawyer',
  //     image: null
  //   }
  // ]
}

export const getPreIntegratedMembers = async (
  projectId: string,
  apiToken: string
): Promise<MemberPreIntegrated[] | null> => {
  const res = await axios.post(
    `${url}/integration/linear/project/${projectId}/members`,
    {
      apiToken
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

  // TESTING
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  // return [
  //   {
  //     providerUserId: '1',
  //     email: 'victoriacapurro@sirius.com.ar',
  //     name: 'Victoria Capurro',
  //     profileImage: null
  //   },
  //   {
  //     providerUserId: '2',
  //     email: 'fabrizioserial@sirius.com.ar',
  //     name: 'Fabrizio Serial',
  //     profileImage: null
  //   },
  //   {
  //     providerUserId: '3',
  //     email: 'matiaspizzi@gmail.com',
  //     name: 'Matias Pizzi',
  //     profileImage: null
  //   },
  //   {
  //     providerUserId: '4',
  //     email: 'otro@sirius.com.ar',
  //     name: 'Otro 1',
  //     profileImage: null
  //   },
  //   {
  //     providerUserId: '5',
  //     email: 'otro2@sirius.com.ar',
  //     name: 'Otro 2',
  //     profileImage: null
  //   }
  // ]
}

export const postProjectIntegrationRequest = async (
  provider: string,
  authorizationRequest: AuthorizationRequest
): Promise<null> => {
  const res = await axios.post(
    `${url}/integration/${provider}/authorization`,
    {
      apiToken: authorizationRequest.apiToken,
      projectId: authorizationRequest.projectId,
      integratorId: authorizationRequest.integratorId,
      members: authorizationRequest.members,
      organizationName: authorizationRequest.organizationName,
      issueProviderName: authorizationRequest.issueProviderName
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

  // TESTING
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  // return null
}
