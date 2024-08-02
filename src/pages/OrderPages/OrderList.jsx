import React from "react"
import './OrderPage.css'
import { Button } from "antd"
import { useSelector } from "react-redux"
const OrderList = () => {
    const order = useSelector((state) => state?.order);
    return (
        <div style={{ minHeight: '100vh', padding: '0 120px', background: '#efefef' }}>
            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>
                    Đơn Hàng Của Tôi
                </span>
            </div>
            <div className="ListContainer">
                <div className="Order">
                    <div style={{ width: '95%', marginTop: '13px' }} className="OrderInfo">
                        <div className="OrderInfoText" style={{ fontWeight: 600 }}>Trạng thái: </div>
                        <div className="OrderInfoText" style={{ color: 'red' }}>Giao hàng:<span style={{ color: 'black' }}> Đang Giao Hàng</span></div>
                        <div className="OrderInfoText" style={{ color: 'red' }}>Thanh toán:<span style={{ color: 'black' }}> Chưa Thanh Toán</span></div>
                    </div>
                    <div className="OrderProduct">
                        <div style={{ width: '100%', height: '90%', display: 'flex', gap: '5px' }}>
                            <div className="ProductImg">
                                <img src="data:image/jpeg;base64,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"
                                    alt="avatar" style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover'
                                    }} />
                            </div>
                            <div className="ProductInfo">
                                <span style={{ fontSize: '14px' }}>Air Force 1</span>
                               
                            </div>
                            <div style={{ fontSize: '14px', textAlign: 'center'}} className="ProductPrice">
                            {order?.totalOrderMoney + 10}.000đ
                            </div>
                        </div>
                        
                    </div>
                    <div className="OrderButton">
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>Tổng tiền: <span style={{ color: 'red' }}>{order?.totalOrderMoney + 10}.000đ</span></div>
                       

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderList