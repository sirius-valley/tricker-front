import axios from 'axios'
// import { setUpAxiosInterceptors } from './AxiosInterceptor'
import type {
  User,
  CognitoResponse,
  ProjectPreIntegrated,
  MemberPreIntegrated,
  AuthorizationRequest,
  IssueView,
  OptionalIssueFilters,
  IssueDetail,
  ModifyTimeData,
  IssueChronologyEvent,
  IssueChronologyEventDTO
} from '@utils/types'
import { getAccessToken, getIdToken, setLoginCookies } from './Cookies'
import config from '@utils/config'
import { mockedTicketDetail } from '@components/TicketDisplay/MockedTicketDetail'

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

export const getUserProjects = async (): Promise<User | null> => {
  const res = await axios.get(`${url}/user/me`, {
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
  if (code === '') return null
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
}

export const postModifyTime = async (
  data: ModifyTimeData,
  variant: 'add' | 'subtract'
): Promise<any> => {
  console.log(data)
  console.log(`${url}/${variant}-time`)
  const res = await axios.post(
    `${url}/${variant}-time`,
    {
      data
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
}

export const getIssuesFilteredAndPaginated = async (
  userId: string,
  projectId: string,
  filters?: OptionalIssueFilters
): Promise<IssueView[]> => {
  const res = await axios.post(
    `${url}/issue/dev/${userId}/project/${projectId}`,
    filters,
    {
      headers: {
        Authorization: 'Bearer ' + getAccessToken()
      }
    }
  )
  if (res.status === 200) {
    return res.data
  }
  return []
}

export const getIssueById = async () // ticketId: string
: Promise<IssueDetail | null> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockedTicketDetail
}

export const getChronology = async (
  issueId: string
): Promise<IssueChronologyEvent[]> => {
  const res = await axios.get(`${url}/issue/${issueId}/chronology`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    }
  })
  if (res.status === 200) {
    ;(res.data as IssueChronologyEventDTO[]).forEach((element) => {
      element.date = new Date(element.date)
    })
    return res.data
  }
  return []
}
