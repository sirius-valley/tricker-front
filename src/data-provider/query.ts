import { useMutation, useQuery } from '@tanstack/react-query'
import * as ApiService from './service'

import type {
  User,
  CognitoResponse,
  ProjectPreIntegrated,
  MemberPreIntegrated,
  AuthorizationRequest,
  OptionalIssueFilters,
  IssueView,
  IssueDetail,
  ModifyTimeData,
  IssueChronologyEvent,
  DevProjectFiltersDTO,
  PMProjectFiltersDTO,
  ProjectView
} from '@utils/types'

export const useGetMe = (): {
  data: User | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: ApiService.me
  })
  return { data, error, isLoading }
}

export const useGetOrCreateUser = (): {
  data: User | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getOrCreateUser'],
    queryFn: ApiService.getOrCreateUser,
    retry: false
  })
  return { data, error, isLoading }
}

export const useVerifyToken = (
  code: string
): {
  data: CognitoResponse | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['verifyToken', code],
    queryFn: async () => await ApiService.verifyToken(code),
    retry: false
  })
  return { data, error, isLoading }
}

export const useGetPreIntegratedProjects = (
  key: string,
  provider: string
): {
  data: ProjectPreIntegrated[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getPreIntegratedProjects', key, provider],
    queryFn: async () =>
      await ApiService.getPreIntegratedProjects(key, provider)
  })
  return { data, error, isLoading }
}

export const useGetPreIntegratedMembers = (
  projectName: string,
  apiKey: string
): {
  data: MemberPreIntegrated[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getPreIntegratedMembers', projectName, apiKey],
    queryFn: async () =>
      await ApiService.getPreIntegratedMembers(projectName, apiKey)
  })
  return { data, error, isLoading }
}

export const usePostProjectIntegrationRequest = (): {
  mutate: (args: { provider: string; request: AuthorizationRequest }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      provider,
      request
    }: {
      provider: string
      request: AuthorizationRequest
    }) => {
      return await ApiService.postProjectIntegrationRequest(provider, request)
    }
  })
  return { mutate, error, isPending, isSuccess }
}

export const useGetUserProjects = (): {
  data: User | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getUserProjects'],
    queryFn: ApiService.getUserProjects
  })
  return { data, error, isLoading }
}

export const useGetIssuesFilteredAndPaginated = (
  isProjectManager: boolean,
  userId: string,
  projectId: string,
  filters: OptionalIssueFilters
): {
  data: IssueView[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: [
      'getIssuesFilteredAndPaginated',
      isProjectManager,
      userId,
      projectId,
      filters
    ],

    queryFn: async () =>
      await ApiService.getIssuesFilteredAndPaginated(
        isProjectManager,
        userId,
        projectId,
        filters
      ),
    retry: false
  })
  return { data, error, isLoading }
}

export const useGetIssueById = (
  issueId: string
): {
  data: IssueDetail | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getIssueById', issueId],
    queryFn: async () => await ApiService.getIssueById(issueId)
  })
  return { data, error, isLoading }
}

export const usePostModifyTime = (): {
  mutate: (args: {
    ticketId: string
    data: ModifyTimeData
    variant: 'add' | 'remove'
  }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      ticketId,
      data,
      variant
    }: {
      ticketId: string
      data: ModifyTimeData
      variant: 'add' | 'remove'
    }) => {
      return await ApiService.postModifyTime(ticketId, data, variant)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const usePostTimerAction = (): {
  mutate: (args: {
    ticketId: string
    date: Date
    action: 'resume' | 'pause'
  }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      ticketId,
      date,
      action
    }: {
      ticketId: string
      date: Date
      action: 'resume' | 'pause'
    }) => {
      return await ApiService.postTimerAction(ticketId, date, action)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const usePostBlock = (): {
  mutate: (args: {
    ticketId: string
    reason: string
    comment: string | null
  }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      ticketId,
      reason,
      comment
    }: {
      ticketId: string
      reason: string
      comment: string | null
    }) => {
      return await ApiService.postBlock(ticketId, reason, comment)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const usePostUnblock = (): {
  mutate: (args: { ticketId: string }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ ticketId }: { ticketId: string }) => {
      return await ApiService.postUnblock(ticketId)
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useGetTicketElapsedTime = (
  issueId: string
): {
  data: { workedTime: number } | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getTicketElapsedTime', issueId],
    queryFn: async () => await ApiService.getTicketElapsedTime(issueId)
  })
  return { data, error, isLoading }
}

export const useGetFilters = (
  projectId: string,
  userRole: 'pm' | 'dev'
): {
  data: DevProjectFiltersDTO | PMProjectFiltersDTO | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getFilters', projectId, userRole],
    queryFn: async () => await ApiService.getFilters(projectId, userRole)
  })
  return { data, error, isLoading }
}

export const useGetChronology = (
  issueId: string
): {
  data: IssueChronologyEvent[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getChronology', issueId],
    queryFn: async () => await ApiService.getChronology(issueId)
  })
  return { data, error, isLoading }
}

export const useRefreshProject = (): {
  mutate: (args: { projectId: string; apiToken: string }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
  data: Date | null | undefined
} => {
  const { mutate, error, isPending, isSuccess, data } = useMutation({
    mutationFn: async ({
      projectId,
      apiToken
    }: {
      projectId: string
      apiToken: string
    }) => {
      return await ApiService.postRefreshProject(projectId, apiToken)
    }
  })

  return { mutate, error, isPending, isSuccess, data }
}

export const useDeleteProject = (): {
  mutate: (args: { projectId: string }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      await ApiService.deleteProject(projectId)
    }
  })

  return { mutate, error, isPending, isSuccess }
}

export const useRemoveTeamMember = (): {
  mutate: (args: { projectId: string; userId: string }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      projectId,
      userId
    }: {
      projectId: string
      userId: string
    }) => {
      await ApiService.deleteTeamMember(projectId, userId)
    }
  })

  return { mutate, error, isPending, isSuccess }
}

export const useGetProject = (
  projectId: string
): {
  data: ProjectView | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getProject', projectId],
    queryFn: async () => await ApiService.getProject(projectId)
  })
  return { data, error, isLoading }
}
