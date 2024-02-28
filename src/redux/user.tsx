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
    cognitoId: '',
    profileImage: '',
    email: '',
    name: '',
    createdAt: new Date().toString(),
    projectsRoleAssigned: [],
    emittedUserProjectRole: [],
    emittedBlockerStatusModification: [],
    authoredIssues: [],
    asignedIssues: [],
    emittedIssueChangeLogs: [],
    emittedManualTimeModification: [],
    OrganizationAdministrator: []
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
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    }
  }
})

export const { setUser, setCurrentStep } = userSlice.actions
export default userSlice.reducer
