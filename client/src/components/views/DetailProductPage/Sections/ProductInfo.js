import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import axios from 'axios';
import { useSelector } from "react-redux";


function ProductInfo(props) {

    const user = useSelector(state => state.user)

    //console.log('user', user.userData && user.userData.cart)

    const [CompanyInfo, setCompanyInfo] = useState([])
    var Nullcart = user.userData && user.userData.cart;
    var coName = "";
    var coId = "";
    var productWriter = props.detail.writer && props.detail.writer._id

    useEffect(() => {
        axios.post(`/api/company/companies`)
            .then(response => {
                setCompanyInfo(response.data.companyInfo)
                //console.log(response.data.companyInfo)
            })
            .catch(err => alert(err))

    }, [])

    //console.log(' props.detail.writer&&props.detail.writer._id', props.detail.writer&&props.detail.writer._id)



    for (var i = 0; i < CompanyInfo.length; i++) {
        //console.log(i, CompanyInfo[i]&&CompanyInfo[i])
        if (CompanyInfo[i] && CompanyInfo[i].writer._id === productWriter) {

            coName = CompanyInfo[i] && CompanyInfo[i].coName;
            coId = CompanyInfo[i] && CompanyInfo[i]._id;

        }
    }
    //console.log(coId)


    const dispatch = useDispatch();

    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어준다.

        //console.log('props.detail._id', props.detail._id)
        //console.log('item.id', Nullcart.id)
        var flag = false;
        Nullcart.map(item => {
            if (item.id === props.detail._id) {
                flag = true;
            }
        })
        if (flag) {
            alert('이미 추가된 과제입니다.')
            flag = false;
        } else {
            alert('과제 pick에 추가 되었습니다.')
        }
        dispatch(addToCart(props.detail._id))
    }

    var tempDeadline = String(props.detail.deadline).substring(0, 10)

    //console.log(props.user&&props.user.role)


    return (
        <div>
            <Descriptions title="과제 정보">
                <Descriptions.Item label="마감 기한">{tempDeadline}</Descriptions.Item>
                <Descriptions.Item label="회사명"> {coName}  </Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>


            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Row gutter={[16, 16]}>
                    <Col >
                        {/* CheckBox */}
                        <Button size="large" shape="round" type="primary">
                            <a href={`/company/${coId}`}>업체 정보</a>
                        </Button>
                    </Col>
                    <Col >
                        {/* RadioBox */}
                        {props.user&&props.user.role === 0 ?

                            <Button size="large" shape="round" type="primary" onClick={clickHandler}>
                                과제 Pick
                            
                            </Button>
                            : ''
                        }

                    </Col>


                </Row>



            </div>
        </div>
    )
}

export default ProductInfo
