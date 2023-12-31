import React from 'react'
import { Navigate } from 'react-router-dom'



const PrivateRoute = ({children}) => {
    const isAuth = localStorage.getItem('eathRealToken');

if(isAuth==="" || isAuth==="undefined" || isAuth===null || isAuth==='null'){
    return <Navigate to="/user/login"/>
}
  return children
}

export default PrivateRoute

