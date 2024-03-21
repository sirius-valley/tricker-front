import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Step, type User, type IssueView } from '@utils/types'
import mockedUser from './mockedUser'

interface InitialStateType {
  user: User
  currentProjectId: string
  currentStep: number
  steps: Step[]
  projectName: string
  selectedTicket?: IssueView
  loginCode: string
}

export const initialState: InitialStateType = {
  // user: {
  //   id: '',
  //   cognitoId: '',
  //   profileImage: '',
  //   email: '',
  //   name: '',
  //   createdAt: new Date().toString(),
  //   projectsRoleAssigned: [],
  //   emittedUserProjectRole: [],
  //   // emittedBlockerStatusModification: [],
  //   authoredIssues: [],
  //   asignedIssues: [],
  //   emittedIssueChangeLogs: [],
  //   emittedManualTimeModification: []
  //   // OrganizationAdministrator: []
  // },
  user: mockedUser,
  currentProjectId: '',
  currentStep: 0,
  steps: [
    { label: 'Initial Setup' },
    { label: 'Project Selection' },
    { label: 'Team Members' }
  ],
  projectName: '',
  loginCode: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setCurrentProjectId: (state, action: PayloadAction<string>) => {
      state.currentProjectId = action.payload
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload
    },
    setSelectedTicket: (state, action: PayloadAction<IssueView>) => {
      state.selectedTicket = action.payload
    },
    setLoginCode: (state, action: PayloadAction<string>) => {
      state.loginCode = action.payload
    }
  }
})

export const {
  setUser,
  setCurrentProjectId,
  setCurrentStep,
  setProjectName,
  setLoginCode
} = userSlice.actions
export default userSlice.reducer
