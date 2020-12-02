import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { TextArea } = Input;

function CompanyProfilePage(props) {

    const [CoName, setCoName] = useState("")
    const [CoDescription, setCoDescription] = useState("")
    const [CoRegistrationNumber, setCoRegistrationNumber] = useState("")
    const [CoImage, setCoImage] = useState("")
    const [Keywords, setKeywords] = useState([])
    const [CEOName, setCEOName] = useState("")
    const [CoAddress, setCoAddress] = useState("")
    //const [CompanyProfile, setCompanyProfile] = useState("")


    useEffect(() => {

        let Result;

        /*
                Axios.post('/api/company/companies')
                    .then(response => {
                        if (response.data.success) {
                            //console.log(response.data)
                            //setCompanyProfile(response.data.companyInfo[0])
                            console.log('response.data.companyInfo[0];', response.data.companyInfo[0])
                            Result = response.data.companyInfo[0];
        
                            if (Result) {
        
                                setCoName(Result.coName);
                                console.log('CompanyProfile.coName', Result.coName)
                                setCoDescription(Result.coDescription);
                                setCoRegistrationNumber(Result.coRegistrationNumber);
                                setKeywords(Result.keywords);
                                setCEOName(Result.ceoName);
                                setCoAddress(Result.coAddress);
                                setCoImage(Result.coImage);
                            }
                            console.log('Result', Result)
                        } else {
                            alert(" 기업 프로필 정보를 가져오는데 실패했습니다. ")
                        }
                    })
        
                console.log('Result', Result)
        
        */

    }, [])

    //console.log('CompanyProfile',CompanyProfile)

    /*
        if(CompanyProfile[0]){
            
            setCoName(CompanyProfile[0].coName);
            //console.log('CompanyProfile.coName',CompanyProfile.coName)
            setCoDescription(CompanyProfile[0].coDescription);
            setCoRegistrationNumber(CompanyProfile[0].coRegistrationNumber);
            setCoImage(CompanyProfile[0].coImage);
            setKeywords(CompanyProfile[0].keywords);
            setCEOName(CompanyProfile[0].ceoName);
            setCoAddress(CompanyProfile[0].coAddress);
        }
        */

    const coNameChangeHandler = (event) => {
        setCoName(event.currentTarget.value)

    }

    const coDescriptionChangeHandler = (event) => {
        setCoDescription(event.currentTarget.value)
    }

    const coRegistrationNumberChangeHandler = (event) => {
        setCoRegistrationNumber(event.currentTarget.value)
    }


    const updateImages = (newImage) => {
        setCoImage(newImage)
    }

    const keywordsChangeHandler = (value) => {
        setKeywords(value)
    }
    const coAddressChangeHandler = (event) => {
        setCoAddress(event.currentTarget.value)
    }

    const ceoNameChangeHandler = (event) => {
        setCEOName(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        //submit 버튼을 눌렀을때 페이지가 refresh가 안되도록 해주는 함수
        event.preventDefault();

        //서버에 채운 값들을 request로 보낸다.


        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,                //기업 유저 아이디
            ceoName: CEOName,                               //대표자명
            coName: CoName,                                 //업체 이름
            coDescription: CoDescription,                   //기업 소개
            coAddress: CoAddress,                          //기업 주소
            coImage: CoImage,                               //기업 대표 이미지
            coRegistrationNumber: CoRegistrationNumber,    //사업자 등록 번호
            keywords: Keywords                              //키워드 등록
        }

        Axios.post("/api/company", body)
            .then(response => {
                if (response.data.success) {
                    alert('기업 프로필 등록을 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('기업 프로필 등록에 실패 했습니다.')
                }
            })


    }





    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 업체 프로필 설정 </h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}

                <FileUpload refreshFuntion={updateImages} />

                <div style={{ marginBottom: '15px', marginTop: '30px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ margin: '10px', fontSize: '15px' }}> 업체 이름 </label>
                    </div>
                    <Input onChange={coNameChangeHandler} value={CoName} />
                </div>


                <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ margin: '10px', fontSize: '15px' }}> 대표자명 </label>
                    </div>
                    <Input onChange={ceoNameChangeHandler} value={CEOName} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ margin: '10px', fontSize: '15px' }}> 기업 주소 </label>
                    </div>
                    <Input onChange={coAddressChangeHandler} value={CoAddress} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ margin: '10px', fontSize: '15px' }}> 사업자등록번호 </label>
                    </div>
                    <Input onChange={coRegistrationNumberChangeHandler} value={CoRegistrationNumber} />

                </div>

                <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ margin: '10px', fontSize: '15px' }}> 업체 소개 </label>
                    </div>
                    <TextArea onChange={coDescriptionChangeHandler} value={CoDescription} />
                </div>



















                <label style={{ margin: '10px', fontSize: '15px' }}> 키워드 추가 </label>
                <Select mode="tags" style={{ width: '100%' }} placeholder="태그할 키워드를 추가하세요" onChange={keywordsChangeHandler} value={Keywords}>
                    {Keywords}
                </Select>

                <br />
                <br />

                <Button type="button" onClick={submitHandler}>
                    확인
                </Button>



            </Form>

        </div>


    )



}

export default CompanyProfilePage
