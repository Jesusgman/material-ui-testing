import { Fragment } from 'react'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'
import { Home, PhotoAlbum, CheckBox } from '@mui/icons-material'
import { Link } from 'react-router-dom'

type ItemListProps = {
  Icon: React.ReactElement
  text: string
  path: string
}

type SideBarProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ItemList = (props: ItemListProps): React.ReactElement => {
  const { Icon, text, path } = props
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link to={path}>
          <ListItemIcon> {Icon}</ListItemIcon>
          {text}
        </Link>
      </ListItemButton>
    </ListItem>
  )
}

const SideBar = (props: SideBarProps) => {
  const { isOpen, setIsOpen } = props

  return (
    <Fragment>
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <Box
          sx={{ width: 200 }}
          role="presentation"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <List>
            <ItemList text="Home" path="Home" Icon={<Home />} />
            <ItemList text="Albums" path="Albums" Icon={<PhotoAlbum />} />
            <ItemList text="Todos" path="Todos" Icon={<CheckBox />} />
          </List>
        </Box>
      </Drawer>
    </Fragment>
  )
}

export default SideBar
