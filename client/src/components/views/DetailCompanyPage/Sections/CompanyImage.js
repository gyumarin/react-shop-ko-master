import React from 'react'

function CompanyImage(props) {

    const renderCartImage = (images) => {
        if(images&&images.length > 0) {
            let image =images[0]
            return `http://localhost:5000/${image}`
        }
    }  
    

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ width: '300px'}} alt="product"
                     src={renderCartImage(props.detail.coImage)} />
        </div>
    )
}

export default CompanyImage
