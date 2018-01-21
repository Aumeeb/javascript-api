import { SVGType, path, embedSVG } from "./svg";
import { isConst, isEvent } from "./stringValidate";
import { IObjectInfo } from "./statistics";
import { Http, DataUrl } from "./fetch";

interface JsSysAPI {
    name: string
}
interface OriginalObject {
    [Prototype: string]: any;
    object: any;
    Prototype: undefined | object;
    OwnPropertyDescriptors : object;
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
                    descripion = p.name;
                    OwnPropertyDescriptors = eval(`Object.getOwnPropertyDescriptors(${p.name})`) ;
                })
            }
        )

        drawAPI(canvas, roots);
    })
})

type BaseType = "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function";

function SetDrawBoard(tagName: string): Node {
    let canvas: Node;
    if (document.getElementsByTagName(tagName).length > 0) {
        canvas = document.getElementsByTagName(tagName)[0]
    } else {
        canvas = document.getElementsByTagName('html')[0]
    }
    return canvas;

}
function drawAnObject(canvas: Node, type: BaseType, key: string) {

    let div = document.createElement('span');
    let filedName = document.createElement('span');

    if (type == 'function') {
        div.appendChild(embedSVG(SVGType.Function));
    } else if (type == 'object' && isEvent(key)) {
        div.appendChild(embedSVG(SVGType.Event));
    } else if (type == 'object') {
        div.appendChild(embedSVG(SVGType.Class));
    } else if (isConst(key)) {
        div.appendChild(embedSVG(SVGType.Constant));
    } else if (type == 'number' || type == 'string' || type == 'boolean') {
        div.appendChild(embedSVG(SVGType.Field));
    }


 


    div.appendChild(filedName);
    filedName.innerHTML = key;
    canvas.appendChild(div);
}
function drawAPI(canvas: Node, roots: Map<string, OriginalObject>) {

    for (const item of roots) {

        let spet = document.createElement('p');
        spet.innerText = `🥇 ${item["1"].descripion} Property  🥇`
        canvas.appendChild(spet);

        let originalObj = item["1"].object;

        for (const key in originalObj) {
            drawAnObject(canvas, typeof originalObj[key], key)
        }

        if (item["1"].OwnPropertyDescriptors != undefined) {
            let spet = document.createElement('p');
            spet.style.paddingLeft = '100px';
            spet.innerText = `🥈 ${item["1"].descripion} OwnPropertyDescriptors 🥈`
            canvas.appendChild(spet);

            for (const key in item["1"].OwnPropertyDescriptors) {
                drawAnObject(canvas, typeof (item["1"].OwnPropertyDescriptors as any)[key], key)
            }

        }
         
        if (item["1"].Prototype != undefined) {
            let spet = document.createElement('p');
            spet.style.paddingLeft = '200px';
            spet.innerText = `🥉 ${item["1"].descripion} Prototype OwnPropertyDescriptors 🥉`
            canvas.appendChild(spet);

            
            // for (const key in Object.getOwnPropertyDescriptors(item['1'].Prototype)) {
            //     drawAnObject(canvas, typeof (item["1"].Prototype as any)[key], key)
            // }

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