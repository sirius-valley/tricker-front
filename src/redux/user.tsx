import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  type Step,
  type User,
  type IssueView,
  StageType,
  Priority,
  type MyProjectsOption
} from '@utils/types'

interface InitialStateType {
  user: User
  userRole: string
  currentTicket: IssueView
  currentTrackingTicket: IssueView
  currentProjectId: string
  currentStep: number
  steps: Step[]
  projectName: string
  selectedProjectInfo: MyProjectsOption
  apiKey: {
    provider: string
    value: string
  }
  hasToRefetch: boolean
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
    authoredIssues: [],
    asignedIssues: [],
    emittedIssueChangeLogs: [],
    emittedManualTimeModification: []
  },
  userRole: '',
  currentTrackingTicket: {
    id: '',
    assignee: null,
    stage: {
      id: '',
      name: '',
      type: StageType.BACKLOG,
      position: 0,
      color: ''
    },
    name: '',
    title: '',
    priority: Priority.NO_PRIORITY,
    storyPoints: 0,
    isBlocked: false,
    isTracking: false
  },
  currentTicket: {
    id: '',
    assignee: null,
    stage: {
      id: '',
      name: '',
      type: StageType.BACKLOG,
      position: 0,
      color: ''
    },
    name: '',
    title: '',
    priority: Priority.NO_PRIORITY,
    storyPoints: 0,
    isBlocked: false,
    isTracking: false
  },
  currentProjectId: '',
  currentStep: 0,
  steps: [
    { label: 'Initial Setup' },
    { label: 'Project Selection' },
    { label: 'Team Members' }
  ],
  projectName: '',
  selectedProjectInfo: {
    id: '',
    name: '',
    image: ''
  },
  apiKey: {
    provider: '',
    value: ''
  },
  hasToRefetch: false
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
    setCurrentTrackingTicket: (state, action: PayloadAction<IssueView>) => {
      state.currentTrackingTicket = action.payload
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
    setSelectedProjectInfo: (
      state,
      action: PayloadAction<MyProjectsOption>
    ) => {
      state.selectedProjectInfo = action.payload
    },
    setApiKey: (
      state,
      action: PayloadAction<{ provider: string; value: string }>
    ) => {
      state.apiKey = action.payload
    },
    setHasToRefetch: (state, action: PayloadAction<boolean>) => {
      state.hasToRefetch = action.payload
    }
  }
})

export const {
  setUser,
  setUserRole,
  setCurrentTrackingTicket,
  setCurrentTicket,
  setCurrentProjectId,
  setCurrentStep,
  setProjectName,
  setSelectedProjectInfo,
  setApiKey,
  setHasToRefetch
} = userSlice.actions
export default userSlice.reducer
