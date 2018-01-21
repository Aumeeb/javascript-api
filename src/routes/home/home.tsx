import * as React from "react";
import { Menu, Icon } from 'antd';
import { Http, DataUrl } from "../../tools/fetch";
import { IHomeProps, IHomeState, JsSysAPI, OriginalObject } from "./homeTypes";
import { ClickParam } from "../../../node_modules/antd/lib/menu/index";
import './index.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            data: []
        }
        Http.get(DataUrl.getJsSysAPI).then(value => {
            value.json().then((item: JsSysAPI[]) => {
                this.setState({ data: item });
            })
        })

    }

    handleClick = (e: ClickParam) => {

        var objectName = ""
        for (const item of this.state.data) {
            if (item.key.toString() == e.key) {
                objectName = item.name;
                break;
            }
        }

        if (objectName != "") {

            const roots = new Map<string, OriginalObject>();
            roots.set(objectName, new class implements OriginalObject {
                object = eval(objectName);
                Prototype = eval(`${objectName}.prototype`);
                descripion = objectName;
                OwnPropertyDescriptors = eval(`Object.getOwnPropertyDescriptors(${objectName})`);
            })
        }

    }
    render() {

        const { suffix } = this.props;
        const { data } = this.state;
        return (
            <div id={`home${suffix}`}>
                <div>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>系统对象</span></span>}>
                            {data.map(p => {
                                return <Menu.Item key={p.key}>{p.name}</Menu.Item>
                            })}

                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>关键字</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>新特性</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>

                </div>
                <div>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default Home;