import { useEffect } from 'react'
import { type Album } from '../types/types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { Transition } from './Todos'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchPictures, selectAllPictures } from '../store/pictureSlice'
import LoaderMassonry from '../common/LoaderMassonry'
import Masonry from '@mui/lab/Masonry'

type PicturesProps = {
  album: Album
  onClose: () => void
}

const Pictures = (props: PicturesProps) => {
  const { album, onClose } = props
  const dispatch = useAppDispatch()

  const pictures = useAppSelector(selectAllPictures)
  const status = useAppSelector((state) => state.pictures.status)

  useEffect(() => {
    if (album) {
      setTimeout(() => {
        dispatch(fetchPictures(album.id))
      }, 500)
    }
  }, [dispatch, album])

  return (
    <Dialog
      open={!!album}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onClose}
      aria-describedby="todo-details"
      role="alertdialog"
      sx={{ maxHeight: 800 }}
    >
      <DialogTitle>{album.title}</DialogTitle>
      <DialogContent>
        {status === 'idle' || status === 'loading' ? (
          <LoaderMassonry
            numEntries={24}
            evenHeightEle={256}
            oddHeightEle={150}
          />
        ) : (
          <Masonry columns={4} spacing={3}>
            {pictures &&
              pictures.map((picture) => {
                return (
                  <div key={`album-${album.id}-${picture.id}`}>
                    <img
                      src={`${picture.thumbnailUrl}`}
                      alt={`picture-${picture.id}`}
                      loading={'lazy'}
                      style={{ display: 'block', width: '100%' }}
                    />
                  </div>
                )
              })}
          </Masonry>
        )}
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Pictures
