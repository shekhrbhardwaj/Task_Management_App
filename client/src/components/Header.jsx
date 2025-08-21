import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token')||"")
  const navigation  =  useNavigate();
  const logoutUser =  () => {
    localStorage.removeItem('token');
    navigation("/login");
  }
    useEffect(() => {
    setUserToken(localStorage.getItem('token') || "");
  }, []);
  return (
    <div className='text-center bg-amber-200 p-4 text-amber-700 font-bold uppercase'>
      <nav className='flex gap-4 justify-end'>
        {userToken === "" ? (
          <>
        <Link to="/login" className='text-blue-800'>Login</Link>
        <Link to="/register" className='text-blue-800'>Register</Link>
        </>
        ) : (
        <Link onClick={logoutUser}  className='text-blue-800'>Logout</Link>
        )}
        </nav>
    </div>
  )
}

export default Header
