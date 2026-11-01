import { Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Menu, Logout } from '@mui/icons-material'
import Sidebar from './common/Sidebar'
import { useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { selectedUser, userSelected } from './store/userSlice'

const Home = lazy(() => import('./Pages/Home'))
const Todos = lazy(() => import('./Pages/Todos'))
const Albums = lazy(() => import('./Pages/Album'))
const Login = lazy(() => import('./Pages/Login'))

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const user = useAppSelector(selectedUser)
  const dispatch = useAppDispatch()
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setIsSideBarOpen(true)
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Jesus LX.inc
            </Typography>
            {user ? (
              <Fragment>
                <p>{user.name}</p>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="logout"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    dispatch(userSelected(null))
                  }}
                >
                  <Logout />
                </IconButton>
              </Fragment>
            ) : (
              <Link to="login">Login</Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Sidebar setIsOpen={setIsSideBarOpen} isOpen={isSideBarOpen} />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
