import React from 'react'
import axios from 'axios'
import { Button } from 'antd'


function DeleteButton(props) {

    console.log('DeleteButton props',props.CartPageHistory);

    const productDeleteHandler = (event) =>{ 
        console.log('오긴옵니다.') 
        
        axios.get(`/api/product/delete_by_id?id=${props.productId}&type=single` )
            .then(response=>{
                if(response.data.success){
                    alert('과제가 삭제 되었습니다.')
                    props.CartPageHistory.go(0)                
                    
                }else{
                    alert('과제 삭제에 실패했습니다.')
                }
            })
            
           
             

    }

    return (
        
        <Button onClick={productDeleteHandler}> 삭제 </Button>
    )
}

export default DeleteButton
