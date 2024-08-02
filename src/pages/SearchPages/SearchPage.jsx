import React, { useEffect, useState } from 'react'
import './SearchPage.css'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const SearchPage = () => {
  const products = useSelector((state) => state?.product?.products);
  const searchText = useSelector((state) => state?.product?.search);
  const text = `Có ${products.length} Kết quả tìm kiếm của: ${searchText}`
  return (
    <div className='searchContainer'>
      <div className='searchHeading'>
        <h1 className='searchHeading-text'>{text}</h1>
      </div>
      <div className='searchResult'>
        {products.map((product) => (
          <Link to={`/product-details/${product.id}`}>
            <CardComponent
              key={product.id}
              title={product.title}
              rating={product.rating}
              imageUrl={product.imageUrl}
              price={product.price}
              discount={product.discount} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchPage