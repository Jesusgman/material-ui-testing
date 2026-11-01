import { useEffect, useState } from 'react'
import { type Todos } from '../types/types'

const useGetTodosForUser = (userId: number | undefined) => {
  const [todos, setTodos] = useState<ReadonlyArray<Todos> | null>(null)
  useEffect(() => {
    const fetchUserTodos = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      )
      setTodos((await res.json()) as ReadonlyArray<Todos>)
    }
    fetchUserTodos()
  }, [userId])
  return todos
}

export default useGetTodosForUser
