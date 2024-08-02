import React, { useState } from "react";
import { Col, Row, Badge, Popover, Button, Modal } from "antd"
import "./HeaderComponent.css"
import Search from "antd/lib/transfer/search"
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService"
import * as ProductService from "../../services/ProductService";
import { resetUser, updateUser } from '../../redux/slice/userSlice';
import { removeAllOrderProduct } from '../../redux/slice/orderSlice';
import { searchProduct, searchText } from '../../redux/slice/productSlice';
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import { persistor } from '../../redux/store';
import { all } from "axios";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const order = useSelector((state) => state.order);
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state.user)
    const HandleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const onCancel = () => {
        setIsModalOpen(false)
    }

    const handleLogout = async () => {
        setIsLoading(true)
        await UserService.logout();
        dispatch(resetUser())
        setIsLoading(false)
        localStorage.removeItem('access_token');
        navigate("/")
        window.location.reload();
        dispatch(removeAllOrderProduct())
        persistor.purge();
    }

    const handleModal = () => {
        if (order?.products?.length === 0) {
            handleLogout();
        } else {
            setIsModalOpen(true)
        }

    }

    useEffect(() => {
        setIsLoading(true)
        setUsername(user?.name)
        setIsLoading(false)
    }, [user?.name, user?.image])

    const content = (
        <div>
            <p className="WrapperContentPage" onClick={handleModal}>Đăng Xuất</p>
            <p className="WrapperContentPage" onClick={() => navigate('/profile-user')}>Thông Tin Người Dùng</p>
            {user?.role === "ADMIN" && (
                <p className="WrapperContentPage" onClick={() => navigate('/system/admin')}>Quản Lý Hệ Thống</p>
            )}
            {user?.role === "USER" && (
                <p className="WrapperContentPage" onClick={() => navigate('/order-history')}>Đơn Hàng Của Tôi</p>
            )}

        </div>
    );

    const onSearchInput = (e) => {
        setSearch(e.target.value);
    }

    const onSearch = async () => {
        const res = await ProductService.searchProductByTitle(search);
        dispatch(searchProduct(res))
        dispatch(searchText(search))
        navigate('/search');

    }

    const backHome = () => {
        navigate("/")

    }

    const onCart = () => {
        navigate('/order')
    }
    return (
        <div className="container">
            <Row className="WrapperHeader" style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col cl span={5}>
                    <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={backHome} className="WrapperTextHeader">HIEUGIAY</span>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm Kiếm"
                            placeholder="Tìm Kiếm Sản Phẩm"
                            onChange={onSearchInput}
                            onClickButton={onSearch}
                        />
                    </Col>
                )}

                <Col span={6} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <LoadingComponent isLoading={isLoading}>
                        <div className="WrapperHeaderAccount">
                            {user.image ? (
                                <img src={`http://localhost:8080/file/${user.image}`} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}

                            {user?.accessToken ? (
                                <>
                                    <Popover content={content} trigger="click" >
                                        <div style={{ cursor: 'pointer' }}>{username}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={HandleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <span className="WrapperTextHeaderSmall" style={{ fontSize: "12px" }}>Đăng Nhập/Đăng Ký</span>
                                    <div>
                                        <span className="WrapperTextHeaderSmall">Tài Khoản</span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </div>
                    </LoadingComponent>
                    {!isHiddenCart && (
                        <div style={{ cursor: 'pointer' }} onClick={onCart}>
                            <Badge count={order?.products?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: `#fff` }} />
                            </Badge>
                            <span className="WrapperTextHeaderSmall">Giỏ Hàng</span>
                        </div>
                    )}
                </Col>
            </Row>
            <Modal title={`Bạn còn ${order?.products?.length} sản phẩm chưa thanh toán, nếu đăng xuất tất cả các sản phẩm sẽ không được lưu lại, bạn có muốn đăng xuất?`}
                open={isModalOpen}
                onCancel={onCancel}
                footer={null}
                closable={false}>
                <ButtonComponent
                    onClick={handleLogout}
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

export default HeaderComponent;