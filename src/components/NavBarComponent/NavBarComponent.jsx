import React from 'react'
import './NavBarComponent.css'
import { Checkbox, Col, Rate } from 'antd'

const NavBarComponent = ({ title, description }) => {
  return (
    <div>
      <div className='WrapperLabelText'>
        <h2>{title}</h2>
        <div className='WrapperContent'>
          <span style={{ fontWeight: 600 }}>Mô tả: </span>
          <span style={{color: '#929292', fontWeight: 300}}>
            {description}
          </span>
        </div>
      </div>
    </div>

  )
}

NavBarComponent.propTypes = {}

export default NavBarComponent