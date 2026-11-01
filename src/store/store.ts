import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice'
import todosReducer from './todosSlice'
import albumsReducer from './albumsSlice'
import pictureReducer from './pictureSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todosReducer,
    albums: albumsReducer,
    pictures: pictureReducer,
  },
})

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
