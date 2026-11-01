import { useEffect, useState } from 'react'

const useDebounceFn = (value: string, timer = 500) => {
  const [debounced, setDebounced] = useState<string>()

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), timer)
    return () => clearTimeout(timerId)
  }, [value, timer])

  return debounced
}

export default useDebounceFn
