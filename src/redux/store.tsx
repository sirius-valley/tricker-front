import { configureStore } from '@reduxjs/toolkit'
import user from './user'
import selectedProject from './selectedProject.slice'

export const store = configureStore({
  reducer: { user, selectedProject }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
