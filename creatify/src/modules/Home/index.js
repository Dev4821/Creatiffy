import React from 'react'
import {ReactComponent as Avatar} from '../../assets/avatar.svg'
import Input from '../../myComponent/input'
import Button from '../../myComponent/button'
import Post from './post'

import {stats} from './data'
const Home = () => {
  return (
    <div className='h-screen bg-[#7f989f] flex overflow-hidden'>
    <div className='w-[20%] bg-white flex flex-col'>
        <div className='h-[30%] flex justify-center items-center border-b'>
            <div className='flex flex-col justify-center items-center'>
           
                <div className='mx-6'> <Avatar width={'100px'} height={'100px'} /></div>
             
              <p className='my-3 '>Divyansh Sharma</p>
             <div className=' flex flex-row justify-around  w-[300px] text-center'>
               { 
               stats.map(({id,name,status})=>{
                return(
                <div key={id}>
                  <h4 className='font-bold'>{status}</h4>
                  <p className='font-light text-sm'>{name}</p>
                </div>)
               })
               }
              

              </div>
        
             
              </div>
            

        </div>

        <div className='h-[60%]  flex flex-col justify-evenly pl-14 border-b'>
          
          <div ><p>Home</p></div>
          <div ><p>Trending</p></div>
          <div><p>Message</p></div>
          <div><p>Profile</p></div>
       
          
        </div>
        <div className='h-[10%] border-b'>
          <div className='ml-14 my-3 cursor-pointer pt-4'><p>Log Out</p></div>
        </div>
    </div>

    <div className='w-[60%] overflow-scroll n-full scrollbar-hide'>
    <div className='h-[75px] bg-white border-l flex justify-evenly items-center pt-2 sticky top-0 shadow-sm'>
      <div className='flex justify-center items-center'>
        <Input placeholder='Enter your search'/>
        <Button label='search' className='mb-4 wl-4'/>
      </div>
      <Button label='Create New Post' className='rounded-lg bg-red-400 hover:bg-red-500 mb-4'/>
      {

      }
    </div>
      {
        [1,2,3,4,5].map(()=>{
          return(<Post/>)
        })
      }
     
      
    </div>
    <div className='w-[20%] bg-slate-500'></div>
   
    </div>
  )
}

export default Home
