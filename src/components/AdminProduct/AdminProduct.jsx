import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import "./AdminProduct.css";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import * as ProductSevice from '../../services/ProductService'
import axios from "axios";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
const AdminProduct = () => {
  const user = useSelector((state) => state.user)
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [form] = Form.useForm();
  const handleOnChangeAvatar = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setImage(selectedFile);
      const filePreview = URL.createObjectURL(selectedFile);
      setPreview(filePreview);
    } else {
      setImage("")
      setPreview("")
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setPrice(0);
    setRating('');
    setDiscount(0);
    setQuantity(0);
    setImage('');
    setPreview(null);
    form.resetFields();
  };
  const onFinish = () => { };

  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  const handleOnChangePrice = (e) => {
    setPrice(Number(e.target.value));
  }

  const handleOnChangeRating = (e) => {
    setRating(e.target.value);
  }
  const handleOnChangeQuantity = (e) => {
    setQuantity(Number(e.target.value));
  }
  const handleOnChangeDiscount = (e) => {
    setDiscount(Number(e.target.value))

  }

  const productDto = {
    title: title,
    description: description,
    price: price,
    rating: rating,
    quantity: quantity,
    discount: discount
  }

  const handleSubmit = () => {
    ProductSevice.createProduct(image, productDto, user?.accessToken);
    handleCancel();
  }

  
 
  return (
    <div>
      <h1 className="WrapperHeaderAP">Quản Lý Sản Phẩm</h1>
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          style={{
            height: "150px",
            width: "150px",
            borderStyle: "dashed",
            fontSize: "60px",
          }}
        >
          <PlusOutlined />
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <TableComponent/>
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <InputComponent value={title} onChange={handleOnChangeTitle} name="title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <InputComponent value={description} onChange={handleOnChangeDescription} name="description" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent value={price} onChange={handleOnChangePrice} name="price" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your rating!",
              },
            ]}
          >
            <InputComponent value={rating} onChange={handleOnChangeRating} name="rating" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input your quantity!",
              },
            ]}
          >
            <InputComponent value={quantity} onChange={handleOnChangeQuantity} name="quantity" />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your discount!",
              },
            ]}
          >
            <InputComponent value={discount} onChange={handleOnChangeDiscount} name="discount" />
          </Form.Item>

          <Form.Item

            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please choose your image!",
              },
            ]}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="file" onChange={handleOnChangeAvatar} />
              {preview && (
                <img src={preview} style={{
                  marginLeft: '-32px',
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} alt='avatar' />
              )}
            </div>

          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={handleSubmit} style={{ marginLeft: '50px' }} type="primary" htmlType="submit">
              Tạo mới
            </Button>

          </Form.Item>
        </Form>
      </Modal>
     
    </div>
  );
};

export default AdminProduct;
