

import * as React from "react";
import { Menu, Icon } from "antd";
import { ClickParam } from "../../../../node_modules/antd/lib/menu/index";
import Weather from "../weather/weather";
import { StyleAntiCollision } from "../../../tools/stylePrefix";

import './index.less';
import { $img } from "../../../tools/config";




const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const s= new StyleAntiCollision('header');
class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
         
        this.state = {
            current: 'mail',
        }
    }

    handleClick = (e: ClickParam) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div>
                <div  className={s.suffix('header_nav')}>
                    <Weather />
                    <a href="./login">注册</a>
                    <a href="./register">登陆</a>
                </div>
                <Menu
                    style={{ lineHeight: '80px' }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="mail" >
                        <Icon type="mail" />写信
                    </Menu.Item>
                    <Menu.Item key="app" >
                        <Icon type="appstore" />导航
                   </Menu.Item>
                    <SubMenu title={<span><Icon type="setting" />菜单</span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="setting:1">API</Menu.Item>
                            <Menu.Item key="setting:2">报错</Menu.Item>
                        </MenuItemGroup>

                    </SubMenu>
                    <Menu.Item key="alipay">
                        <Icon type="github" />GITHUB
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;