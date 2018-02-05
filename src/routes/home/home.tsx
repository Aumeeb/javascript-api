import * as React from "react";
import { Menu, Icon } from 'antd';
import { take, infiniteTake, DataUrl } from "../../data/fetch";
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

const s = new StyleAntiCollision('home');
class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            data: [],
            keywordData: [],
            currentObject: undefined
        }

        infiniteTake<JsSysAPI[], KeywordData[]>(
            DataUrl.JsSysAPIAddress,
            DataUrl.keywordsAddress, ).then(d => {
                this.setState({ data: d.first });
                this.setState({ keywordData: d.second });
            })


    }
    /** 创建属性  forin */
    createForInProperty = (oo: OriginalObject | undefined) => {

        var Properties = [];

        if (oo != undefined) {
            for (const key in oo.object) {
                let svg = this.drawAnObject(typeof oo.object[key], key);
                Properties.push(this.createRow(svg, key))
            }
        }
        return Properties;
    }
    /**创建自身属性 ,不包含prototype里的属性 */
    createOwnProperty = (oo: OriginalObject | undefined) => {

        var Properties = [];

        if (oo != undefined) {
            for (const key in oo.OwnPropertyDescriptors) {
                try {
                    const typeName = eval(`typeof ${oo.name}.${key}`);
                    let svg = this.drawAnObject(typeName, key);
                    Properties.push(this.createRow(svg, key))
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return Properties;
    }
    /**创建原型属性  */
    createPrototypeProperty = (oo: OriginalObject | undefined) => {
        var Properties = [];

        if (oo != undefined && oo.Prototype != undefined) {

            for (const key in oo.Prototype) {
                try {
                    const typeName = eval(`typeof ${oo.name}.prototype.${key}`);
                    let svg = this.drawAnObject(typeName, key);
                    Properties.push(this.createRow(svg, key))
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return Properties;
    }
    /**创建元素的每一个 */
    createRow = (icon: JSX.Element, key: string) => {
        return <div key={key} className={s.suffix('eleIndent')}>
            {icon}
            <span className={s.suffix('propertyName')}>{key}</span>
        </div>
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
        if (e.keyPath[1] == 'keywords') { //保留字
            return;
        }
        //选中一个属性 从集合中判断是否存在 ,
        var objectName = ""
        for (const item of this.state.data) {
            if (item.key.toString() == e.key) {
                objectName = item.name;
                break;
            }
        }

        //如果存在的话..
        if (objectName != "") {
            var tryOwnPropertyDescriptors: any = null;
            var tryPrototype: any = null;
            try {
                tryOwnPropertyDescriptors = eval(`Object.getOwnPropertyDescriptors(${objectName})`);
            } catch (error) {
                tryOwnPropertyDescriptors = undefined;
            }

            try {
                tryPrototype = eval(`Object.getOwnPropertyDescriptors(${objectName}.prototype)`);
            } catch (error) {
                tryPrototype = undefined;
            }

            var obj = new class implements OriginalObject {
                object = eval(objectName);
                Prototype = tryPrototype;
                name = objectName;
                OwnPropertyDescriptors = tryOwnPropertyDescriptors
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
                        <SubMenu key="keywords" title={<span><Icon type="database" spin /><span>保留字</span></span>}>
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
                    <p className={s.suffix('bigPropertyTitle')}>{currentObject != undefined ? `🥇 ${currentObject.name} Properties 🥇` : `🥇 loading data `}</p>
                    {this.createForInProperty(currentObject)}

                    <p className={s.suffix('bigPropertyTitle')}>{currentObject != undefined ? `🥈 ${currentObject.name} OwnProperies 🥈` : `🥈 loading data `}</p>
                    {this.createOwnProperty(currentObject)}

                    <p className={s.suffix('bigPropertyTitle')}>{currentObject != undefined ? `🥉 ${currentObject.name} Impelements Properties 🥉` : `🥉 loading data `}</p>
                    {this.createPrototypeProperty(currentObject)}
                </div>
            </div>
        );
    }
}

export default Home;