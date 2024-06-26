import axios from 'axios'
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
  DevProjectFiltersDTO,
  PMProjectFiltersDTO,
  PendingProjectInfoDTO,
  ProjectView,
  UpdateRoleReponse,
  MyProjectsOption
} from '@utils/types'
import { getIdToken, setLoginCookies } from './Cookies'
import config from '@utils/config'
import { setUpAxiosInterceptors } from './AxiosInterceptor'

const url: string = config.apiUrl || 'http://localhost:8080/api'

const withInterceptors = axios.create()
setUpAxiosInterceptors(withInterceptors)

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
  const res = await withInterceptors.get(`${url}/user/me`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getOrCreateUser = async (): Promise<User | null> => {
  const res = await withInterceptors.post(`${url}/user/getOrCreate`, {
    idToken: getIdToken()
  })
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
  const res = await withInterceptors.post(
    `${url}/integration/${provider.toLocaleLowerCase()}/projects`,
    {
      key
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
  const res = await withInterceptors.post(
    `${url}/integration/linear/project/${projectId}/members`,
    {
      apiToken
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
  const res = await withInterceptors.post(
    `${url}/issue/${ticketId}/${variant}-time`,
    data
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postProjectIntegrationRequest = async (
  provider: string,
  authorizationRequest: AuthorizationRequest
): Promise<boolean | null> => {
  const res = await withInterceptors.post(
    `${url}/integration/${provider.toLowerCase()}/authorization`,
    {
      apiToken: authorizationRequest.apiToken,
      projectId: authorizationRequest.projectId,
      integratorId: authorizationRequest.integratorId,
      members: authorizationRequest.members,
      organizationName: authorizationRequest.organizationName
    }
  )
  if (res.status === 201) {
    return res.data
  }
  return null
}

export const getIssuesFilteredAndPaginated = async (
  isProjectManager: boolean,
  userId: string,
  projectId: string,
  filters: OptionalIssueFilters
): Promise<IssueView[]> => {
  const role = isProjectManager ? 'pm' : 'dev'
  const res = await withInterceptors.post(
    `${url}/issue/${role}/${userId}/project/${projectId}`,
    {
      stageIds:
        filters.stageIds && filters.stageIds.length > 0
          ? filters.stageIds
          : undefined,
      priorities:
        filters.priorities && filters.priorities.length > 0
          ? filters.priorities
          : undefined,
      assigneeIds:
        filters.assigneeIds && filters.assigneeIds.length > 0
          ? filters.assigneeIds
          : undefined,
      isOutOfEstimation: filters.isOutOfEstimation === true ? true : undefined,
      cursor: filters.cursor,
      name: filters.searchedValue === '' ? undefined : filters.searchedValue
    }
  )
  if (res.status === 200) {
    return res.data
  }
  return []
}

export const getIssueById = async (
  issueId: string
): Promise<IssueDetail | null> => {
  if (issueId === '') return null
  const res = await withInterceptors.get(`${url}/issue/${issueId}`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postTimerAction = async (
  ticketId: string,
  date: Date,
  action: 'resume' | 'pause'
): Promise<any> => {
  const res = await withInterceptors.post(
    `${url}/issue/${ticketId}/${action}`,
    {
      date
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
  const res = await withInterceptors.post(`${url}/issue/${ticketId}/flag/add`, {
    reason,
    comment
  })
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postUnblock = async (ticketId: string): Promise<any> => {
  const res = await withInterceptors.delete(
    `${url}/issue/${ticketId}/flag/remove`,
    {}
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getTicketElapsedTime = async (
  ticketId: string
): Promise<{ workedTime: number } | null> => {
  const res = await withInterceptors.get(`${url}/issue/${ticketId}/worked-time`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getFilters = async (
  projectId: string,
  userRole: 'pm' | 'dev'
): Promise<DevProjectFiltersDTO | PMProjectFiltersDTO | null> => {
  const res = await withInterceptors.get(
    `${url}/projects/${projectId}/filters/${userRole}`
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getMyProjects = async (
  projectName: string
): Promise<MyProjectsOption[]> => {
  const res = await withInterceptors.get(
    `${url}/projects?projectName=${projectName || ''}`
  )
  if (res.status === 200) {
    return res.data
  }
  return []
}

export const getChronology = async (
  issueId: string
): Promise<IssueChronologyEventDTO[]> => {
  const res = await withInterceptors.get(`${url}/issue/${issueId}/chronology`)

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

export const postRefreshProject = async (
  projectId: string,
  apiToken: string
): Promise<Date | null> => {
  // const res = await withInterceptors.post(
  //   `${url}/projects/${projectId}/synchronize`,
  //   { apiToken }
  // )
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null
  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log(projectId, apiToken)
      resolve(new Date())
    }, 2000)
  })
}

export const deleteProject = async (projectId: string): Promise<boolean> => {
  const res = await withInterceptors.delete(`${url}/projects/${projectId}`)
  if (res.status === 204) {
    return true
  }
  return false
}

export const deleteTeamMember = async (
  projectId: string,
  userId: string
): Promise<boolean> => {
  const res = await withInterceptors.delete(
    `${url}/projects/${projectId}/member/${userId}`
  )
  if (res.status === 204) {
    return true
  }
  return false
}

export const postModifyMemberRole = async (
  projectId: string,
  userId: string,
  roleId: string
): Promise<UpdateRoleReponse | null> => {
  const res = await withInterceptors.post(
    `${url}/user/${userId}/project/${projectId}/modification`,
    { roleId }
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getProject = async (
  projectId: string
): Promise<ProjectView | null> => {
  const res = await withInterceptors.get(`${url}/projects/${projectId}`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getEmailInformation = async (
  projectId: string,
  token: string
): Promise<PendingProjectInfoDTO | null> => {
  const res = await withInterceptors.get(
    `${url}/integration/linear/${projectId}/information?token=${token}`
  )
  if (res.status === 200) {
    return res.data
  }
  return null
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(projectId, token)
  //     resolve(null)
  //   }, 2000)
  // })
  // return {
  //   projectName: 'Fede',
  //   projectImage: '',
  //   pmName: 'Tricker',
  //   pmImage: ''
  // }
}
export const acceptOrDeclineEmail = async (
  projectId: string,
  token: string,
  decline: boolean
): Promise<PendingProjectInfoDTO | null> => {
  const res = await withInterceptors.get(
    `${url}/integration/linear/${projectId}/${decline ? 'decline' : 'accept'}?token=${token}`
  )
  if (res.status === 200) {
    return res.data
  }
  return null
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(projectId, token)
  //     resolve(null)
  //   }, 2000)
  // })
  // return {
  //   projectName: 'Fede',
  //   projectImage: '',
  //   pmName: 'Tricker',
  //   pmImage: ''
  // }
}

export const getIssuesByTitle = async (
  isProjectManager: boolean,
  userId: string,
  projectId: string,
  issueName: string,
  searchedText: string
): Promise<Array<{ id: string; name: string }>> => {
  // const res = await withInterceptors.get(`${url}/issue/${issueName}`)
  // if (res.status === 200) {
  //   return res.data
  // }
  // return []

  const issues = await getIssuesFilteredAndPaginated(
    isProjectManager,
    userId,
    projectId,
    { searchedValue: searchedText }
  )
  console.log(issueName)
  return issues
    .filter((issue) => issue.name !== issueName)
    .map((issue: IssueView) => ({
      id: issue.id,
      name: issue.name
    }))
}
