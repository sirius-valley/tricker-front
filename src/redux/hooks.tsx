import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { type AppDispatch, type RootState } from './store'
import { type Step } from '@utils/types'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useSteps = (): Step[] =>
  useAppSelector((state) => state.user.steps)
