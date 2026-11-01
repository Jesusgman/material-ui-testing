import { useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchUsers,
  selectAllUsers,
  selectedUser,
  userSelected,
} from '../store/userSlice'
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

const Login = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.users.status)
  const users = useAppSelector(selectAllUsers)
  const user = useAppSelector(selectedUser)

  const handleChangeUser = (event: SelectChangeEvent<number | ''>) => {
    dispatch(userSelected(Number(event.target.value)))
  }

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <Fragment>
        <CircularProgress aria-label="loading" />
        <p>Please wait while we retrieve your data</p>
      </Fragment>
    )
  }

  return (
    <Container fixed>
      <FormControl sx={{ marginTop: '2em', width: 250 }}>
        <InputLabel id="selector">Who are you?</InputLabel>
        <Select
          labelId="selector"
          id="simpleSelector"
          value={user?.id ?? ''}
          label="User"
          onChange={handleChangeUser}
        >
          {users.map((u) => {
            return (
              <MenuItem key={u.id} value={u.id}>
                {u.email}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Container>
  )
}

export default Login
