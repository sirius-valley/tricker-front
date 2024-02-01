import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Checkbox from './components/Checkbox/Checkbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Checkbox></Checkbox>
    </>
  )
}

export default App
