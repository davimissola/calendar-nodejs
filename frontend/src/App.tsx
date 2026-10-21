import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { CriarConta } from './pages/CriarConta'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/criar-conta' element={<CriarConta />} />
    </Routes>
  )
}

export default App
