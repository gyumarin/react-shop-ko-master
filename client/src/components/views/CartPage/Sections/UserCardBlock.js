import React, { useState } from 'react'
import Axios from 'axios';
import "./UserCardBlock.css"
import { Col, Row, Button, Form, Input, Select } from 'antd';
import SubmitTask from './SubmitTask';

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    //console.log('props', props)
    const renderItems = () => (

        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td style={{ width: '25%', textAlign: 'center' }}>
                    {<a href={`/product/${product._id}`}>
                        <img style={{ width: '100%' }} alt="product"
                            src={renderCartImage(product.images)} />
                    </a>}


                </td>
                <td style={{ width: '25%', fontSize: '17px' }}>
                    과제명:<br /> <b style={{ width: '25%', fontSize: '20px' }}>{product.title}</b>
                    <br />
                    <br />
                    마감 기한: {product.deadline.substring(0, 10)}
                </td>
                <td style={{ width: '50%' }}>
                    <SubmitTask products={product} userId={props.userId} />
                </td>
                <td style={{ width: '10%' }}>
                    <Button onClick={() => props.removeItem(product._id)}>
                        Remove
                    </Button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>과제 정보</th>
                        <th>과제 제출</th>
                        <th>과제 삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
