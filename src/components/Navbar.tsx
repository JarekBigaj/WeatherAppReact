import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = styled(({className}) => {
  return (
    <div className={className}>
        <ul>
            <li><Link to={'/login'}>SignIn</Link></li>
            <li><Link to={'/signup'}>SignUp</Link></li>
        </ul>
    </div>
  )
})`
  position:absolute;
  top:0;
  left:10em;
`

export default Navbar