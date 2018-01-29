import * as React from "react";
import { Menu, Icon } from 'antd';
import { take, DataUrl } from "../../data/fetch";
import { drawAPI, BaseType } from "../../tools/drawing";
import { embedSVG, SVGType, SVGSrc } from "../../tools/svg";
import { isConst, isEvent } from "../../tools/stringValidate";
import { IHomeProps, IHomeState, JsSysAPI, KeywordData, OriginalObject } from "./homeTypes";
import { ClickParam } from "../../../node_modules/antd/lib/menu/index";
import { StyleAntiCollision } from "../../tools/stylePrefix";

import './index.less';





const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const side = '32';

const s = new StyleAntiCollision('Xhome');
class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            data: [],
            keywordData: [],
            currentObject: undefined
        }

        take<JsSysAPI[]>(DataUrl.JsSysAPIAddress).then(d => {
            this.setState({ data: d });
        })
        take<KeywordData[]>(DataUrl.keywordsAddress).then(d => {
            this.setState({ keywordData: d });
        })
    }

    createProperty = (oo: OriginalObject | undefined) => {

        var Properties = [];

        if (oo != undefined) {
            for (const key in oo.object) {
                let svg = this.drawAnObject(typeof oo.object[key], key);
                Properties.push(
                    <div key={key}>
                        {svg}
                        <span className={s.suffix('propertyName')}>{key}</span>
                    </div>
                )
            }
        }

        return Properties;
    }
    drawAnObject = (type: BaseType, key: string) => {

        let svgSrc = "";
        if (type == 'function') {
            svgSrc = SVGSrc(SVGType.Function)
        } else if (type == 'object' && isEvent(key)) {
            svgSrc = SVGSrc(SVGType.Event)
        } else if (type == 'object') {
            svgSrc = SVGSrc(SVGType.Class)
        } else if (isConst(key)) {
            svgSrc = SVGSrc(SVGType.Constant)
        } else if (type == 'number' || type == 'string' || type == 'boolean') {
            svgSrc = SVGSrc(SVGType.Field)
        }
        return <embed className={s.suffix('propertyTitle')} src={svgSrc} width={side} height={side}></embed>;
    }

    handleClick = (e: ClickParam) => {
        if (e.keyPath[1] == 'keywords') {
            return;
        }
        var objectName = ""
        for (const item of this.state.data) {
            if (item.key.toString() == e.key) {
                objectName = item.name;
                break;
            }
        }

        if (objectName != "") {

            //     const roots = new Map<string, OriginalObject>();
            var obj = new class implements OriginalObject {
                object = eval(objectName);
                Prototype = eval(`${objectName}.prototype`);
                descripion = objectName;
                OwnPropertyDescriptors = eval(`Object.getOwnPropertyDescriptors(${objectName})`);
            }

            this.setState({ currentObject: obj })
        }
    }
    render() {

        const { data, currentObject, keywordData } = this.state;
        return (
            <div id={s.suffix('home')}>
                <div>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline">
                        <SubMenu key="sub1" title={<span><Icon type="setting" spin /><span>系統變量</span></span>}>
                            {data.map(p => {
                                return <Menu.Item key={p.key}>{p.name}</Menu.Item>
                            })}

                        </SubMenu>
                        <SubMenu key="keywords" title={<span><Icon type="database"  spin /><span>保留字</span></span>}>
                            {keywordData.map(p => {
                                return <Menu.Item key={p.key}>{p.name}</Menu.Item>
                            })}


                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="star-o" spin /><span>新しい特性</span></span>}>
                            <Menu.Item key="9">@</Menu.Item>

                        </SubMenu>
                    </Menu>

                </div>
                <div>
                    <p className={s.suffix('propertyTitle')}>{currentObject != undefined ? `🥇 ${currentObject.descripion} Property  ` : `🥇 loading data `}</p>
                    {this.createProperty(currentObject)}
                </div>
            </div>
        );
    }
}

export default Home;