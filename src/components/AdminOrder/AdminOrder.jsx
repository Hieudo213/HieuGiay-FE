import React from 'react'
import TableOrderComponent from '../TableComponent/TableOrderComponent'

const AdminOrder = () => {
  return (
    <div>
      <h1 className='WrapperHeaderAU'>Quản Lý Hoá Đơn</h1>
      <div style={{marginTop: '10px'}}>
        <TableOrderComponent/>
      </div>
    </div>
  )
}

export default AdminOrder