import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { type AppDispatch, type RootState } from './store'
import { type User, type Step } from '@utils/types'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useSteps = (): Step[] =>
  useAppSelector((state) => state.user.steps)
export const useProjectName = (): string =>
  useAppSelector((state) => state.user.projectName)
export const useCurrentProjectId = (): string =>
  useAppSelector((state) => state.user.currentProjectId)
export const useUser = (): User => useAppSelector((state) => state.user.user)
export const useLoginCode = (): string =>
  useAppSelector((state) => state.user.loginCode)
