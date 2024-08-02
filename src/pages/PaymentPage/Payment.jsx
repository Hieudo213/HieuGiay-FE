import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row, Pagination, Checkbox, Button, Modal, Radio, Space, Input } from 'antd'
import { updateProductQuantityUp, removeOrderProduct } from '../../redux/slice/orderSlice'
import '../OrderPages/OrderPage.css'
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import InputFormComponent from '../../components/InputForm/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { removeAllOrderProduct, getTotalMoney } from '../../redux/slice/orderSlice'
const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state?.order);
    const user = useSelector((state) => state?.user);
    const [listChecked, setListChecked] = useState([]);

    const [newAddress, setNewAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChangeAddress, setIsChangeAddress] = useState(false);
    const [value, setValue] = useState(1);
    const [valuePayment, setValuePayment] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleBackHome = () => {
        navigate("/");
        dispatch(removeAllOrderProduct())
        window.location.reload();
    }

    const onCancel = () => {
        setIsChangeAddress(false)
        setIsModalOpen(false)
    }
    const handleChangeAddress = (value) => {
        setNewAddress(value);
    }

    const onChangeAddress = () => {
        setIsChangeAddress(true)
    }

    const onChangePaymentMethod = (e) => {
        setValuePayment(e.target.value);
    }

    const TotalMoney = order?.totalOrderMoney;

    const handleBuy = () => {
        setIsModalOpen(true);
        dispatch(getTotalMoney({TotalMoney}))
    }



    return (
        <div style={{ height: '730px', padding: '0 120px', background: '#efefef' }}>
            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>
                    Thanh toán
                </span>
            </div>
            <Row style={{ marginTop: '10px' }}>
                <Col span={17} className='ProductList'>
                    <div style={{ width: '98%', height: '350px', backgroundColor: " #fff" }}>
                        <div style={{ width: '63%', height: '50%', marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ marginBottom: '10px', fontWeight: 600 }}>Chọn phương thức giao hàng </span>
                            <div style={{ width: '100%', height: '50%', background: '#f3f7ff', borderRadius: '3px', border: '1px solid #e2e8f1', display: 'flex', alignItems: 'center' }}>
                                <Radio.Group style={{ marginLeft: '20px' }} onChange={onChange} value={value}>
                                    <Space direction="vertical">
                                        <Radio value={1}><span style={{ fontWeight: 800, color: '#e59512' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value={2}><span style={{ fontWeight: 800, color: '#e59512' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                        <div style={{ width: '63%', height: '50%', marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ marginBottom: '10px', fontWeight: 600 }}>Chọn phương thức thanh toán </span>
                            <div style={{ width: '100%', height: '50%', background: '#f3f7ff', borderRadius: '3px', border: '1px solid #e2e8f1', display: 'flex', alignItems: 'center' }}>
                                <Radio.Group style={{ marginLeft: '20px' }} onChange={onChangePaymentMethod} value={valuePayment}>
                                    <Space direction="vertical">
                                        <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={7} className='Payment' >
                    <div className='PaymentInfo'>
                        <div className='PaymentDetail'>
                            <div style={{ width: '85%', height: '135px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <span>Địa chỉ: </span>
                                    <span onClick={onChangeAddress} className='ChangePassword' style={{ cursor: 'pointer', marginLeft: '3px', fontWeight: 600 }}>{user?.address}</span>
                                </div>
                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'start' }}>Tạm tính</div>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>{order?.totalOrderMoney}.000₫</div>
                                </div>
                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'start' }}>Giảm giá</div>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>0₫</div>
                                </div>

                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'start' }}>Phí giao hàng</div>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>10.000₫</div>
                                </div>
                            </div>
                        </div>
                        <div className='PaymentMoney'>
                            <div style={{ width: '85%', height: '80px', display: 'flex' }}>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <div style={{ width: '100%', height: '25px', textAlign: 'start' }}>Tổng tiền</div>
                                </div>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <div style={{ width: '100%', height: '40%', fontSize: '28px', fontWeight: 600, color: '#ed1c25' }}>{order?.totalOrderMoney + 10}.000₫</div>
                                    <div style={{ width: '100%', height: '60%', fontSize: '12px', color: '#ccc' }}>(Đã bao gồm thuế VAT)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='buyButton'>
                        <Button onClick={handleBuy} style={{ width: '100%', height: '100%', borderRadius: 0, background: '#ed1c25' }}>
                            <span style={{ fontWeight: 600, color: '#fff' }}>Mua Ngay</span>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Modal title="Thay Đổi Địa Chỉ"
                open={isChangeAddress}
                onCancel={onCancel}
                footer={null}
                width={710}
            >
                <div className='WrapperContentProfile'>
                    <div className='WrapperInputProfile'>
                        <label className='WrapperLabelProfile' htmlFor='name'>address</label>
                        <InputFormComponent style={{ width: '300px' }} id='address' value={newAddress} onChange={handleChangeAddress} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonComponent

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
            </Modal>
            <Modal title="Đơn Đặt Hàng Của Bạn Đã Thành Công"
                open={isModalOpen}
                onCancel={onCancel}
                footer={null}
                width={710}
            >

                <ButtonComponent
                    onClick={handleBackHome}
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
        </div>
    )
}

export default Payment