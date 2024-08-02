import React, { useEffect, useState } from 'react'
import InputFormComponent from '../../components/InputForm/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logoweb from '../../assets/images/logoweb.jpeg'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeUsername = (value) => {
    setUsername(value)
  }

  const handleOnChangeName = (value) => {
    setName(value)
  }

  const handleNavigateSignin = () => {
    navigate('/sign-in')
  }

  const handleAddress = (value) => {
    setAddress(value);
  }

  const handlePhone = (value) => {
    setPhone(value)
  }

  const mutation = useMutationHooks(
    data => UserService.register(data)
  )
  const { status, isPending, isSuccess, isError } = mutation
  useEffect(()=>{
    if(isSuccess){
      message.success();
      handleNavigateSignin()
    }else if(isError){
      message.error();
    }
  })
  const handleSignUp = () => {
    mutation.mutate({
      name,
      email,
      username,
      address,
      phone,
      password
    })
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '545px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', fontFamily: 'sans-serif' }}>
        <div className='WrapperContainerLeft'>
          <h1>Xin Chào</h1>
          <p style={{ fontSize: '14px' }}>Đăng nhập và tạo tài khoản</p>
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập email của bạn' value={email} onChange={handleOnChangeEmail} />
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập username của bạn' value={username} onChange={handleOnChangeUsername} />
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập tên của bạn' value={name} onChange={handleOnChangeName} />
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập địa chỉ của bạn' value={address} onChange={handleAddress} />
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập số điện thoại của bạn' value={phone} onChange={handlePhone} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                fontSize: '15px'
              }}
            > {
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập mật khẩu của bạn' type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
          </div>
          <LoadingComponent isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !username.length || !name.length}
              onClick={handleSignUp}
              size={20}
              styleButton={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textButton={'Đăng Ký'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </LoadingComponent>
          <p style={{ fontSize: '13px' }}>Đã có tài khoản?<span className='WrapperTextLight' onClick={handleNavigateSignin} style={{ cursor: 'pointer' }}> Đăng Nhập</span></p>
        </div>
        <div className='WrapperContainerRight'>
          <Image src={logoweb} preview={false} alt='logo' width='203px' height='203px' />
          <h3>Mua sắm tại Hiếu Giày</h3>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage