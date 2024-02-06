import { createSlice } from '@reduxjs/toolkit'

interface InitalStateType {
  id: string;
}

const initialState: InitalStateType = {
  id: "",
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // updateProfilePicture: (state, action) => {
    //     state.profilePicture = action.payload;
    // },
  }
})


export default userSlice.reducer
