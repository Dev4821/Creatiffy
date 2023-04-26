import React from 'react'

const Button = ({
     label='',
     className='',
     onClick,
    }) => {
  return (
    <button className={`text-white font-bold py-2 px-4 ${className}`} onClick={onClick}>
    {label}
    </button>
  )
}

export default Button
