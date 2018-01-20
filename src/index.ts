import { SVGPath, path } from "./svg";
import { isConst, isEvent } from "./stringValidate";
import { IObjectInfo } from "./statistics";
import { get } from "./fetch";

type API = { name: '' };
interface OriginalObject {
    object: any;
    hasPrototype?: boolean;
    descripion?: string;
    readonlys?: string[];
    events?: string[];
    fileds?: string[];
    classes?: string[];
    constants?: string[]
}

get('./data/js.json').then(value => {
    value.json().then((d:API[])=>{
                console.log('🐷');
                d.forEach(p=>{ console.log(p.name)})
    })  
})
type Filed = 'string' | 'number' | 'boolean';

function initTreeRoot(): Map<string, OriginalObject> {
    const roots = new Map<string, OriginalObject>();
    roots.set('window', new class implements OriginalObject {
        object = window
    });
    // roots.set('navigator ', navigator);
    // roots.set('screen', screen);
    // roots.set('history', history);
    // roots.set('location', location);
    // roots.set('Array', Array);
    // roots.set('Number', Number);
    return roots;
}
function SetDrawBoard(tagName: string): Node {
    let canvas: Node;
    if (document.getElementsByTagName(tagName).length > 0) {
        canvas = document.getElementsByTagName(tagName)[0]
    } else {
        canvas = document.getElementsByTagName('html')[0]
    }
    return canvas;

}
function drawAPI(canvas: Node) {

    for (const iterator of roots) {


        let spet = document.createElement('p');

        spet.innerText = `🌺 ${iterator[0]} 🌺`

        canvas.appendChild(spet);
        if (iterator[1].prototype != undefined) {
            for (const key in Object.getOwnPropertyDescriptors(iterator[1].prototype)) {

                let div = document.createElement('span');
                let filedName = document.createElement('span');
                let svg = document.createElement('embed');
                div.appendChild(svg);

                svg.width = side;
                svg.height = side;
                let type = typeof iterator[1].prototype[key];
                if (type == 'function') {
                    svg.src = path + SVGPath.Function.toString();
                } else if (type == 'object') {
                    svg.src = path + SVGPath.Class.toString();
                    if (isEvent(key)) {
                        svg.src = path + SVGPath.Event.toString();
                    }
                }
                else if (type == 'number' || type == 'string' || type == 'boolean') {
                    svg.src = path + SVGPath.Field.toString();

                }
                // else if (type == 'boolean') {
                //     svg.src = path + SVGPath.Field.toString();
                // }

                if (isConst(key)) {

                    let svgConst = document.createElement('embed');
                    svgConst.width = side;
                    svgConst.height = side;
                    svgConst.src = path + SVGPath.Constant.toString();
                    div.appendChild(svgConst);
                }


                div.appendChild(filedName);
                filedName.innerHTML = key;
                canvas.appendChild(div);
            }
        } else {
            for (const key in iterator[1]) {
                //表示含有原型属性
                let div = document.createElement('span');
                let filedName = document.createElement('span');
                let svg = document.createElement('embed');

                div.appendChild(svg);


                svg.width = side;
                svg.height = side;
                let type = typeof iterator[1][key];
                if (type == 'function') {
                    svg.src = path + SVGPath.Function.toString();
                } else if (type == 'object') {
                    svg.src = path + SVGPath.Class.toString();
                    if (isEvent(key)) {
                        svg.src = path + SVGPath.Event.toString();
                    }
                }
                else if (type == 'number' || type == 'string' || type == 'boolean') {
                    svg.src = path + SVGPath.Field.toString();

                }
                // else if (type == 'boolean') {
                //     svg.src = path + SVGPath.Field.toString();
                // }

                if (isConst(key)) {

                    let svgConst = document.createElement('embed');
                    svgConst.width = side;
                    svgConst.height = side;
                    svgConst.src = path + SVGPath.Constant.toString();
                    div.appendChild(svgConst);
                }


                div.appendChild(filedName);
                filedName.innerHTML = key;
                canvas.appendChild(div);
            }
        }


    }
}



const canvas = SetDrawBoard('body');
const roots = initTreeRoot();
const side: string = `32`;
drawAPI(canvas);










// for (const key in Object.getOwnPropertyDescriptors(Array) ) {
//     console.error(key);
// }
// console.error('😄😄😄😄')
// for (const key in Object.getOwnPropertyDescriptors(Array.prototype) ) {
//      console.error(key);
// }
// var x =[1].concat([2]);
// var z =Object.assign({name:1},{age:2});


