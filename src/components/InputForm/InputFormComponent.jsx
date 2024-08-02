import { Input } from 'antd'
import React, { useState } from 'react'
import './InputFormComponent.css'
const InputFormComponent = (props) => {
  const {placeholder='Nhập Text', ...rests} = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value)
  }
  return (
      <Input className='WrapperInputStyle' placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput}  />
 ) 
}

export default InputFormComponent