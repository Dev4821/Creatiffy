import React from 'react'

function Commentar(props) {
   if(props.comment===""||props.username==="")
   {
    return null;
   }
   console.log(props)
  return (
    
    <div className='border-b pl-4 pr-4'>
    
      <h3 className='text-blue-300'>{props.username}:</h3>
      <div>{props.comment}</div>
        
    </div>
  )
}

export default Commentar

