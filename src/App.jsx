import { useEffect, useState } from 'react'
import HomePage from './HomePage'
import Trang2 from './trang2'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path === '/trang2') {
    return <Trang2 />
  }

  return <HomePage />
}

export default App
