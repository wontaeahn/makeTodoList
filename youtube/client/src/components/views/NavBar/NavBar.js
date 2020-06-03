import React, { useState } from 'react'
import './section/Navbar.css';
import Leftmenu from './section/Leftmenu';
import Rightmenu from './section/Rightmenu';
import { Drawer, Button } from 'antd';
import {AlignRightOutlined,YoutubeOutlined} from '@ant-design/icons';
function NavBar() {

    const [visible, setvisible] = useState(false)

    const showDrawer = () => {
        setvisible(true)
    };

    const onClose = () => {
        setvisible(false)
    };

    return (
        <nav className="menu" style={{ position: 'fixed',zIndex: 5, width:'100%'}}>
            <div className="menu__logo">
                <a href="/">Logo<YoutubeOutlined /></a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <Leftmenu mode="horizontal"/>
                </div>
                <div className="menu_right">
                    <Rightmenu mode="horizontal"/>
                </div>
                <Button
                className="menu__mobile-button"
                type="primary"
                onClick={showDrawer}>
                    <AlignRightOutlined />
                </Button>
                <Drawer
                title="Basic Drawer"
                placement="right"
                className="menu_drawer"
                closable={false}
                onClose={onClose}
                visible={visible}
                >
                    <Leftmenu mode="inline" />
                    <Rightmenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    )
}

export default NavBar


