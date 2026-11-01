import Masonry from '@mui/lab/Masonry'
import Item from '../common/Item'
import { CircularProgress } from '@mui/material'

type LoaderMassonryProps = {
  evenHeightEle: number
  oddHeightEle: number
  numEntries: number
}

const LoaderMassonry = (props: LoaderMassonryProps) => {
  const { evenHeightEle, oddHeightEle, numEntries } = props

  return (
    <Masonry columns={4} spacing={3}>
      {Array.from({ length: numEntries }).map((_, i) => {
        return (
          <Item
            key={i}
            sx={{
              height: i % 2 === 0 ? evenHeightEle : oddHeightEle,
              alignContent: 'center',
            }}
          >
            <CircularProgress aria-label="loading" />
          </Item>
        )
      })}
    </Masonry>
  )
}

export default LoaderMassonry
