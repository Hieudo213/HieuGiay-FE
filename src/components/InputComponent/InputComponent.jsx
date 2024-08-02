import React from 'react'
import { Input } from 'antd';
function InputComponent({size, placeholder, bordered, style, ...rests}) {
  return (
        <Input style={style}
                size={'large'}
                placeholder={placeholder}
                bordered = {bordered}
                {...rests}
                 />
  )
}

export default InputComponent