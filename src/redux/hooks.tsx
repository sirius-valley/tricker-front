import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { type AppDispatch, type RootState } from './store'
import {
  type User,
  type Step,
  type IssueView,
  type MyProjectsOption
} from '@utils/types'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useSteps = (): Step[] =>
  useAppSelector((state) => state.user.steps)
export const useProjectName = (): string =>
  useAppSelector((state) => state.user.projectName)
export const useCurrentTicket = (): IssueView =>
  useAppSelector((state) => state.user.currentTicket)
export const useCurrentProjectId = (): string =>
  useAppSelector((state) => state.user.currentProjectId)
export const useUserRole = (): string =>
  useAppSelector((state) => state.user.userRole)
export const useReceivedProjectId = (): string =>
  useAppSelector((state) => state.user.receivedProjectId)
export const useUser = (): User => useAppSelector((state) => state.user.user)
export const useApiKey = (): { provider: string; value: string } =>
  useAppSelector((state) => state.user.apiKey)
export const useSelectedProjectInfo = (): MyProjectsOption =>
  useAppSelector((state) => state.user.selectedProjectInfo)
