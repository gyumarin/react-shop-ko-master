import React from 'react'
import { Descriptions } from 'antd';



function CompanyInfo(props) {

    return (
        <div>
            <Descriptions title={props.detail.coName} bordered>
                <Descriptions.Item style={{ width: '200px' }} label="회사명" span={2}> {props.detail.coName}(주)  </Descriptions.Item >
                <Descriptions.Item label="대표자명">{props.detail.ceoName}</Descriptions.Item>
                <Descriptions.Item label="사업자등록번호">{props.detail.coRegistrationNumber}</Descriptions.Item>
                <Descriptions.Item label="회사 주소" span={3}>{props.detail.coAddress} </Descriptions.Item>
                <Descriptions.Item label="회사 소개" >{props.detail.coDescription} </Descriptions.Item>


            </Descriptions>



            <br />
            <br />
            <br />

        </div>
    )
}

export default CompanyInfo
