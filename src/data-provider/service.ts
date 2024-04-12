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
  IssueChronologyEvent,
  DevProjectFiltersDTO,
  PMProjectFiltersDTO,
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
): Promise<null> => {
  const res = await withInterceptors.post(
    `${url}/integration/${provider.toLowerCase()}/authorization`,
    {
      apiToken: authorizationRequest.apiToken,
      projectId: authorizationRequest.projectId,
      integratorId: authorizationRequest.integratorId,
      members: authorizationRequest.members,
      organizationName: authorizationRequest.organizationName,
      issueProviderName: authorizationRequest.issueProviderName
    }
  )
  if (res.status === 200) {
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
      cursor: filters.cursor
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
  const res = await withInterceptors.post(
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
  // const res = await withInterceptors.get(`${url}/projects/${projectName}`)
  // if (res.status === 200) {
  //   return res.data
  // }
  // return []
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(projectName)
      resolve(null)
    }, 2000)
  })
  return [
    {
      id: '21273388-2367-4dc2-a57c-9432225b0611',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: 'bb0d2651-74ba-40be-a0ce-706a3a270ea4',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '10',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '9',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '8',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '7',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '6',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '5',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '3',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '1',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '42',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '22',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '43',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '24',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '45',
      name: 'test 2',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    },
    {
      id: '26',
      name: 'Tricker',
      image:
        'https://uploads.linear.app/38017044-c52a-4839-8602-87ced344f75c/a3768864-8de4-42a2-b919-8bafad1b7b8f/256x256/8355df5c-918d-40fb-99f1-f73274f5122f'
    }
  ]
}

export const getChronology = async (
  issueId: string
): Promise<IssueChronologyEvent[]> => {
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

export const refreshProject = async (
  projectId: string,
  apiToken: string
): Promise<Date | null> => {
  // const res = await withInterceptors.post(
  //   `${url}/project/${projectId}/synchronize`,
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

export const deleteProject = async (projectId: string): Promise<void> => {
  // const res = await withInterceptors.delete(`${url}/project/${projectId}`)
  // if (res.status === 204) {
  //   return
  // }

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(projectId)
      resolve(null)
    }, 2000)
  })
}

export const removeTeamMember = async (
  projectId: string,
  userId: string
): Promise<void> => {
  // const res = await withInterceptors.delete(`${url}/project/${projectId}/member/${userId}`)
  // if (res.status === 204) {
  //   return
  // }

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(projectId, userId)
      resolve(null)
    }, 2000)
  })
}
