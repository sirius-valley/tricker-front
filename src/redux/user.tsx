import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  type Step,
  type User,
  type IssueView,
  StageType,
  Priority
} from '@utils/types'

interface InitialStateType {
  user: User
  userRole: string
  currentTicket: IssueView
  currentProjectId: string
  currentStep: number
  steps: Step[]
  projectName: string
  apiKey: {
    provider: string
    value: string
  }
}

export const initialState: InitialStateType = {
  user: {
    id: '',
    cognitoId: '',
    profileImage: '',
    email: '',
    name: '',
    createdAt: new Date().toString(),
    projectsRoleAssigned: [],
    emittedUserProjectRole: [],
    // emittedBlockerStatusModification: [],
    authoredIssues: [],
    asignedIssues: [],
    emittedIssueChangeLogs: [],
    emittedManualTimeModification: []
    // OrganizationAdministrator: []
  },
  userRole: '',
  currentTicket: {
    id: '',
    assignee: null,
    stage: { id: '', name: '', type: StageType.BACKLOG },
    name: '',
    title: '',
    description: '',
    priority: Priority.NO_PRIORITY,
    storyPoints: 0,
    labels: []
  },
  currentProjectId: '',
  currentStep: 0,
  steps: [
    { label: 'Initial Setup' },
    { label: 'Project Selection' },
    { label: 'Team Members' }
  ],
  projectName: '',
  apiKey: {
    provider: '',
    value: ''
  }
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
    setCurrentTicket: (state, action: PayloadAction<IssueView>) => {
      state.currentTicket = action.payload
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
    setApiKey: (
      state,
      action: PayloadAction<{ provider: string; value: string }>
    ) => {
      state.apiKey = action.payload
    }
  }
})

export const {
  setUser,
  setUserRole,
  setCurrentTicket,
  setCurrentProjectId,
  setCurrentStep,
  setProjectName,
  setApiKey
} = userSlice.actions
export default userSlice.reducer
