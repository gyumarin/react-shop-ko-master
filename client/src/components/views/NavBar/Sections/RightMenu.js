/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

        

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login"> 로그인 </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register"> 회원가입 </a>
        </Menu.Item>
      </Menu>
    )
  } else {
    if(user.userData && user.userData.role === 1){
      return (
        <Menu mode={props.mode}>          
            <SubMenu title={<span>{ user.userData && user.userData.name } 님</span>}>
              <Menu.Item key="upload">
                <a href="/product/upload"> 과제 생성 </a>
              </Menu.Item>
              <Menu.Item key="setting:1">
                <a href="/company/profile"> 업체 프로필 </a>  
              </Menu.Item> 
              <Menu.Item key="logout">
                <a onClick={logoutHandler}>logout</a>
              </Menu.Item>
              
            </SubMenu>
          
         
        </Menu>
      )

    }else{
      return (
        <Menu mode={props.mode}>          
            <SubMenu title={<span>{ user.userData && user.userData.name } 님</span>}>
              <Menu.Item key="setting:1">프로필</Menu.Item>
              <Menu.Item key="setting:2">회사 pick</Menu.Item>

              <Menu.Item key="cart" style={{paddingBottom : 3 }}> 
                <Badge count={user.userData && user.userData.cart.length}>
                  <a href="/user/cart" className="head-example" style={{marginRight: 10, color: '#667777'}}> 과제 pick </a>
                </Badge>
              </Menu.Item>

              <Menu.Item key="logout">
                <a onClick={logoutHandler}>logout</a>
              </Menu.Item>
              
            </SubMenu>
          
        
        </Menu>
      )
    }
  }
}

export default withRouter(RightMenu);

