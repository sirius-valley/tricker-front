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
  IssueChronologyEventDTO,
  DevProjectFiltersDTO,
  PMProjectFiltersDTO,
  PendingProjectInfoDTO,
  MyProjectsOption,
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
  provider: string,
  enabled?: boolean
): {
  data: ProjectPreIntegrated[] | null | undefined
  refetch: () => void
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
} => {
  const { data, refetch, error, isLoading, isSuccess } = useQuery({
    queryKey: ['getPreIntegratedProjects', key, provider],
    queryFn: async () =>
      await ApiService.getPreIntegratedProjects(key, provider),
    retry: false,
    enabled
  })
  return { data, refetch, error, isLoading, isSuccess }
}

export const useGetPreIntegratedMembers = (
  projectName: string,
  apiKey: string,
  enabled?: boolean
): {
  data: MemberPreIntegrated[] | null | undefined
  refetch: () => void
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
} => {
  const { data, refetch, error, isLoading, isSuccess } = useQuery({
    queryKey: ['getPreIntegratedMembers', projectName, apiKey],
    queryFn: async () =>
      await ApiService.getPreIntegratedMembers(projectName, apiKey),
    enabled
  })
  return { data, refetch, error, isLoading, isSuccess }
}

export const usePostProjectIntegrationRequest = (): {
  mutate: (args: { provider: string; request: AuthorizationRequest }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
  data: boolean | null | undefined
} => {
  const { mutate, error, isPending, isSuccess, data } = useMutation({
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
  return { mutate, error, isPending, isSuccess, data }
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
  filters: OptionalIssueFilters,
  enabled?: boolean
): {
  data: IssueView[] | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      'getIssuesFilteredAndPaginated',
      isProjectManager,
      userId,
      projectId,
      filters
    ],
    enabled,
    queryFn: async () =>
      await ApiService.getIssuesFilteredAndPaginated(
        isProjectManager,
        userId,
        projectId,
        filters
      ),
    retry: false
  })
  return { data, error, isLoading, refetch }
}

export const useGetIssueById = (
  issueId: string,
  enabled?: boolean
): {
  data: IssueDetail | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getIssueById', issueId],
    queryFn: async () => await ApiService.getIssueById(issueId),
    enabled,
    retry: false
  })
  return { data, error, isLoading, refetch }
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
  issueId: string,
  enabled?: boolean
): {
  data: { workedTime: number } | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getTicketElapsedTime', issueId],
    queryFn: async () => await ApiService.getTicketElapsedTime(issueId),
    enabled
  })
  return { data, error, isLoading, refetch }
}

export const useGetFilters = (
  projectId: string,
  userRole: 'pm' | 'dev',
  enabled: boolean
): {
  data: DevProjectFiltersDTO | PMProjectFiltersDTO | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getFilters', projectId, userRole],
    queryFn: async () => await ApiService.getFilters(projectId, userRole),
    enabled
  })
  return { data, refetch, error, isLoading }
}

export const useGetChronology = (
  issueId: string
): {
  data: IssueChronologyEventDTO[] | null | undefined
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
  reset: () => void
} => {
  const { mutate, error, isPending, isSuccess, reset } = useMutation({
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

  return { mutate, error, isPending, isSuccess, reset }
}

export const usePostModifyMemberRole = (): {
  mutate: (args: { projectId: string; userId: string; roleId: string }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
  reset: () => void
} => {
  const { mutate, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: async ({
      projectId,
      userId,
      roleId
    }: {
      projectId: string
      userId: string
      roleId: string
    }) => {
      await ApiService.postModifyMemberRole(projectId, userId, roleId)
    }
  })

  return { mutate, error, isPending, isSuccess, reset }
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

export const useGetMyProjects = (
  projectName: string
): {
  data: MyProjectsOption[] | undefined | null
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getMyProjects', projectName],
    queryFn: async () => await ApiService.getMyProjects(projectName)
  })
  return { data, error, isLoading }
}

export const useGetEmailInformation = (
  projectId: string,
  token: string
): {
  data: PendingProjectInfoDTO | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getEmailInformation', projectId, token],
    queryFn: async () => await ApiService.getEmailInformation(projectId, token),
    retry: false
  })
  return { data, error, isLoading }
}

export const useAcceptOrDeclineEmail = (
  projectId: string,
  token: string,
  decline: boolean
): {
  data: PendingProjectInfoDTO | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['acceptOrDeclineEmail', projectId, token, decline],
    queryFn: async () =>
      await ApiService.acceptOrDeclineEmail(projectId, token, decline),
    retry: false
  })
  return { data, error, isLoading }
}
