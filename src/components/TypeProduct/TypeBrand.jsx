import React from 'react'
import './TypeProduct.css'
import { Link } from 'react-router-dom'

const TypeBrand = ({name, id}) => {
    return (
        <Link to={`/type/brand/${id}`} className='TypeProductText'>
          <div className='TypeProductTextDetail' style={{padding: '0 10px', }}>{name}</div>
        </Link>
      )
}

export default TypeBrand