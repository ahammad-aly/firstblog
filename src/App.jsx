import { useState, useEffect } from 'react'
import './App.css'
import services from './appwrite/Aouth'
import {LogIn, logout} from './redux/authSlice'
import {useDispatch} from 'react-redux'
import {Header, Footer} from './componet/index'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  
  useEffect(()=>{
      services.getCurrent()
      .then((userData) => {
        if (userData) {
          dispatch(LogIn({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  
  },[])

  if(error){
    return <div>{error.message}</div>
  }
  if(loading){
    return <div>Loading...</div>
  }

  return(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      TODO:  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  )

}

export default App
