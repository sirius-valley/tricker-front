import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Step, type User } from '@utils/types'

interface InitialStateType {
  user: User
  currentStep: number
  steps: Step[]
}

const initialState: InitialStateType = {
  user: {
    id: '',
    username: '',
    profileImage: '',
    createdAt: new Date(),
    projectsRoleAssigned: [],
    emittedUserProjectRole: [],
    emittedBlockerStatusModif: [],
    authoredIssues: [],
    asignedIssues: [],
    emittedIssueChangeLogs: [],
    emittedManualTimeModif: []
  },
  currentStep: 0,
  steps: [
    { label: 'Initial Setup' },
    { label: 'Project Selection' },
    { label: 'Team Members' }
  ]
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
