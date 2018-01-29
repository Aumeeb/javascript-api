

import * as React from "react";
import { Menu, Icon, Input } from "antd";
import { ClickParam } from "../../../../node_modules/antd/lib/menu/index";
import Weather from "../weather/weather";
import { StyleAntiCollision } from "../../../tools/stylePrefix";
import { IntlProvider, FormattedMessage } from 'react-intl';
import './index.less';




const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const s = new StyleAntiCollision('header');
class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            current: 'home',
            name: 'Eric',
            unreadCount: 1000,
        }
    }

    handleClick = (e: ClickParam) => {
        if(e.key == 'home'){
            location.href='/';
        }
        this.setState({ current: e.key });
    }
    render() {

        return (
            <div className={s.suffix('header_Wrapper')}>

                <div className={s.suffix('header_nav')}>
                    <div >
                        <Weather />
                        <div className={s.suffix('nav')}>
                            <span><a href="/#/article">文章</a></span>
                        </div>

                    </div>
                    <div>
                        <Search placeholder="檢索" onSearch={value => console.log(value)} className={s.suffix('search')} />
                        <a href="/#/login">登入</a>
                        <a href="/#/register">註冊</a>
                    </div>
                </div>
                <Menu
                    style={{ lineHeight: '80px' }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="home" >
                        <Icon type="home" spin />首頁
                    </Menu.Item>
                    <Menu.Item key="mail" >
                        <Icon type="mail" spin />寫信
                    </Menu.Item>
                    <Menu.Item key="app" >
                        <Icon type="appstore" spin />功能
                   </Menu.Item>
                    <SubMenu title={<span><Icon type="setting" spin />設置</span>}>
                        <MenuItemGroup title="介面">
                            <Menu.Item key="setting:1">皮膚</Menu.Item>
                            <Menu.Item key="setting:2">糾錯</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <Icon type="github" spin />GITHUB
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;