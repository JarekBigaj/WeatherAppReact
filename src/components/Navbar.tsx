import React, { useContext } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import styled from 'styled-components'
import { AccountContext } from './Account';

const Navbar = styled(({className}) => {
  const context = useContext(AccountContext);
  const auth = context?.auth;
  const logout = () =>{
    context?.handleLogout();
    context?.setAuth('');
  }
  console.log({auth});
  return (
    <div className={className}>
       <Link className="site-title navbar-item" to="/">Weather App</Link>
        <ul  className={`navbar-list`}>
          <CustomLink to={"/"} >Home</CustomLink>
          {!auth?
            <>
              <CustomLink to={"/signup"} >Sign Up</CustomLink>
              <CustomLink to={"/login"} >Sign In</CustomLink>
            </>
            :
            <>
              <CustomLink to={"/login"} onClick={()=>context?.handleLogout()}>Logout</CustomLink>
            </>
          }
          
        </ul>
    </div>
  )
})`
  position: absolute;
  top:0;
  left:0;

  min-width: 100%;
  max-height: 5em;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  padding: 0 1rem;


.site-title{
    font-size: 2.5em;
    padding: .45em;
    text-shadow: 
    0 0 0.125em hsl(0 0% 100% / 0.3),
    0 0 0.45em currentColor;
}

.site-title:hover{
    text-shadow: 
    0 0 0.5em hsl(0 0% 100% / 0.5),
    0 0 0.45em currentColor;
}

.navbar-list{
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 1rem;
}
.navbar-item{
   color: inherit; 
   text-decoration: none;
   min-height: 100%;
   display: flex;
   align-items: center;
   padding: .25rem;
}
.navbar-item-wrapper.active{
    background-color: #555;
}
.navbar-item-wrapper:hover{
    background-color: #777;
}


`;

const CustomLink = ({to,children,...props}:any) =>{
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end:true})
  return (
      <li className={`navbar-item-wrapper ${isActive? "active": ""}`}>
          <Link className="navbar-item" to={to} {...props}>
              {children}
          </Link>
      </li>
  )
}


export default Navbar