import React, { Fragment, useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row, Pagination } from 'antd'
import './TypeProduct.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const TypeCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [pageSize, setPageSize] = useState(8)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/product/category', {
                    params: {
                        categoryId: id,
                        pageNumber: pageNumber,
                        pageSize: pageSize
                    }
                });
                setCategory(response?.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, pageNumber, pageSize])
    const onChange = (page) => {
        setPageNumber(page - 1);
     }
    return (
        <div style={{ display:'flex', flexDirection: 'column', justifyContent: 'space-between' , height: '730px', padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: "nowrap", paddingTop: '10px' }}>
                <Col span={4} className='WrapperNavbar'>
                    <NavBarComponent title={category?.title} description={category?.description} />
                </Col>
                <Col span={20}>
                    <div className='WrapperProducts' >
                        {category?.productPage?.productDtos.map((card) => (
                            <Link to={`/product-details/${card.id}`}>
                                <CardComponent
                                    key={card.id}
                                    title={card.title}
                                    rating={card.rating}
                                    imageUrl={card.imageUrl}
                                    price={card.price}
                                    discount={card.discount}
                                />
                            </Link>
                        ))}
                    </div>
                </Col>
            </Row>
            <Pagination
                defaultCurrent={category?.productPage?.pageNumber}
                total={category?.productPage?.totalPages}
                pageSize={category?.productPage?.pageSize}
                onChange={onChange}
                style={{
                    textAlign: "center",
                    marginBottom : '10px'
                }} />
        </div>
    )
}

export default TypeCategory