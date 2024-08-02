import React from 'react'
import './TypeProduct.css'
import { Link } from 'react-router-dom'

const TypeCategory = ({name, id}) => {
    return (
        <Link to={`/type/category/${id}`} className='TypeProductText'>
          <div className='TypeProductTextDetail' style={{padding: '0 10px', }}>{name}</div>
        </Link>
      )
}

export default TypeCategory