import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between  border-2 px-20 py-4 items-center'>
      <Link to='/'>LOGO</Link>
      <div className='flex gap-5'>
       <Link to={"/login"}>Login</Link>
       <Link to={"/register"}>Signup</Link>
      </div>
    </nav>
  )
}

export default Navbar