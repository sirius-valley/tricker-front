import axios from 'axios'
// import { setUpAxiosInterceptors } from './AxiosInterceptor'
import {
  type User,
  type CognitoResponse,
  type ProjectPreIntegrated,
  type MemberPreIntegrated,
  type AuthorizationRequest,
  type Project,
  type IssueView,
  type OptionalIssueFilters,
  Priority,
  StageType
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
  filters?: OptionalIssueFilters,
  cursor?: string
): Promise<IssueView[] | null> => {
  // const res = await axios.post(
  //   `${url}/user/${userId}/project/${projectId}`,
  //   {
  //     stageIds: filters?.stageIds,
  //     priorities: filters?.priorities,
  //     isOutOfEstimation: filters?.isOutOfEstimation,
  //     cursor
  //   },
  //   {
  //     headers: {
  //       Authorization: 'Bearer ' + getAccessToken()
  //     }
  //   }
  // )
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          assignee: {
            id: '1',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'Backlog',
            id: '1',
            type: StageType.BACKLOG
          },
          name: 'Name of the ticket 1 long name',
          title: 'TIK-001',
          priority: Priority.LOW_PRIORITY,
          storyPoints: 3,
          labels: [],
          blocked: true
        },
        {
          id: '2',
          assignee: {
            id: '2',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'TODO',
            id: '2',
            type: StageType.UNSTARTED
          },
          name: 'Name of the ticket 2',
          title: 'TIK-002',
          priority: Priority.URGENT,
          storyPoints: 1,
          labels: []
        },
        {
          id: '3',
          assignee: {
            id: '3',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'In Progress',
            id: '3',
            type: StageType.STARTED
          },
          tracking: true,
          name: 'Name of the ticket 3',
          title: 'TIK-003',
          priority: Priority.HIGH_PRIORITY,
          storyPoints: 2,
          labels: []
        },
        {
          id: '4',
          assignee: {
            id: '4',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'In Review',
            id: '4',
            type: StageType.COMPLETED
          },
          name: 'Name of the ticket 4',
          title: 'TIK-004',
          priority: Priority.MEDIUM_PRIORITY,
          storyPoints: 5,
          labels: []
        },
        {
          id: '5',
          assignee: {
            id: '5',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'TODO',
            id: '5',
            type: StageType.UNSTARTED
          },
          name: 'Name of the ticket 5',
          title: 'TIK-005',
          priority: Priority.LOW_PRIORITY,
          storyPoints: 3,
          labels: []
        },
        {
          id: '6',
          assignee: {
            id: '6',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'Done',
            id: '6',
            type: StageType.COMPLETED
          },
          name: 'Name of the ticket 6',
          title: 'TIK-006',
          priority: Priority.MEDIUM_PRIORITY,
          storyPoints: 5,
          labels: []
        },
        {
          id: '7',
          assignee: {
            id: '7',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'Canceled',
            id: '7',
            type: StageType.CANCELED
          },
          name: 'Name of the ticket 7',
          title: 'TIK-007',
          priority: Priority.LOW_PRIORITY,
          storyPoints: 2,
          labels: []
        },
        {
          id: '8',
          assignee: {
            id: '8',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'Other',
            id: '8',
            type: StageType.OTHER
          },
          name: 'Name of the ticket 8',
          title: 'TIK-008',
          priority: Priority.LOW_PRIORITY,
          storyPoints: 3,
          labels: []
        },
        {
          id: '9',
          assignee: {
            id: '9',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'In Review',
            id: '9',
            type: StageType.COMPLETED
          },
          name: 'Name of the ticket 9',
          title: 'TIK-009',
          priority: Priority.URGENT,
          storyPoints: 3,
          labels: []
        },
        {
          id: '10',
          assignee: {
            id: '10',
            name: 'John Doe',
            profileUrl: 'https://randomuser.me/api/portraits'
          },
          stage: {
            name: 'Done',
            id: '10',
            type: StageType.COMPLETED
          },
          name: 'Name of the ticket 10',
          title: 'TIK-010',
          priority: Priority.LOW_PRIORITY,
          storyPoints: 2,
          labels: []
        }
      ])
    }, 2000)
  })
}
export const getRole = async (
  userProjectRoleId: string
): Promise<string | null> => {
  // const res = await axios.get(`${url}/user/role/${userProjectRoleId}`, {
  //   headers: {
  //     Authorization: 'Bearer ' + getAccessToken()
  //   }
  // })
  // if (res.status === 200) {
  //   return res.data
  // }
  // return null

  // TESTING
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 'Project Manager'
}
