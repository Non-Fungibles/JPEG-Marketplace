import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <div id='navbar'>
      <div id='logo'>
        <Link to='/'>Logo</Link>
      </div>
      <div id='navigation'>
        <span><Link to='/'>Home</Link></span>
        <span>Marketplace</span>
        <span><Link to='/create'>Create</Link></span>
      </div>
      <div id='login-logout'>
        <Link to='/login'>
          <button className='nav-btn'>SIGN IN</button>
        </Link>
        <Link to='/register'>
          <button className='nav-btn'>REGISTER</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar