import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { type Todos, type TodosState } from '../types/types'
import { type RootState } from './store'

const todosAdapter = createEntityAdapter<Todos>()

export const fetchUserTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (userId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
    )
    return (await res.json()) as ReadonlyArray<Todos>
  }
)

const initialState = todosAdapter.getInitialState<TodosState>({
  status: 'idle',
  error: null,
  selectedTodo: null,
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: todosAdapter.addOne,
    deleteTodo: todosAdapter.removeOne,
    selectTodo: (state, action: PayloadAction<number | null>) => {
      if (action.payload) {
        state.selectedTodo = state.entities[action.payload]
      } else {
        state.selectedTodo = null
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        todosAdapter.setAll(state, action.payload)
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { createTodo, selectTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer

export const { selectById: selectATodo, selectAll: selectAllTodos } =
  todosAdapter.getSelectors((state: RootState) => state.todos)

export const selectedTodo = (state: RootState) => state.todos.selectedTodo
