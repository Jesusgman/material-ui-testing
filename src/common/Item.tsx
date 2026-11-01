import { Paper, styled } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#c6c6c6',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

export default Item
