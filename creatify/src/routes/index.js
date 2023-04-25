import React from 'react'
import Home from '../modules/Home'
import Form from '../modules/Authorization'
import {Navigate,Route,Routes as Router} from 'react-router-dom'
const PrivateRoute=({children})=>{
    const isUserLoggedIn= window.localStorage.getItem('user:token') || false
    const isFormPages = window.location.pathname.includes('account')
    if(isUserLoggedIn && !isFormPages)
    {
        return children
    }
    else if(!isUserLoggedIn && isFormPages)
    {
        return children
    }
    else
    {
        const redirectUrl =isUserLoggedIn?'/':'/account/signin'
        return <Navigate to={redirectUrl} replace/>
    }
}
const Routes = () => {
    const routes=[
        {
            id:1,
            name:'home',
            path:'/',
            component:<Home/>

        },
        {
            id:2,
            name:'sign in',
            path:'/account/signin',
            component:<Form/>

        },
        {
            id:3,
            name:'sign up',
            path:'/account/signup',
            component:<Form/>

        }
    ]
  return (
    <Router>
        {
           routes.map(({id,name,path,component})=>{
            return  <Route key={id} path={path} element={<PrivateRoute>{component}</PrivateRoute>}/>
           })
        }
        
    </Router>
  )
}

export default Routes
