import { Drawer, Modal, Radio, Select, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './TableComponent.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as UserSevice from '../../services/UserService';
import InputFormComponent from '../InputForm/InputFormComponent';

const TableUserComponent = () => {
  const [deleteEmail, setDeleteEmail] = useState();
  const [user, setUser] = useState()
  const [title, setTitle] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [detailEmail, setDetailEmail] = useState();
  const [realUser, setRealUser] = useState();
  const [username, setUsername] = useState("")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/user/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(user?.email);
    setRole(realUser?.role)
    setName(realUser?.name)
    setAddress(realUser?.address)
    setImage(realUser?.image)
    setUsername(realUser?.username)
    setPhone(realUser?.phone)
  }, [user, realUser])

  const handleDetailProduct = (email) => {
    setIsOpenDrawer(true)
    setDetailEmail(email)
  };

  const handleDeleteProduct = (email) => {
    setIsModalOpen(true)
    setDeleteEmail(email)
  }

  useEffect(() => {
    if (isOpenDrawer && detailEmail) {
      axios
        .get(`http://localhost:8080/api/v1/user/${detailEmail}`)
        .then((response) => {
          setRealUser(response.data);
        })
        .catch((err) => {
          console.log(detailEmail);
        });
    }
  }, [isOpenDrawer, detailEmail]);

  useEffect(() => {
    if (isModalOpen && deleteEmail) {
      axios
        .get(`http://localhost:8080/api/v1/user/${deleteEmail}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isModalOpen, deleteEmail]);

  const onCancel = () => {
    setIsModalOpen(false)
  }



  const renderAction = (email) => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
          onClick={() => handleDeleteProduct(email)}
        />
        <EditOutlined
          style={{ color: 'rgb(26, 148, 255)', fontSize: '25px', cursor: 'pointer' }}
          onClick={() => handleDetailProduct(email)}
        />
      </div>
    );
  };

  const handleOnRow = (record, rowIndex) => {
    return {
      onClick: () => {
        setSelectedRow(record.email);
      }
    };
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
      sorter: (a, b) => a.email.length - b.email.length
    },
    {
      title: 'Username',
      dataIndex: 'username',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
      sorter: (a, b) => a.username.length - b.username.length
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
      sorter: (a, b) => a.address.length - b.address.length
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      ellipsis: true,
      render: (text) => <div className="table-cell">{text}</div>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      ellipsis: true,
      render: (_, record) => renderAction(record.email)
    },
  ];

  const data = users.map((user, index) => {
    return {
      key: index,
      name: user.name,
      email: user.email,
      username: user.username,
      address: user.address,
      phone: user.phone,
      role: user.role,
      action: renderAction(user.email)
    };
  });

  const handleDeleteUser = () => {
    UserSevice.deleteUserByEmail(deleteEmail);
    onCancel();
  }

  const handleSelectRole = (value) => {
    setRole(value);
   
  }

  const userDto = {
    name: name,
    email: detailEmail,
    username: username,
    phone: phone,
    address: address,
    image: image,
    role: role
  }

  const handleUpdateRole = () => {
    UserSevice.updateUserByEmail(detailEmail, userDto)
    window.location.reload()
  }



  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onRow={handleOnRow}
      />
      <Modal title={`Bạn muốn xoá người dùng: ${title}`} open={isModalOpen} onCancel={onCancel} footer={null}>
        <ButtonComponent
          onClick={handleDeleteUser}
          size={40}
          styleButton={{
            height: '30px',
            width: 'fit-content',
            borderRadius: '4px',
            padding: '2px 6px 6px'
          }}
          textButton={'Đồng ý'}
          styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
        ></ButtonComponent>
        <ButtonComponent
          onClick={onCancel}
          size={40}
          styleButton={{
            height: '30px',
            width: 'fit-content',
            borderRadius: '4px',
            padding: '2px 6px 6px'
          }}
          textButton={'Huỷ'}
          styleTextButton={{ color: 'red', fontSize: '15px', fontWeight: '700' }}
        ></ButtonComponent>
      </Modal>
      <Drawer title={`Chỉnh sửa quyền của người dùng có email: ${detailEmail}`} placement='right' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='90%'>
        <div className='WrapperContentProfile'>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='name'>Role</label>
            <div className='WrapperInputProfile'>
              <Select
                onChange={handleSelectRole}
                defaultValue="Choose you role!"
                style={{
                  width: 200,
                }}
                options={[
                  {
                    value: 'ADMIN',
                    label: 'ADMIN'
                  },
                  {
                    value: 'USER',
                    label: 'USER'
                  }
                ]}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ButtonComponent
              onClick = {handleUpdateRole}
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
      </Drawer>
    </>
  )
}

export default TableUserComponent