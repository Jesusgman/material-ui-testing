import {
  createAsyncThunk,
  createEntityAdapter,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'
import { type Album, type AlbumState } from '../types/types'
import { RootState } from './store'

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (userId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    )
    return (await res.json()) as ReadonlyArray<Album>
  }
)

const albumsAdapter = createEntityAdapter<Album>()

const initialState = albumsAdapter.getInitialState<AlbumState>({
  status: 'idle',
  error: null,
  selectedAlbum: null,
})

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    addAlbum: albumsAdapter.addOne,
    deleteAlbum: albumsAdapter.removeOne,
    selectAlbum: (state, action: PayloadAction<number | null>) => {
      if (action.payload) {
        state.selectedAlbum = state.entities[action.payload]
      } else {
        state.selectedAlbum = null
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        albumsAdapter.setAll(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default albumsSlice.reducer
export const { addAlbum, selectAlbum, deleteAlbum } = albumsSlice.actions
export const { selectById: selectAnAlbum, selectAll: selectAllAlbums } =
  albumsAdapter.getSelectors((state: RootState) => state.albums)
export const selectedAlbum = (state: RootState) => state.albums.selectedAlbum
