import React, { useState } from 'react'
import Button from '../../myComponent/button'
import Input from '../../myComponent/input'
import { useNavigate } from 'react-router-dom'
const Form = ({
  isSignInPage=false
}) => {

    const navigate =useNavigate()
    const[data ,setData]=useState({
      ...(!isSignInPage && {username:''}),
      email: '',
      password: '',
    })
    console.log(data,'data');
    const handleSubmit= async (e)=>{
      e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/${isSignInPage ? 'login' : 'register' }`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'content-Type':'application/json'
        }
      })
      console.log(response,'res');
      if(response.status === 200 && isSignInPage){
        const{token ,user}=await response.json()
        console.log(token,user,'response');
        localStorage.setItem('user:token',token)
        navigate('/');
      }
   }
  
  return (
    <div className='bg-[#e7f9fe] h-screen w-full flex justify-center items-center '>
        <div className='h-[400px] w-[600px] bg-white flex justify-center items-center shadow-xl'>
          <div className={`border h-full w-full flex flex-col justify-center items-center bg-[#4f7397] ${!isSignInPage && 'order-2'}`}>
                
                <div className='-apple-system '>WELCOME{isSignInPage && ' BACK'}</div>
                <div className='-apple-system '>PlEASE {isSignInPage? 'LOGIN ':'REGISTER '}TO CONTINUE</div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                  {
                    !isSignInPage && 
                    <Input type='text' label='Username' placeholder='Enter your username' value={data.username} onChange={(e)=>setData({...data,username:e.target.value})} name='username'/>
                  }
                  <Input type='email' name='email' placeholder='Enter your email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}  label='Email' />
                  <Input type='password' name='password' placeholder='Enter your password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} label='Password' />
                  <Button label={isSignInPage?'Sign in':'Register'} />
                </form>
              <div className='cursor-pointer' onClick={()=>navigate(`${isSignInPage?'/account/signup':'/account/signin'}`)}>{isSignInPage?"Don't have an account? Sign up":'Have an account? Log in'}</div>
          </div>
          <div className={`border h-full w-full flex justify-center bg-gray-400 ${!isSignInPage && 'order-1'}`}>
          <img src="https://c.tenor.com/y76xw2cQA3kAAAAC/welcome-door-open.gif" alt="welcome" />
          </div>
        </div>
    </div>
  )
}

export default Form
