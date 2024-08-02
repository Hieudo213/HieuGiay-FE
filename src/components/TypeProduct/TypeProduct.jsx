import React from 'react'
import './TypeProduct.css'
const TypeProduct = ({name}) => {
  return (
    <div className='TypeProductText'>
      <div className='TypeProductTextDetail' style={{padding: '0 10px', }}>{name}</div>
    </div>
  )
}

export default TypeProduct