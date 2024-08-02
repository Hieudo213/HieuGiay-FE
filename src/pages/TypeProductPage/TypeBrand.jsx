import React, { Fragment, useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row, Pagination } from 'antd'
import './TypeProduct.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
const TypeBrand = () => {
    const { id } = useParams();
    const [brand, setBrand] = useState([]);
    const [pageSize, setPageSize] = useState(8)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/product/brand', {
                    params: {
                        brandId: id,
                        pageNumber: pageNumber,
                        pageSize: pageSize
                    }
                });
                setBrand(response?.data)
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
                    <NavBarComponent title={brand?.title} description={brand?.description} />
                </Col>
                <Col span={20}>
                    <div className='WrapperProducts' >
                        {brand?.productPage?.productDtos.map((card) => (
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
                        defaultCurrent={brand?.productPage?.pageNumber}
                        total={brand?.productPage?.totalPages}
                        onChange={onChange}
                        pageSize={brand?.productPage?.pageSize}
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",
                        }} />
        </div>
    )
}

export default TypeBrand