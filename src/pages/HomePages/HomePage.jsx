import React, { useEffect, useState } from "react";
import './HomePage.css'
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider from '../../assets/images/slider.jpeg';
import Slider2 from '../../assets/images/Slider2.jpeg';
import slider3 from '../../assets/images/slider3.jpeg';
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as ProductService from "../../services/ProductService";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TypeCategory from "../../components/TypeProduct/TypeCategory";
import TypeBrand from "../../components/TypeProduct/TypeBrand";
import { Pagination } from "antd";
const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(0)
    const [pagination,setPagination] = useState()
    const [isPagination, setIsPagination] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/product/allProductPage', {
                    params: {
                        pageNumber: pageNumber,
                        pageSize: pageSize
                    }
                });
                setData(response?.data?.productDtos)
                setPagination(response?.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [pageSize, pageNumber]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/category/all');
                setCategories(response.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/brand/all');
                setBrands(response.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const onLoadmore = () => {
        setPageSize(8);
        setIsPagination(true)
    }
    const onChange = (page) => {
        setPageNumber(page - 1);
     }
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '1270px', margin: '0 auto' }}>
            <div className="WrapperTypeProduct">
                {categories.map((item) => {
                    return (
                        <TypeCategory id={item?.id} name={item.title} key={item} />
                    )
                })}
            </div>
            <div className="WrapperTypeProduct">
                {brands.map((item) => {
                    return (
                        <TypeBrand id={item?.id} name={item.title} key={item} />
                    )
                })}
            </div>
            <div className="body" style={{ width: '100%' }}></div>
            <div id="container" >
                <SliderComponent arrImages={[slider, Slider2, slider3]} />
                <div style={{ paddingTop: '35px' }}>
                    <h1>Các sản phẩm hot tháng này</h1>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    {data.map((card) => (
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
            </div>
            {isPagination ? (
                <Pagination
                defaultCurrent={pagination?.pageNumber}
                total={pagination?.totalPages}
                onChange={onChange}
                pageSize={pagination?.pageSize}
                style={{
                    textAlign: "center",
                    marginTop: "30px",
                }} />
            ) : (
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <ButtonComponent onClick={onLoadmore} className="WrapperButtonMore" textButton="Xem Thêm" type="outline" styleButton={{
                        border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)',
                        width: '240px', height: '38px', borderRadius: '4px'
                    }} styleTextButton={{ fontWeight: 500 }} />
                </div>
            )}
        </div>
    )
}

export default HomePage;