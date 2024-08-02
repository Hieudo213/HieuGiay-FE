import React, { useEffect, useState } from 'react'
import './SignInPage.css'
import InputFormComponent from '../../components/InputForm/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logoweb from '../../assets/images/logoweb.jpeg'
import { useLocation, useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, } from 'react-redux'
import { updateUser } from '../../redux/slice/userSlice'
const SignInPage = () => {
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { status, isPending, isSuccess, data } = mutation

  useEffect(() => {
    if (isSuccess === true) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate('/');
      }
      localStorage.setItem('access_token', JSON.stringify(data?.accessToken))
      if (data?.accessToken) {
        const decode = jwtDecode(data?.accessToken);
        if (decode?.sub) {
          handleGetUserByEmail(decode?.sub, data?.accessToken)
        }
      }
    }
  }, [isSuccess])

  const handleGetUserByEmail = async (email, accessToken) => {
    const res = await UserService.getUserByEmail(email, accessToken)
    const payload = {
      ...res,
      accessToken: accessToken
    };
    dispatch(updateUser(payload));
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleName = (value) => {
    setName(value);
  }

  



  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', fontFamily: 'sans-serif' }}>
        <div className='WrapperContainerLeft'>
          <h1>Xin Chào</h1>
          <p style={{ fontSize: '14px' }}>Đăng nhập và tạo tài khoản</p>
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder='Nhập email của bạn' value={email} onChange={handleOnChangeEmail} />
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
            <InputFormComponent placeholder='Nhập mật khẩu của bạn' type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
          </div>
          {status === 'error' ? <span style={{ color: 'red' }}> Sai Tai Khoan Hoac Mat Khau</span> : <></>}
          <LoadingComponent isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={20}
              styleButton={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textButton={'Đăng Nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </LoadingComponent>
          <p className='WrapperTextLight'>Quên mật khẩu</p>
          <p style={{ fontSize: '13px' }}>Chưa có tài khoản?<span className='WrapperTextLight' onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}> Tạo tài khoản</span></p>
        </div>
        <div className='WrapperContainerRight'>
          <Image src={logoweb} preview={false} alt='logo' width='203px' height='203px' />
          <h3>Mua sắm tại Hiếu Giày</h3>
        </div>
      </div>
    </div>
  )
}

export default SignInPage