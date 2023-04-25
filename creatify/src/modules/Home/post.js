import React from 'react'
import postImg from '../../assets/post1.jpg'
import {ReactComponent as Avatar} from '../../assets/avatar.svg'
const post = () => {
  return (
    <div className='bg-white w-[80%]  mx-auto mt-32'>
        <div className='border-b flex items-center pb-4 mb-4'>
          <Avatar width={'50px'} height={'50px'}/>
          <div className='ml-4'>
            <h3>Divyansh Sharma</h3>
            <p>@divyansh</p>
          </div>
        </div>
        <div className='border-b pb-4 mb-4 '>
            <img src={postImg}  alt='there is a post'/>
        </div>
         <div className='flex justify-evenly'>
          <div>10.5k likes</div>
          <div>10.5k comments</div>
          <div>10.5k shares</div>
         </div>
      </div>
  )
}

export default post
