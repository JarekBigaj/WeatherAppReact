import React, { useContext } from 'react'
import { AccountContext } from './Account'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const context = useContext(AccountContext);
    const location = useLocation();
  return (
    context?.auth
        ? <Outlet/>
        : <Navigate to={'/login'} state={{from:location}} replace/>
  )
}

export default RequireAuth