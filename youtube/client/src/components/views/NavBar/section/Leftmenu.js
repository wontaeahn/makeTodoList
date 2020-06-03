import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">메인화면</a>
    </Menu.Item>
    <Menu.Item key="Subscription">
      <a href="/Subscription">구독한 영상</a>
    </Menu.Item>
    
  </Menu>
  )
}

export default LeftMenu