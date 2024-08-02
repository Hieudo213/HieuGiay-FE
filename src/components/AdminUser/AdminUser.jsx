import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React from 'react'
import TableComponent from '../TableComponent/TableComponent';
import './AdminUser.css'
import TableUserComponent from '../TableComponent/TableUserComponent';
const AdminUser = () => {
  return (
    <div>
      <h1 className='WrapperHeaderAU'>Quản Lý Người Dùng</h1>
      <div style={{marginTop: '10px'}}>
        <TableUserComponent/>
      </div>
    </div>
  )
}

export default AdminUser