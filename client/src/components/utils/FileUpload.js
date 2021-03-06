import React, {useState,useEffect} from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from "@ant-design/icons";
import axios from 'axios';
function FileUpload(props) {
    console.log("==> FileUpload rendered")

    console.log("==> FileUpload props:",props.coImage)
    

    const [Images, setImages] = useState([])
    
    


    const dropHandler = (files) =>{

        let formData = new FormData();

        const config ={
            header: { 'content-type' : 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image',formData, config)
            .then(response =>{
                if(response.data.success){
                    //스프레드 오퍼레이터(...)
                    console.log('dropHandler => ',...Images,', 새로운 패스',response.data.filePath)
                    setImages([...Images, response.data.filePath])
                    props.refreshFuntion([...Images, response.data.filePath])





                    
                }else{
                    alert('파일을 저장하는데 실패했습니다.')
                }

            })

            
    }

    const deleteHandler = (image) => {

        const currentIndex = Images.indexOf(image)

        let newImages =[...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (     
                    <div 
                        style={{ 
                            width:300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem'}} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) =>(
                    <div onClick={() => deleteHandler(image)}  key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}


            </div>
        </div>
    )
}

export default FileUpload
