import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Col, Row } from 'antd';

function DetailProductPage(props) {


    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})


    useEffect(() => {

        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
                //console.log('setProduct', setProduct)
            })
            .catch(err => alert(err))

    }, [])

    return (
        <div style={{ width: '1100px', margin: '3rem auto' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1> {Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* productInfo */}
                    <ProductInfo detail={Product} userId={props.user.userData && props.user.userData._id} user={props.user.userData} />
                </Col>

            </Row>
        </div>
    )
}

export default DetailProductPage
