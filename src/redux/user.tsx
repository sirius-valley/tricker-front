import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Step, type User, type IssueView } from '@utils/types'
import mockedUser from './mockedUser'

interface InitialStateType {
  user: User
  userRole: string
  currentTicketId: string
  currentProjectId: string
  currentStep: number
  steps: Step[]
  projectName: string
  selectedTicket?: IssueView
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
  userRole: '',
  currentTicketId: '',
  currentProjectId: '',
  currentStep: 0,
  steps: [
    { label: 'Initial Setup' },
    { label: 'Project Selection' },
    { label: 'Team Members' }
  ],
  projectName: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload
    },
    setCurrentTicketId: (state, action: PayloadAction<string>) => {
      state.currentTicketId = action.payload
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
    }
  }
})

export const {
  setUser,
  setUserRole,
  setCurrentTicketId,
  setCurrentProjectId,
  setCurrentStep,
  setProjectName
} = userSlice.actions
export default userSlice.reducer
