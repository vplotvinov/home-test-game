import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface AppState {
  currentUser: { [key: string]: any } | null
}

const initialState: AppState = {
  currentUser: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = appSlice.actions

export const selectCurrentUser = (state: RootState) => state.app.currentUser

export default appSlice.reducer
