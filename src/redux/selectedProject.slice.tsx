import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { id: string; name: string; picture: string } = {
  id: '',
  name: '',
  picture: ''
}

const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    setSelectedProject: (
      state,
      action: PayloadAction<{ id: string; name: string; picture: string }>
    ) => {
      state = action.payload
    }
  }
})

export const { setSelectedProject } = selectedProjectSlice.actions
export default selectedProjectSlice.reducer
