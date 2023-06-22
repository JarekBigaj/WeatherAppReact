import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <ul>
            <li><Link to={'/login'}>SignIn</Link></li>
            <li><Link to={'/signup'}>SignUp</Link></li>
        </ul>
    </div>
  )
}

export default Navbar