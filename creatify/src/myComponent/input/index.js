import React from 'react'

const Input = ({
    name='',
    label='',
    type='text',
    placeholder='',
    className='',
    value='',
    onChange=()=> null,
    isRequired=true

}) => {
  return (
    <div className='mb-4'>
        {
            label &&
        <label className='block text-gray-700 text-sm  mb-2' htmlFor={name}>
           
        </label>
       }
         <input className={`shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} value={value}  onChange={onChange} type={type}  id={name} placeholder={placeholder} required={isRequired} />
    </div>
  )
}

export default Input
