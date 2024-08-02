import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row, Pagination, Checkbox, Button, Modal } from 'antd'
import { updateProductQuantityUp, removeOrderProduct, getTotalMoney } from '../../redux/slice/orderSlice'
import './OrderPage.css'
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import InputFormComponent from '../../components/InputForm/InputFormComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
const OrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector((state) => state?.order);
    const user = useSelector((state) => state?.user);
    const [listChecked, setListChecked] = useState([]);
    const [TotalMoney, setTotalMoney] = useState(0);
    const [newAddress, setNewAddress] = useState("")
    const [isChangeAddress, setIsChangeAddress] = useState(false);
    const onPlus = (id, quantity, amount) => {
        if (quantity < amount) {
            dispatch(updateProductQuantityUp({ id, quantity: quantity + 1 }))
        }
    }

    const onMinus = (id, quantity, amount) => {
        if (quantity > 1) {
            dispatch(updateProductQuantityUp({ id, quantity: quantity - 1 }))
        }
    }

    const handleDeleteOrderProduct = (id) => {
        dispatch(removeOrderProduct({ id }))
    }

    const onChangeCheckBox = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    }

    const onChangeCheckBoxAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.products.forEach((item) => {
                newListChecked.push(item?.id);
            })
            setListChecked(newListChecked);
        } else {
            setListChecked([])
        }
    }

    useEffect(() => {
        const total = listChecked.reduce((acc, id) => {
            const product = order?.products.find((item) => item.id === id);
            return acc + (product ? product.price * product.quantity : 0);
        }, 0);
        setTotalMoney(total);
    }, [listChecked, order?.products]);

    const onCancel = () => {
        setIsChangeAddress(false)
    }
    const handleChangeAddress = (value) => {
        setNewAddress(value);
    }

    const onChangeAddress = () => {
        setIsChangeAddress(true)
    }

    const handleBuy = () => {
        navigate("/payment");
        dispatch(getTotalMoney({TotalMoney}))
    }

   

    return (
        <div style={{ height: '730px', padding: '0 120px', background: '#efefef' }}>
            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>
                    Giỏ hàng của bạn
                </span>
            </div>
            <Row style={{ marginTop: '10px' }}>
                <Col span={17} className='ProductList'>
                    <div style={{ width: '98%', height: '40px', backgroundColor: " #fff" }}>
                        <Row style={{ height: '100%' }}>
                            <Col span={10} style={{ display: 'flex', alignItems: 'center' }} >
                                <Checkbox
                                    checked={listChecked?.length > 0 && listChecked?.length === order?.products?.length}
                                    onChange={onChangeCheckBoxAll}
                                    className='ProductListText'
                                    style={{ paddingLeft: '5px' }}
                                >Tất cả: {order?.products?.length} sản phẩm</Checkbox>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} span={11}>
                                <div className='ProductListText' style={{ width: '30%', textAlign: 'center' }}>Đơn Giá</div>
                                <div className='ProductListText' style={{ width: '40%', textAlign: 'center' }}>Số Lượng</div>
                                <div className='ProductListText' style={{ width: '30%', textAlign: 'center' }}>Số Tiền</div>
                            </Col>
                            <Col span={3} style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='ProductListText' style={{ textAlign: 'center', width: '100%' }}>Thao Tác</div>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ marginTop: '13px' }}>
                        {order?.products?.map((product) => (
                            <div style={{ width: '98%', height: '100px', backgroundColor: " #fff", marginTop: '5px' }}>
                                <Row style={{ height: '100%' }}>
                                    <Col span={10} style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
                                        <Checkbox onChange={(e) => onChangeCheckBox(e, product?.price, product?.quantity)} checked={listChecked.includes(product?.id)} value={product?.id} className='ProductListText' style={{ paddingLeft: '5px' }} />
                                        <div style={{ width: '85px', height: '85px', backgroundColor: 'red' }}>
                                            <img src={product?.image}
                                                alt="avatar" style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'cover'
                                                }} />
                                        </div>
                                        {product?.title}
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} span={11}>
                                        <div style={{ width: '30%', textAlign: 'center' }}>{product?.price}.000₫</div>
                                        <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                                            <div className='WrapperQuantityOrder'>
                                                <div onClick={() => onMinus(product?.id, product?.quantity, product?.amount)} style={{ height: '100%', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                                    <MinusOutlined />
                                                </div>
                                                <div style={{ height: '100%', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                                    {product.quantity}
                                                </div>
                                                <div onClick={() => onPlus(product?.id, product?.quantity, product?.amount)} style={{ height: '100%', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                                    <PlusOutlined />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: '30%', textAlign: 'center', color: '#ed1c25' }}>{product?.price * product?.quantity}.000₫</div>
                                    </Col>
                                    <Col span={3} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <DeleteOutlined onClick={() => handleDeleteOrderProduct(product?.id)} style={{ cursor: 'pointer', fontSize: 'x-large' }} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
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
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>{TotalMoney}.000₫</div>
                                </div>
                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'start' }}>Giảm giá</div>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>0.000₫</div>
                                </div>

                                <div style={{ width: '97%', height: '25px', display: 'flex' }}>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'start' }}>Phí giao hàng</div>
                                    <div style={{ width: '50%', height: '25px', textAlign: 'end', fontWeight: 600 }}>0.000₫</div>
                                </div>
                            </div>
                        </div>
                        <div className='PaymentMoney'>
                            <div style={{ width: '85%', height: '80px', display: 'flex' }}>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <div style={{ width: '100%', height: '25px', textAlign: 'start' }}>Tổng tiền</div>
                                </div>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <div style={{ width: '100%', height: '40%', fontSize: '28px', fontWeight: 600, color: '#ed1c25' }}>{TotalMoney}.000₫</div>
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
        </div>
    )
}

export default OrderPage;