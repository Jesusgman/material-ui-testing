import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectAllAlbums,
  selectAlbum,
  fetchAlbums,
  selectedAlbum,
} from '../store/albumsSlice'
import { selectedUser } from '../store/userSlice'
import { Box } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import Item from '../common/Item'
import { Link } from 'react-router-dom'
import Pictures from './Pictures'
import LoaderMassonry from '../common/LoaderMassonry'

const Album = () => {
  const dispatch = useAppDispatch()
  const albums = useAppSelector(selectAllAlbums)
  const state = useAppSelector((state) => state.albums.status)
  const user = useAppSelector(selectedUser)
  const albumSelection = useAppSelector(selectedAlbum)

  useEffect(() => {
    if (user) {
      setTimeout(() => dispatch(fetchAlbums(user.id)), 300)
    }
  }, [user, dispatch])

  const handleSelectAlbum = (albumId: number) => {
    dispatch(selectAlbum(albumId))
  }

  const handleCloseAlbum = () => {
    dispatch(selectAlbum(null))
  }

  if (state === 'idle' || state === 'loading' || !user) {
    return (
      <Box
        sx={{
          marginLeft: '1em',
          paddingTop: '2em',
          height: 800,
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <LoaderMassonry
          numEntries={24}
          evenHeightEle={256}
          oddHeightEle={150}
        />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        marginLeft: '1em',
        paddingTop: '2em',
        height: 800,
        display: 'flex',
        alignContent: 'center',
      }}
    >
      {albums ? (
        <Masonry columns={4} spacing={3}>
          {albums.map((album, idx) => {
            return (
              <Item
                key={album.id}
                sx={{
                  height: idx % 2 === 0 ? 256 : 150,
                  justifyContent: 'center',
                }}
                onClick={() => {
                  handleSelectAlbum(album.id)
                }}
              >
                {album.title}
              </Item>
            )
          })}
        </Masonry>
      ) : (
        <p>
          Please{' '}
          <Link to="../login" relative="path">
            login
          </Link>{' '}
          first in order to retrieve your todo list
        </p>
      )}
      {albumSelection && (
        <Pictures album={albumSelection} onClose={handleCloseAlbum} />
      )}
    </Box>
  )
}

export default Album
