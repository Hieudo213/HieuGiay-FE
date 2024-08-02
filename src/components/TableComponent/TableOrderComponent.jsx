import { Drawer, Modal, Radio, Select, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './TableComponent.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as UserSevice from '../../services/UserService';
import InputFormComponent from '../InputForm/InputFormComponent';

const TableOrderComponent = () => {
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
        title: 'Paid',
        dataIndex: 'Paid',
        ellipsis: true,
        render: (text) => <div className="table-cell">Chua Thanh Toan</div>,
        sorter: (a, b) => a.email.length - b.email.length
      },
      {
        title: 'Shipped',
        dataIndex: 'Shipped',
        ellipsis: true,
        render: (text) => <div className="table-cell">Dang Giao Hang</div>,
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
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        ellipsis: true,
        render: (text) => <div className="table-cell">Thanh Toan Khi Nhan Hang</div>,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        ellipsis: true,
        render: (text) => <div className="table-cell">20.000đ</div>,
      },
    ];
  
    const data = users.map((user, index) => {
      return {
        key: index,
        name: user.name,
        paid: 'DA THANH TOAN',
        shipped: user.username,
        address: user.address,
        phone: user.phone,
        role: user.role,
      };
    });
  
    
  
    const userDto = {
      name: name,
      email: detailEmail,
      username: username,
      phone: phone,
      address: address,
      image: image,
      role: role
    }
  
    
  
  
  
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          onRow={handleOnRow}
        />
        
       
      </>
    )
}

export default TableOrderComponent