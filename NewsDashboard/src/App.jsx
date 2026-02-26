import './App.css'
import Login from './components/Authentication/login.jsx'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'

function App() {

  return (
    <>
    <Routes >
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
