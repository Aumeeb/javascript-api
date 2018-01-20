import { SVGType, path, embedSVG } from "./svg";
import { isConst, isEvent } from "./stringValidate";
import { IObjectInfo } from "./statistics";
import { Http, DataUrl } from "./fetch";

interface JsSysAPI {
    name: string
}
interface OriginalObject {
    object: any;
    Prototype: undefined | object;
    descripion?: string;
    readonlys?: string[];
    events?: string[];
    fileds?: string[];
    classes?: string[];
    constants?: string[]
}


Http.get(DataUrl.getJsSysAPI).then((value: Response) => {
    value.json().then((api: JsSysAPI[]) => {

        const canvas = SetDrawBoard('body');
        const side: string = `32`;


        const roots = new Map<string, OriginalObject>();
        api.forEach(
            p => {
                roots.set(p.name, new class implements OriginalObject {
                    object = eval(p.name);
                    Prototype = eval(`${p.name}.prototype`);
                    descripion = p.name
                })
            }
        )

        drawAPI(canvas, roots);
    })
})
type Filed = 'string' | 'number' | 'boolean';


function SetDrawBoard(tagName: string): Node {
    let canvas: Node;
    if (document.getElementsByTagName(tagName).length > 0) {
        canvas = document.getElementsByTagName(tagName)[0]
    } else {
        canvas = document.getElementsByTagName('html')[0]
    }
    return canvas;

}
function drawAPI(canvas: Node, roots: Map<string, OriginalObject>) {

    for (const item of roots) {

        let spet = document.createElement('p');

        spet.innerText = `🌺 ${item["1"].descripion} 🌺`

        canvas.appendChild(spet);

        if (item["1"].Prototype != undefined) {
            // for (const key in Object.getOwnPropertyDescriptors(iterator['1'].Prototype)) {

            //     let div = document.createElement('span');
            //     let filedName = document.createElement('span');
            //     let svg = document.createElement('embed');
            //     div.appendChild(svg);

            //     svg.width = side;
            //     svg.height = side;
            //     let type = typeof iterator[1].prototype[key];
            //     if (type == 'function') {
            //         svg.src = path + SVGPath.Function.toString();
            //     } else if (type == 'object') {
            //         svg.src = path + SVGPath.Class.toString();
            //         if (isEvent(key)) {
            //             svg.src = path + SVGPath.Event.toString();
            //         }
            //     }
            //     else if (type == 'number' || type == 'string' || type == 'boolean') {
            //         svg.src = path + SVGPath.Field.toString();

            //     }
            //     // else if (type == 'boolean') {
            //     //     svg.src = path + SVGPath.Field.toString();
            //     // }

            //     if (isConst(key)) {

            //         let svgConst = document.createElement('embed');
            //         svgConst.width = side;
            //         svgConst.height = side;
            //         svgConst.src = path + SVGPath.Constant.toString();
            //         div.appendChild(svgConst);
            //     }


            //     div.appendChild(filedName);
            //     filedName.innerHTML = key;
            //     canvas.appendChild(div);
            // }
        } else {

            let originalObj = item[1].object
            for (const key in originalObj) {

                let div = document.createElement('span');
                let filedName = document.createElement('span');


                let type = typeof originalObj[key];


                if (type == 'function') {
                    div.appendChild(embedSVG(SVGType.Function));
                } else if (type == 'object' && isEvent(key)) {
                    div.appendChild(embedSVG(SVGType.Event));
                } else if (type == 'object') {
                    div.appendChild(embedSVG(SVGType.Class));
                } else if (type == 'number' || type == 'string' || type == 'boolean') {
                    div.appendChild(embedSVG(SVGType.Field));
                }

                if (isConst(key)) {
                    
                    div.appendChild(embedSVG(SVGType.Constant));
                }

                div.appendChild(filedName);
                filedName.innerHTML = key;
                canvas.appendChild(div);
            }
        }


    }
}













// for (const key in Object.getOwnPropertyDescriptors(Array) ) {
//     console.error(key);
// }
// console.error('😄😄😄😄')
// for (const key in Object.getOwnPropertyDescriptors(Array.prototype) ) {
//      console.error(key);
// }
// var x =[1].concat([2]);
// var z =Object.assign({name:1},{age:2});


