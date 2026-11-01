import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit'
import { type RootState } from './store'
import { type User } from '../types/types'

type UserState = {
  status: 'idle' | 'failed' | 'succeeded' | 'loading'
  error?: string | null
  LoggedInUser: User | null
}

const userAdapter = createEntityAdapter<User>()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return (await res.json()) as User[]
})

// getInitialState adds `ids` and `entities`; the generic only describes the extra fields
const initialState = userAdapter.getInitialState<UserState>({
  status: 'idle',
  error: null,
  LoggedInUser: null,
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded: userAdapter.addOne,
    userUpdated: userAdapter.updateOne,
    userDeleted: userAdapter.removeOne,
    userSelected: (state, action: PayloadAction<number | null>) => {
      if (action.payload) {
        state.LoggedInUser = state.entities[action.payload]
      } else {
        state.LoggedInUser = null
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        //action in this case has the data from the user
        state.status = 'succeeded'
        userAdapter.setAll(state, action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        //action in this case has the data from the user
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { userAdded, userUpdated, userDeleted, userSelected } =
  userSlice.actions
export default userSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state: RootState) => state.users)

export const selectedUser = (state: RootState) => state.users.LoggedInUser
