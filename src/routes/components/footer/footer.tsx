

import * as React from "react";
import { Menu, Icon } from "antd";
import {  ClickParam} from "../../../../node_modules/antd/lib/menu/index";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Footer extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            current: 'mail',
          }
    }
  
 
    render() {
        return (
        <div>footer</div>
        );
    }
}

export default Footer;