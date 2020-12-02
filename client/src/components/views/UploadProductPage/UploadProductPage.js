import React, {useState} from 'react'
import {Col, Row, Button, Form, Input, Select} from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';


//날짜
let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

let toDay = year + '-' + month + '-' + date

//
const {TextArea} = Input;

const Positions =[
    {key:1, value:"웹페이지 퍼블리싱"},
    {key:2, value:"웹 프론트 개발"},
    {key:3, value:"웹 백엔드 개발"},
    {key:4, value:"웹 풀스택 개발"},
    {key:5, value:"데이터 베이스 관리"},
    {key:6, value:"빅데이터 개발"},
    {key:7, value:"데이터 분석 및 시각화"}            
]

function UploadProductPage(props) {


    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Position, setPosition] = useState(1)
    const [Images, setImages] = useState([])
    const [Keywords, setKeywords] = useState([])
    const [Deadline, setDeadline] = useState(toDay)

    const titleChangeHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const positionsChangeHandler = (event) =>{
        setPosition(event.currentTarget.value)
    }

    
    const updateImages =(newImages) =>{
        setImages(newImages)
    }

    const keywordsChangeHandler = (value) =>{
        setKeywords(value)    
    }

    const deadlineChangeHandler = (event) =>{
        setDeadline(event.currentTarget.value)    
    }

    
    console.log(props.user.userData)
    
    const submitHandler = (event) =>{

        //submit 버튼을 눌렀을때 페이지가 refresh가 안되도록 해주는 함수
        event.preventDefault();

        //유효성 체크 - 모든칸이 체워지지 않으면 submit을 할수 없게 한다.
        if(!Title || !Description || !Deadline || !Keywords || !Position){
            return alert("모든 값을 넣어주셔야 합니다.")

            
        }

        //서버에 채운 값들을 request로 보낸다.
        
        
        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description :Description,
            price : Price,
            images: Images,
            positions: Position,
            keywords: Keywords,
            deadline: Deadline
        }

        
        Axios.post("/api/product", body)
            .then(response=>{
                if(response.data.success){
                    alert('상품 업로드에 성공 했습니다.')
                    
                    props.history.push('/')
                }else{
                    alert('상품 업로드에 실패 했습니다.')
                }
            })

    }


    return (
        <div style={{maxWidth: '700px', margin:'2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2> 과제 생성 </h2>
            </div>

            <Form onSubmit={ submitHandler }>
                {/* DropZone */}


                <FileUpload refreshFuntion={updateImages} />

                <br />
                <br />

                <Row gutter={[16, 16]}>
                    <Col lg={12} sx={24}>

                            <label > 직무 분류 </label>
                            <br />       
                            <select onChange={positionsChangeHandler} value={Position}>
            
                                {Positions.map(item =>(
                                    <option key={item.key} value={item.key}> {item.value} </option>
                                ))}
                                        
                            </select> 
                    </Col>
                    <Col lg={12} xs={24}>
                            
                        <label> 과제 마감 기한 </label>
                        <Input type="date" onChange={deadlineChangeHandler} min={toDay} value={Deadline}/>

                    </Col>


                </Row>
                                                         
                <label > 과제 이름 </label>
                <Input onChange={titleChangeHandler} value = {Title}/>
                <br />
                <br />
                <label> 설명 </label>
                <TextArea onChange={descriptionChangeHandler} value = {Description}/>
                <br />
                <br />
                <label> 키워드 추가 </label>
                <Select mode="tags" style={{ width: '100%' }} placeholder="태그할 키워드를 추가하세요" onChange={keywordsChangeHandler} value ={Keywords}>
                    {Keywords}
                </Select>
                
                <br />
                <br />
                

                
                
                <br />
                <br />
                <Button type= "submit" onClick={submitHandler}>
                    확인
                </Button>


            </Form>
           
        </div>
    )
}

export default UploadProductPage
