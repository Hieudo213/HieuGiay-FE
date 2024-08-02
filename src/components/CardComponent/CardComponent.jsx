import React from 'react'
import Meta from 'antd/lib/card/Meta'
import { Card } from 'antd'
import './CardComponent.css'
import { StarFilled } from '@ant-design/icons'
const CardComponent = ({title, rating, imageUrl, price, discount}) => {
    return (
        <Card styles={{width : "200px"}}
            hoverable
            headStyle={{width: '200px',height : "200px"}}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img style={{height:"200px", width: "200px"}} alt='demo' src={imageUrl}/>}
        >
            <div className="StyleNameProduct">
                {title}
            </div>
            <div className="WrapperReportText">
                <span style={{marginRight: '4px'}}>
                    <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span> | Đã bán 1000+</span>
            </div>
            <div className="WrapperPriceText"><span style={{marginRight: '8px'}}>{price}.000₫</span>
            <span className="WrapperDiscountText">-{discount}.000₫</span>
            </div>
            
        </Card>
    )
}

export default CardComponent
