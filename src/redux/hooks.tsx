import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { type AppDispatch, type RootState } from './store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
