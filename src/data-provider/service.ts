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
  IssueChronologyEventDTO,
  IssueChronologyEvent
} from '@utils/types'
import { getAccessToken, getIdToken, setLoginCookies } from './Cookies'
import config from '@utils/config'
import { mockedTicketDetail } from '@components/TicketDisplay/MockedTicketDetail'
// import express from 'express'
// import rateLimit from 'express-rate-limit'

const url: string = config.apiUrl || 'http://localhost:8080/api'

// setUpAxiosInterceptors(axios)
/*
const app = express()

// Apply rate limiting middleware
const limiter = rateLimit({
windowMs: 60 * 1000, // 1 minute window
max: 5, // Max 5 requests per minute
message: 'Too many requests from this IP, please try again later.'
})

// Apply rate limiting only to the /projects endpoint
app.use('/projects', limiter)
*/

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
  ticketId: string,
  data: ModifyTimeData,
  variant: 'add' | 'remove'
): Promise<any> => {
  const res = await axios.post(
    `${url}/issue/${ticketId}/${variant}-time`,
    data,
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

export const postTimerAction = async (
  ticketId: string,
  date: Date,
  action: 'resume' | 'pause'
): Promise<any> => {
  const res = await axios.post(
    `${url}/issue/${ticketId}/${action}`,
    {
      date
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

export const postBlock = async (
  ticketId: string,
  reason: string,
  comment: string | null
): Promise<any> => {
  const res = await axios.post(
    `${url}/issue/${ticketId}/flag/add`,
    {
      reason,
      comment
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

export const postUnblock = async (ticketId: string): Promise<any> => {
  const res = await axios.post(
    `${url}/issue/${ticketId}/flag/remove`,
    {},
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

export const getTicketElapsedTime = async (
  ticketId: string
): Promise<number | null> => {
  const res = await axios.get(`${url}/issue/${ticketId}/worked-time`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    }
  })
  if (res.status === 200) {
    return res.data
  }
  return null
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
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  // console.log(issueId)
  // return [
  //   {
  //     id: '1',
  //     message: 'Ticket created',
  //     comment: null,
  //     isBlocker: false,
  //     date: new Date()
  //   },
  //   {
  //     id: '1',
  //     message: 'Assigned to me',
  //     comment: null,
  //     isBlocker: false,
  //     date: new Date()
  //   },
  //   {
  //     id: '1',
  //     message: 'Ticket started',
  //     comment: null,
  //     isBlocker: false,
  //     date: new Date()
  //   },
  //   {
  //     id: '1',
  //     message: 'Blocked by another ticket',
  //     comment: 'Blocked by TIK-292',
  //     isBlocker: true,
  //     date: new Date()
  //   },
  //   {
  //     id: '1',
  //     message: 'Ticket started again',
  //     comment: null,
  //     isBlocker: false,
  //     date: new Date()
  //   },
  //   {
  //     id: '1',
  //     message: 'Ticket paused',
  //     comment: null,
  //     isBlocker: false,
  //     date: new Date()
  //   }
  // ]
}
