import React from 'react'
import { Button } from 'antd';

const ButtonComponent = ({size,styleButton, styleTextButton, disabled ,textButton, ...rests}) => {
  return (
    <Button 
    style={{
      cursor: 'pointer',
      background: disabled ? '#ccc' : styleButton.background, 
      ...styleButton
    }}
    size={size}  
    {...rests}>
        <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponent