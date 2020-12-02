import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./UserCardBlock.css"
import TaskList from './TaskList';
import DeleteButton from './DeleteButton'

function CompanyCardBlock(props) {


    const [Products, setProducts] = useState([])
    const [TaskInfo, setTaskInfo] = useState([])
    var tempProducts = []

    //console.log('CompanyCardBlock props',props.CartPageHistory);

    useEffect(() => {
        axios.post(`/api/task/tasks`)
            .then(response => {
                //console.log('response.data.taskInfo',response.data.taskInfo)
                setTaskInfo(response.data.taskInfo)
            })
            .catch(err => alert(err))

        axios.post('/api/product/companyPorducts', props)
            .then(response => {
                if (response.data.success) {
                    for (var i = 0; i < response.data.productInfo.length; i++) {
                        //console.log('response.data.productInfo&&response.data.productInfo[0].writer._id', response.data.productInfo&&response.data.productInfo[i].writer._id)
                        //console.log('props',props.companyId)
                        if (response.data.productInfo && response.data.productInfo[i].writer._id === props.companyId) {
                            tempProducts.push(response.data.productInfo[i])
                        }
                    }
                    //console.log('tempProducts',tempProducts)
                    setProducts(tempProducts)

                } else {
                    alert('과제 정보를 가져오지 못했습니다.')
                }
            })
    }, [])


    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    //값 넘겨주기

    const renderItems = () => (

        Products && Products.map((product, index) => (

            <tr key={index}>

                <td style={{ width: '25%' }}>
                    {<a href={`/product/${product._id}`}>
                        <img style={{ width: '100%', maxHeight: '200px' }} alt="product"
                            src={renderCartImage(product.images)} />
                    </a>}


                </td>
                <td style={{ width: '15%' }}>
                    과제명: <b>{product.title}</b>

                    <br />
                    <br />
                    마감 기한: {product.deadline.substring(0, 10)}
                </td>
                <td style={{ width: '60%' }}>
                    <TaskList products={product} userId={props.userId} />
                </td>
                <td style={{ width: '10%' }}>
                    <DeleteButton productId={product._id} CartPageHistory={props.CartPageHistory} />
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
                        <th>과제 수행 현황</th>
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

export default CompanyCardBlock
