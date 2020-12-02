import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row, Card } from 'antd';
import CompanyImage from './Sections/CompanyImage';
import CompanyInfo from './Sections/CompanyInfo';
import ImageSlider from '../../utils/ImageSlider';
import { positions, price, deadline } from '../../views/LandingPage/Sections/Datas'

function getToday(equalsDay) {
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    if (mm < 10)
        mm = "0" + mm;
    if (dd < 10)
        dd = "0" + dd;

    var today = [yyyy, mm, dd]

    var dateString = equalsDay;
    var dateArray = dateString.split("-");
    var dateObj = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);
    var dateTodayObj = new Date(today[0], Number(today[1]) - 1, today[2]);
    var betweenDay = ((dateObj.getTime() - dateTodayObj.getTime()) / 1000 / 60 / 60 / 24);

    return betweenDay;
}


function DetailCompanyPage(props) {

    const companyId = props.match.params.companyId
    const [Company, setCompany] = useState([])
    const [Products, setProducts] = useState([])

    //console.log(props.match.params.companyId)






    useEffect(() => {

        axios.get(`/api/company/companies_by_id?id=${companyId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    setCompany(response.data.company[0])
                    console.log('response.data.company[0]', response.data.company)
                } else {
                    alert('상세 정보를 가져오지 못했습니다.')
                }
            })

        axios.post('/api/product/companyPorducts', companyId)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                    console.log('response.data.productInfo', response.data.productInfo)
                } else {
                    alert('과제 정보를 가져오지 못했습니다.')
                }
            })

    }, [])


    var companyWriter = Company.writer && Company.writer._id


    const renderCards = Products.map((product, index) => {

        const tempDeadline = product.deadline.substring(0, 10)
        // console.log('product.deadline',product.deadline)    
        var betweenDay = getToday(tempDeadline);

        if (Products[index] && Products[index].writer._id !== companyWriter) {
            return;
        }

        if (betweenDay < 0) return;




        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                style={{ borderRadius: '10%', marginBottom: '20px' }}
                cover={<a href={`/product/${product._id}`}><div style={{ width: '100%', height: '150px' }}><ImageSlider images={product.images} /></div></a>}
            >
                <Card.Meta
                    title={product.title}
                />
                <br />
                <b> {positions[product.positions - 1].name} </b>

                {betweenDay ? <p> D-{betweenDay}</p> : <p> D-day</p>}
                {product.keywords.map((keyword, index) => (
                    <b key={index}>
                        #{keyword} {" "}
                    </b>

                ))}
            </Card>
        </Col>
    })






    return (
        <div style={{ width: '1100px', margin: '3rem auto' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col lg={8} sm={16}>
                    <br />
                    <br />
                    {/* ProductImage */}
                    <CompanyImage style={{ alignItems: 'center' }} detail={Company} />
                </Col>
                <Col lg={16} sm={32}>
                    {/* productInfo */}
                    <CompanyInfo detail={Company} />
                </Col>

            </Row>
            <br /><br /><br />
            <h2> 업체 과제 목록 </h2>
            {/* renderCards */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>





        </div>
    )
}

export default DetailCompanyPage
