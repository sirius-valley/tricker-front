import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type User } from '@utils/types'

interface InitialStateType {
  user: User
}

const initialState: InitialStateType = {
  user: {
    id: '',
    profileImage: '',
    createdAt: new Date(),
    projectsRoleAssigned: [],
    emittedUserProjectRole: [],
    emittedBlockerStatusModif: [],
    authoredIssues: [],
    asignedIssues: [],
    emittedIssueChangeLogs: [],
    emittedManualTimeModif: []
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export default userSlice.reducer
