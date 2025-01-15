import React from 'react'
import services from '../appwrite/Aouth'
import {useDispatch} from 'react-redux'
import {logout} from '../redux/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
    async function logoutHandler(){
      services.logOut().then(()=>{
        dispatch(logout())
      })
    }
  return (
<button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn