import { createSlice } from '@reduxjs/toolkit'

interface InitalStateType {
  id: string
  //add more properties as needed
}

const initialState: InitalStateType = {
  id: ''
  //set initial states for each property
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // future reducers
  }
})

export default userSlice.reducer
