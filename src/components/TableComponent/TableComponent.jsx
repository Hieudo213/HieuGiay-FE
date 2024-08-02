import { Modal, Radio, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './TableComponent.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductSevice from '../../services/ProductService';
const TableComponent = () => {
    const [deleteId, setDeleteId] = useState(1)
    const [product1, setProduct1] = useState()
    const [title, setTitle] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [id, setId] = useState(1);
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/product/all`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setTitle(product1?.title);
    }, [product1])

    const handleDetailProduct = (id) => {
        setIsOpenDrawer(true)
        setId(id);
    };

    const handleDeleteProduct = (id) => {
        setIsModalOpen(true)
        setDeleteId(id);
       
    }

    useEffect(() => {
        if (isOpenDrawer && id) {
            axios
                .get(`http://localhost:8080/api/v1/product/${id}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isOpenDrawer, id]);

    useEffect(() => {
        if (isModalOpen && deleteId) {
            axios
                .get(`http://localhost:8080/api/v1/product/${deleteId}`)
                .then((response) => {
                    setProduct1(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isModalOpen, deleteId]);

    const onCancel = () => {
        setIsModalOpen(false)
    }

    

    const renderAction = (id) => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => handleDeleteProduct(id)}
                />
                <EditOutlined
                    style={{ color: 'rgb(26, 148, 255)', fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => handleDetailProduct(id)}
                />
            </div>
        );
    };

    const handleOnRow = (record, rowIndex) => {
        return {
            onClick: () => {
                setSelectedRow(record.id);
            }
        };
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.id - b.id
        },
        {
            title: 'Title',
            dataIndex: 'title',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.title.length - b.title.length
        },
        {
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.description.length - b.description.length
        },
        {
            title: 'Price',
            dataIndex: 'price',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.price - b.price
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.quantity - b.quantity
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            ellipsis: true,
            render: (text) => <div className="table-cell">{text}</div>,
            sorter: (a,b) => a.discount - b.discount
        },
        {
            title: 'Action',
            dataIndex: 'action',
            ellipsis: true,
            render: (_, record) => renderAction(record.id)
        },
    ];

    const data = products.map((product) => {
        return {
            key: product.id,
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            discount: product.discount,
            action: renderAction(product.id)
        };
    });


    const handleOnDelete = () => {
        ProductSevice.deleteProductById(deleteId);
        onCancel();
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                onRow={handleOnRow}
            />
            <DrawerComponent data={product} title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='90%' />
            <Modal title={`Bạn muốn xoá sản phẩm: ${title}`} open={isModalOpen} onCancel={onCancel} footer={null}>
                <ButtonComponent
                    onClick={handleOnDelete}
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
        </>
    )
}

export default TableComponent