import { Button, Drawer, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import InputComponent from '../InputComponent/InputComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import InputFormComponent from '../InputForm/InputFormComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { Select } from "antd";
import * as ProductSevice from '../../services/ProductService';
const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, data, ...rests }) => {
  const [productId, setProductId] = useState()
  const [categoryId, setCategoryId] = useState()
  const [brandId, setBrandId] = useState()
  const user = useSelector((state) => state.user)
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [preview, setPreview] = useState(null);
  const [Title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [form] = Form.useForm();
  const handleOnChangeAvatar = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setImage(selectedFile);
      const filePreview = URL.createObjectURL(selectedFile);
      setPreview(filePreview);
    } else {
      setImage(data?.imageUrl)
      setPreview("")
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/brand/all`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/category/all`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setProductId(data?.id)
    setTitle(data?.title)
    setDescription(data?.description)
    setPrice(data?.price)
    setRating(data?.rating)
    setQuantity(data?.quantity)
    setDiscount(data?.discount)
    setImage(data?.imageUrl)
  }, [data])

  const handleCancel = () => {
    setIsOpenDrawer(false);  
  };
  const onFinish = () => { };

  const handleOnChangeTitle = (value) => {
    setTitle(value);
  }

  const handleOnChangeDescription = (value) => {
    setDescription(value);
  }
  const handleOnChangePrice = (value) => {
    setPrice(Number(value));
  }

  const handleOnChangeRating = (value) => {
    setRating(value);
  }
  const handleOnChangeQuantity = (value) => {
    setQuantity(Number(value));
  }
  const handleOnChangeDiscount = (value) => {
    setDiscount(Number(value))

  }

  const handleSelectBrand = (value) => {
    setBrandId(value);
  };

  const handleSelectCategory = (value) => {
    setCategoryId(value);
  };

  const productDto = {
    id: productId,
    title: Title,
    description: description,
    price: price,
    rating: rating,
    quantity: quantity,
    discount: discount
  }

  const handleSubmit = () => {
    ProductSevice.updateProductById(productId, brandId, categoryId, productDto)
    handleCancel();
    
  }

  const handleUpdateImageProduct = () =>{
    ProductSevice.updateImageProductById(productId,image)
    handleCancel();
  }

  return (
    <div>
      <Drawer title={title} placement={placement} open={isOpen} {...rests} >
        <div className='WrapperContentProfile'>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='name'>Title</label>
            <InputFormComponent style={{ width: '300px' }} id='title' value={Title} onChange={handleOnChangeTitle} />
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='email'>Description</label>
            <InputFormComponent style={{ width: '300px' }} id='description' value={description} onChange={handleOnChangeDescription} />
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='phone'>Price</label>
            <InputFormComponent style={{ width: '300px' }} id='price' value={price} onChange={handleOnChangePrice} />
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Rating</label>
            <InputFormComponent style={{ width: '300px' }} id='rating' value={rating} onChange={handleOnChangeRating} />
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Quantity</label>
            <InputFormComponent style={{ width: '300px' }} id='quantiy' value={quantity} onChange={handleOnChangeQuantity} />
          </div>
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Discount</label>
            <InputFormComponent style={{ width: '300px' }} id='rating' value={discount} onChange={handleOnChangeDiscount} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <div className='WrapperInputProfile'>

              <Select
                onChange={handleSelectBrand}
                defaultValue="Choose you brand!"
                style={{
                  width: 200,
                }}
                options={brands.map((brand) => {
                  return {
                    value: brand.id,
                    label: brand.title,
                  }
                })}
              />
            </div>
            <div className='WrapperInputProfile'>

              <Select
                onChange={handleSelectCategory}
                defaultValue="Choose your Category!"
                style={{
                  width: 200,
                }}
                options={categories.map((category) => {
                  return {
                    value: category.id,
                    label: category.title,
                  }
                })}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ButtonComponent
              onClick={handleSubmit}
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
          <div className='WrapperInputProfile'>
            <label className='WrapperLabelProfile' htmlFor='address'>Image</label>
            <input type="file" onChange={handleOnChangeAvatar} />
            {preview ? (
              <img src={preview} style={{
                marginLeft: '-32px',
                height: '60px',
                width: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} alt='avatar' />
            ) :
              (
                <img src={image} style={{
                  marginLeft: '-32px',
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} alt='avatar' />
              )}
            <ButtonComponent
              onClick = {handleUpdateImageProduct}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật hình ảnh'}
              styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </div>
        </div>
      </Drawer>

    </div>
  )
}

export default DrawerComponent