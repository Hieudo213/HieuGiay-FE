import React, { Fragment } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row, Pagination } from 'antd'
import './TypeProduct.css'
const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: "nowrap", paddingTop: '10px' }}>
                <Col span={4} className='WrapperNavbar'>
                    <NavBarComponent />
                </Col>
                <Col span={20}>
                    <div className='WrapperProducts' >
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                    <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign:"center", marginTop:"10px"}}/>
                </Col>
            </Row>
        </div>
    )
}

export default TypeProductPage