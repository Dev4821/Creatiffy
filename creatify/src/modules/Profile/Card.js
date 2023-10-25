import React from 'react'

const Card = (props) => {
  return (
    <div className="w-[400px] h-[400px] rounded-lg border-2 border-black mt-6 mx-2 flex flex-col ">
    
    <div className='justify-center h-[300px]  p-4 ' style={{alignSelf:"center"}}>
        <img src={props.url}   alt='there is a post'  className='rounded-xl max-h-full'/>
    </div>
    <hr className="h-0.5 border-1  dark:bg-black"/>
   <div className=''>
    <div className='text-center text-lg text-black'>{props.caption}</div>
    <div className='text-center text-base'>{props.description}</div>
     <div className='flex justify-evenly'>
      <div>10.5k likes</div>
      <div>10.5k comments</div>
      <div>10.5k shares</div>
     </div>
     </div>
    </div>
  )
}

export default Card
