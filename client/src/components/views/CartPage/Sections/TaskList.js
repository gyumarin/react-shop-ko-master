import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from 'antd';

function TaskList(props) {

    //console.log('props',props.products)

    const [TaskInfo, setTaskInfo] = useState([])
    var TempTaskInfo = []
    useEffect(() => {
        axios.post(`/api/task/tasks`)
            .then(response => {
                //console.log('response.data.taskInfo',response.data.taskInfo)
                for (var i = 0; i < response.data.taskInfo.length; i++) {
                    if (props.products._id === response.data.taskInfo[i].productId) {
                        //console.log('true')
                        TempTaskInfo.push(response.data.taskInfo[i])
                    } else {
                        //console.log('false')
                    }

                }
                setTaskInfo(TempTaskInfo)
            })
            .catch(err => alert(err))

    }, [])



    //console.log('TaskInfo',TaskInfo[0]&&TaskInfo[0].writer.name)


    const renderItems = () => (
        TaskInfo && TaskInfo.map((task, index) => (

            <Card style={{ marginTop: '10px', marginBottom: '10px', borderRadius: '3%', borderWidth: '1', backgroundColor: 'skyblue' }}>
                <b>이름: </b> {task.writer.name}
                <br />
                <b>GITHUB 주소: </b> {task.githubURI}
                <br />
                <b>과제 내용:</b> {task.description}

            </Card>



        ))
    )



    return (
        renderItems()
    )
}

export default TaskList
