import { useMutation, useQuery } from '@tanstack/react-query'
import * as ApiService from './service'
import {
  type User,
  type CognitoResponse,
  type ProjectPreIntegrated,
  type MemberPreIntegrated,
  type AuthorizationRequest,
  type Project,
  type IssueView,
  type OptionalIssueFilters
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
    queryFn: ApiService.getOrCreateUser
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
  data: Project[] | null | undefined
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
  userId: string,
  projectId: string,
  filters?: OptionalIssueFilters,
  cursor?: string
): {
  data: IssueView[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: [
      'getIssuesFilteredAndPaginated',
      userId,
      projectId,
      filters,
      cursor
    ],
    queryFn: async () =>
      await ApiService.getIssuesFilteredAndPaginated(
        userId,
        projectId,
        filters,
        cursor
      )
  })
  return { data, error, isLoading }
}
