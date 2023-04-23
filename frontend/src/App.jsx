import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Planning from './pages/Planning';

function App() {
  return (
    <div className='bg-backgroundc-100 dark:bg-backgroundc-300 min-h-screen min-w-full'>
      <div className='px-10 md:px-20 lg:px-40'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/planning' element={<Planning/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
