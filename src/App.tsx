import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input/Input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Input label='hola' placeholder='this is a long text' required ></Input>
    </>
  )
}

export default App
