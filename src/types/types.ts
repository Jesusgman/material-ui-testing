export type Todos = {
  userId: string
  id: number
  title: string
  completed: boolean
}

export type User = {
  id: number
  name: string
  username: string
  email: string
}

export type Album = {
  uesrId: number
  id: number
  title: string
}

export type Picture = {
  albumId: number
  id: number
  url: 'string'
  thumbnailUrl: string
}

export interface NetworkInterface {
  status: 'idle' | 'failed' | 'succeeded' | 'loading'
  error?: string | null
}

export interface UserState extends NetworkInterface {
  LoggedInUser: User | null
}

export interface TodosState extends NetworkInterface {
  selectedTodo: Todos | null
}

export interface AlbumState extends NetworkInterface {
  selectedAlbum: Album | null
}
