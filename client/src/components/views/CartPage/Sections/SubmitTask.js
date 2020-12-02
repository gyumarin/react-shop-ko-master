import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import Axios from 'axios';

function SubmitTask(props) {
    const { TextArea } = Input;

    const [Description, setDescription] = useState("")
    const [GithubURI, setGithubURI] = useState("")

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const GithubURIChangeHandler = (event) => {
        setGithubURI(event.currentTarget.value)
    }

    console.log('props', props.products)

    const submitHandler = (event) => {

        //submit 버튼을 눌렀을때 페이지가 refresh가 안되도록 해주는 함수
        event.preventDefault();

        //유효성 체크 - 모든칸이 체워지지 않으면 submit을 할수 없게 한다.
        if (!Description || !GithubURI) {
            return alert("모든 값을 넣어주셔야 합니다.")


        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID
            writer: props.userId,
            productId: props.products._id,
            description: Description,
            githubURI: GithubURI,
        }



        Axios.post("/api/task", body)
            .then(response => {
                if (response.data.success) {
                    alert('과제 제출이 완료됐습니다.')
                } else {
                    alert('과제 제출에 실패 했습니다.')
                }
            })

    }
    //console.log('props.products',props.products)
    return (
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <Form onSubmit={submitHandler}>

                <label > github 링크  </label>
                <Input onChange={GithubURIChangeHandler} value={GithubURI} style={{ marginBottom: '15px' }} />

                <label> 설명 </label>
                <TextArea onChange={descriptionChangeHandler} value={Description} style={{ marginBottom: '15px' }} />
                <Button type="submit" onClick={submitHandler} >
                    제출
                </Button>



            </Form>
        </div >
    )
}

export default SubmitTask
