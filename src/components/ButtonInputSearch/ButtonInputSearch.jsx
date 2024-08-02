import React from 'react'
import { Button, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons"
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton,
        bordered, backgroundColorInput = `#fff`,
        backgroundColorButton = `rgb(13,92,182)`,
        colorButton = `#fff`, onClickButton } = props


    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                style={{ borderRadius: "0%", backgroundColor: backgroundColorInput }}
                size={size}
                placeholder={placeholder}
                {...props}
            />
            <Button
                onClick={onClickButton}
                style={{ borderRadius: "0%", backgroundColor: 'rgb(13,92,182)', border: !bordered && 'none' }}
                size={size}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
            >
                <span style={{ color: '#fff' }}>{textButton}</span>
            </Button>
        </div>
    )
}

export default ButtonInputSearch