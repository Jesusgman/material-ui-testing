import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { NetworkInterface, type Picture } from '../types/types'
import { type RootState } from './store'

const picturesAdapter = createEntityAdapter<Picture>()

export const fetchPictures = createAsyncThunk(
  'pictures/fetchPictures',
  async (albumId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    )
    return (await res.json()) as ReadonlyArray<Picture>
  }
)

const initialState = picturesAdapter.getInitialState<NetworkInterface>({
  status: 'idle',
  error: null,
})

const picturesSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    addPicture: picturesAdapter.addOne,
    deletePicture: picturesAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPictures.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.status = 'succeeded'
        picturesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchPictures.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default picturesSlice.reducer
export const { addPicture, deletePicture } = picturesSlice.actions
export const { selectAll: selectAllPictures } = picturesAdapter.getSelectors(
  (state: RootState) => state.pictures
)
