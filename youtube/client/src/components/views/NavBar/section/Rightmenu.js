import React from 'react';
import {Menu,message} from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {VerticalAlignTopOutlined} from '@ant-design/icons';


function Rightmenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if(response.status === 200){
                message.success('로그아웃 성공')
                 props.history.push('/');
            } else {
                alert('로그아웃 실패')
            }
        });
    };

    if(user.userData && !user.userData.isAuth) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/login">로그인</a>
            </Menu.Item>
            <Menu.Item key="app">
                <a href="/register">회원가입</a>
            </Menu.Item>
        </Menu>
    )
} else {
    return(
        <Menu mode={props.mode}>
        <Menu.Item key="create">
                <a href="/video/upload"><VerticalAlignTopOutlined /></a>
            </Menu.Item>
        <Menu.Item key="logout">
            <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
        </Menu>
    )
  }
};


export default withRouter(Rightmenu);
