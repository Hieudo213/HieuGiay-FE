import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import InputFormComponent from '../../components/InputForm/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useSelector } from 'react-redux'
import * as UserService from "../../services/UserService"
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const [role,setRole] = useState("");
  
  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setAddress(user?.address)
    setPhone(user?.phone)
    setAvatar(user?.image)
    setRole(user?.role)
    setUsername(user?.username);
  }, [user])

  const handleOnChangeAddress = (value) => {
    setAddress(value)
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangeName = (value) => {
    setName(value)
  }

  const handleOnChangePhone = (value) => {
    setPhone(value)
  }

  const hanleUsername = (value) => {
    setUsername(value)
  }

  const handleOnChangeAvatar = (e) =>{
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }
  
  const userDto = {
    name: name,
    email: email,
    username: username,
    phone: phone,
    address: address,
    image: avatar,
    role: role
  }

  const mutation = useMutationHooks(
    (email, data = userDto, accessToken = user?.accessToken) => UserService.updateUserByEmail(email, data, accessToken)
  )

  const { isPending, isSuccess, isError } = mutation;

  const handleUpdate = () => {
    mutation.mutate(user?.email, userDto)
  }

  const handleUpdateAvatar = () => {
    UserService.updateImageUserByEmail(user?.email, image, user?.accessToken)
  }
  useEffect(() => {
    if (isSuccess) {
      message.success();
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  
  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <h1 className='WrapperHeaderProfile'>Thông tin người dùng</h1>
      <LoadingComponent isLoading={isPending} >
        <div className='WrapperContentProfile'>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='name'>Name</label>
            <InputFormComponent style={{ width: '300px' }} id='name' value={name} onChange={handleOnChangeName} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='email'>Email</label>
            <InputFormComponent style={{ width: '300px' }} id='email' value={email} onChange={handleOnChangeEmail} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='phone'>Phone</label>
            <InputFormComponent style={{ width: '300px' }} id='phone' value={phone} onChange={handleOnChangePhone} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='phone'>Username</label>
            <InputFormComponent style={{ width: '300px' }} id='phone' value={username} onChange={hanleUsername} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Address</label>
            <InputFormComponent style={{ width: '300px' }} id='address' value={address} onChange={handleOnChangeAddress} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Image</label>
           <input type="file"  onChange={handleOnChangeAvatar} />
           {avatar && (
            <img src={`http://localhost:8080/file/${avatar}`} style={{
              marginLeft:'-32px',
              height: '60px',
              width: '60px',
              borderRadius: '50%',
              objectFit: 'cover'
            }} alt='avatar' />
           )}
            <ButtonComponent
              onClick={handleUpdateAvatar}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
        </div>
      </LoadingComponent>
    </div>
  )
}

export default ProfilePage