import { Col, Image, InputNumber, Modal, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import './ProductDetailComponent.css'
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addOrderProduct, updateProductQuantityUp } from '../../redux/slice/orderSlice'
import InputFormComponent from '../InputForm/InputFormComponent'
const ProductDetailComponent = () => {
  let { id } = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state) => state?.user)
  const [address, setAddress] = useState()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShowSize, setIsShowSize] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [newAddress, setNewAddress] = useState("")
  const onPlus = () => {
    if (quantity < product?.quantity) {
      setQuantity(quantity + 1);
    }
  }

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
        setProduct(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setAddress(user?.address);
  }, [user])
  const handleAddOrderProduct = () => {
    if (!user?.email) {
      navigate("/sign-in", { state: location?.pathname })
    } else {
      dispatch(addOrderProduct({
        product: {
          id: product?.id,
          title: product?.title,
          image: product?.imageUrl,
          quantity: quantity,
          price: product?.price,
          totalProductMoney: 50,
          color: color,
          size: size,
          amount: product?.quantity
        }
      }))
    }
  }

  const onCancel = () => {
    setIsShowSize(false)
    setIsChangeAddress(false)
  }

  const onShowSize = () => {
    setIsShowSize(true)
  }

  const onChangeAddress = () => {
    setIsChangeAddress(true)
  }

  const handleChangeAddress = (value) => {
    setNewAddress(value);
  }

  const handleColor = (title) => {
    setColor(title);
  }

  const handleSize = (title) => {
    setSize(title);
  }

  return (
    <>
      <Row style={{ padding: "16px", background: '#fff', borderRadius: '4px' }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5e5', paddingRight: '8px' }} >
          <Image style={{ width: '478px', height: '478px' }} src={product?.imageUrl} alt='image product' preview={false} />
          <Row style={{ paddingTop: '10px' }}>
            <div>
              <span style={{ fontWeight: '600' }}>Mô tả sản phẩm:</span> {product?.description}
            </div>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }} >
          <span className='WrapperStyleNameProduct'>{product?.title}</span>
          <div>
            <span>{product?.rating}</span>
            <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
            <span className='WrapperStyleTextSell'> | Đã bán 1000+</span>
          </div>
          <div className='WrapperPriceProduct'>
            <span className='WrapperPriceTextProduct'>{product?.price}.000₫</span>
            <span style={{ textDecoration: 'line-through', color: '#929292' }}>-{product?.discount}.000₫</span>
          </div>
          <div className='WrapperAddressProduct'>
            <span>Giao đến </span>
            <span className='address'>{address}</span> -
            <span style={{ cursor: 'pointer' }} className='change-address' onClick={onChangeAddress}> Đổi Địa Chỉ</span>
          </div>
          <div style={{ margin: '10px 0 20px', padding: '10px', borderTop: '1px solid #e5e5e5e5', borderBottom: '1px solid #e5e5e5e5' }}>
            <div style={{ marginBottom: '10px', color: '#757575' }}>Số Lượng</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className='WrapperQualityProduct'>
                <div onClick={onMinus} style={{ height: '100%', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <MinusOutlined />
                </div>
                <div style={{ height: '100%', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {quantity}
                </div>
                <div onClick={onPlus} style={{ height: '100%', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <PlusOutlined />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#757575' }}>{product?.quantity} sản phẩm có sẵn</span>
              </div>
            </div>
            <div style={{ marginBottom: '10px', color: '#757575', marginTop: '10px' }}>Màu sắc</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product?.colors.map((colorItem) => (
                <div onClick={() => handleColor(colorItem?.title)} key={colorItem?.id} style={{ cursor: 'pointer',width: '35px', height: '35px', border: `2px solid ${color === colorItem?.title ? 'red' : '#ccc'}`, borderRadius: 50, background: colorItem?.title }}></div>
              ))}
            </div>
            <div style={{ marginBottom: '10px', color: '#757575', marginTop: '10px' }}>Size</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product?.sizes.map((sizeItem) => (
                <div onClick={()=> handleSize(sizeItem?.title)} key={sizeItem?.id} style={{ cursor: 'pointer',width: '35px', height: '35px', border: `2px solid ${size === sizeItem?.title ? 'red' : '#ccc'}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {sizeItem?.title}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} >
            <ButtonComponent
              onClick={handleAddOrderProduct}
              size={20}
              styleButton={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Thêm Vào Giỏ Hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
            <ButtonComponent
              onClick={onShowSize}
              size={20}
              styleButton={{
                background: '#fff',
                height: '48px',
                width: '220px',
                border: '1px solid rgb(13,92,182)',
                borderRadius: '4px',
              }}
              textButton={'Bảng Kích Cỡ'}
              styleTextButton={{ color: 'rgb(13,92,128)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
          <Modal title="Bảng Quy Đổi Kích Cỡ"
            open={isShowSize}
            onCancel={onCancel}
            footer={null}
            width={645}
            height={500}
          >
            <span>Thông số trong Bảng quy đổi kích cỡ này được Người bán cung cấp và có thể sẽ chênh lệch 1-2 cm so với thực tế.</span>
            <img src={`https://giaycaosmartmen.com/wp-content/uploads/2020/09/bang-size-giay-bitis.png`} style={{
              height: '470px',
              width: '597px',
              objectFit: 'cover'
            }} alt='avatar' />
          </Modal>
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
        </Col>
      </Row>
    </>

  )
}

export default ProductDetailComponent