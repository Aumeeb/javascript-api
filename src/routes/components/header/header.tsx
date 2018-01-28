

import * as React from "react";
import { Menu, Icon } from "antd";
import { ClickParam } from "../../../../node_modules/antd/lib/menu/index";
import Weather from "../weather/weather";
import { StyleAntiCollision } from "../../../tools/stylePrefix";
import { IntlProvider, FormattedMessage } from 'react-intl';
import './index.less';





const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const s = new StyleAntiCollision('header');
class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            current: 'mail',
            name: 'Eric',
            unreadCount: 1000,
        }
    }

    handleClick = (e: ClickParam) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        const { name, unreadCount } = this.state;
        return (
            <div>
                <div className={s.suffix('header_nav')}>
                    <div>
                        <Weather />
                    </div>
                    <div>
                        <a href="/#/login">註冊</a>
                        <a href="/#/register">登入</a>
                    </div>
                </div>
                <Menu
                    style={{ lineHeight: '80px' }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="mail" >
                        <Icon type="mail" />手紙を書く
                    </Menu.Item>
                    <Menu.Item key="app" >
                        <Icon type="appstore" />ナビゲーション
                   </Menu.Item>
                    <SubMenu title={<span><Icon type="setting" />メニュー</span>}>
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