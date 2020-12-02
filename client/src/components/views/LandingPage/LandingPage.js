import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Col, Card, Row, Carousel } from 'antd';
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { positions, deadline } from './Sections/Datas'

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

function LandingPage() {


    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        positions: [],
        deadline: []

    })




    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)




    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                        console.log(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품을 가져오는데 실패했습니다. ")
                }
            })

    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)

        setSkip(skip)


    }


    const renderCards = Products.map((product, index) => {



        const tempDeadline = product.deadline.substring(0, 10)
        // console.log('product.deadline',product.deadline)    
        var betweenDay = getToday(tempDeadline);

        if (betweenDay < 0) return;


        return <Col lg={6} md={12} xs={24} key={index}>
            <Card
                style={{ borderRadius: '10%', width: '90%', marginLeft: '3rem auto', marginRight: '3rem auto', marginBottom: '20px' }}
                cover={<a href={`/product/${product._id}`}><div style={{ width: '100%', height: '150px' }}><ImageSlider images={product.images} /></div></a>}
            >
                <Card.Meta
                    title={product.title}
                />
                <br />
                <b> {positions[product.positions - 1].name} </b>

                {betweenDay ? <p> D-{betweenDay}</p> : <p> D-day</p>}
                <span style={{ marginRight: '5px' }}>
                    {product.keywords.map((keyword, index) => (
                        <span style={{ marginRight: '5px', display: 'inline-block' }}>
                            <b key={index}>
                                #{keyword} {" "}
                            </b>
                        </span>
                    ))}
                </span>
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }


    const handleDeadline = (value) => {
        const data = deadline;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if (category === "deadline") {
            let deadlineValues = handleDeadline(filters)
            newFilters[category] = deadlineValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)

    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }


    return (
        <div style={{ width: '1100px', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2> 오늘의 과제 </h2>
            </div>

            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox list={positions} handleFilters={filters => handleFilters(filters, "positions")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={deadline} handleFilters={filters => handleFilters(filters, "deadline")} />
                </Col>


            </Row>


            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}

            <Row gutter={16, 16}>
                {renderCards}
            </Row>


            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}> 더보기 </button>
                </div>
            }

        </div>
    )
}

export default LandingPage
