import { ChangeEvent, useState, useEffect, Fragment, forwardRef } from 'react'
import {
  Container,
  Box,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectedUser } from '../store/userSlice'
import { Link } from 'react-router-dom'
import Item from '../common/Item'
import { type Todos as TodoType } from '../types/types'
import {
  selectedTodo,
  selectAllTodos,
  fetchUserTodos,
  selectTodo,
} from '../store/todosSlice'
import { TransitionProps } from '@mui/material/transitions'

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Todos = () => {
  const user = useAppSelector(selectedUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchUserTodos(user?.id))
    }
  }, [user, dispatch])

  const currentTodo = useAppSelector(selectedTodo)
  const todos = useAppSelector(selectAllTodos)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [queryTodos, setQueryTodos] = useState<ReadonlyArray<TodoType> | null>(
    null
  )

  /*   
Debounce with hook
const debouncedQuery = useDebounceFn(searchTerm, 1000)

  useEffect(() => {
    if (debouncedQuery) {
      setQueryTodos(
        debouncedQuery && todos
          ? todos?.filter((todo) => todo.title.includes(debouncedQuery))
          : []
      )
    }
  }, [debouncedQuery, searchTerm, todos]) */

  //debounce native
  useEffect(() => {
    const timerId = setTimeout(() => {
      setQueryTodos(
        searchTerm && todos
          ? todos?.filter((todo) => todo.title.includes(searchTerm))
          : []
      )
    }, 500)
    return () => clearTimeout(timerId)
  }, [searchTerm, todos])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setQueryTodos(null)
    }
    setSearchTerm(event.target.value)
  }

  const handleSelectedTodo = (todoId: number) => {
    dispatch(selectTodo(todoId))
  }

  const handleClearSelection = () => {
    dispatch(selectTodo(null))
  }

  return (
    <Container>
      <Box sx={{ marginTop: '2em', display: 'flex', flexDirection: 'column' }}>
        {user && todos && todos.length > 0 ? (
          <Fragment>
            <TextField
              type="search"
              placeholder="Please search for a todo"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {queryTodos && queryTodos.length > 0 && (
              <Stack spacing={2}>
                {queryTodos.map((todo) => {
                  return (
                    <Item
                      key={todo.id}
                      onClick={() => {
                        handleSelectedTodo(todo.id)
                      }}
                    >
                      {todo.title}
                    </Item>
                  )
                })}
              </Stack>
            )}
          </Fragment>
        ) : (
          <p>
            Please{' '}
            <Link to="../login" relative="path">
              login
            </Link>{' '}
            first in order to retrieve your todo list
          </p>
        )}
        {currentTodo && (
          <Dialog
            open={!!currentTodo}
            slots={{ transition: Transition }}
            keepMounted
            onClose={handleClearSelection}
            aria-describedby="todo-details"
            role="alertdialog"
          >
            <DialogTitle>{currentTodo.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="todo-details-description">
                <h3>Owner: {user?.username}</h3>
                <p>
                  <b>Description: </b> {currentTodo.title}
                </p>
                <p>
                  <b>Completed: </b> {currentTodo.completed ? 'Yes' : 'No'}{' '}
                </p>
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleClearSelection} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Container>
  )
}

export default Todos
