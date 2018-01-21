/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function webpackMissingModule() { throw new Error("Cannot find module \"0v\""); }());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const svg_1 = __webpack_require__(2);
const stringValidate_1 = __webpack_require__(3);
const fetch_1 = __webpack_require__(4);
fetch_1.Http.get(fetch_1.DataUrl.getJsSysAPI).then((value) => {
    value.json().then((api) => {
        const canvas = SetDrawBoard('body');
        const side = `32`;
        const roots = new Map();
        api.forEach(p => {
            roots.set(p.name, new class {
                constructor() {
                    this.object = eval(p.name);
                    this.Prototype = eval(`${p.name}.prototype`);
                    this.descripion = p.name;
                    this.OwnPropertyDescriptors = eval(`Object.getOwnPropertyDescriptors(${p.name})`);
                }
            });
        });
        drawAPI(canvas, roots);
    });
});
function SetDrawBoard(tagName) {
    let canvas;
    if (document.getElementsByTagName(tagName).length > 0) {
        canvas = document.getElementsByTagName(tagName)[0];
    }
    else {
        canvas = document.getElementsByTagName('html')[0];
    }
    return canvas;
}
function drawAnObject(canvas, type, key) {
    let div = document.createElement('span');
    let filedName = document.createElement('span');
    if (type == 'function') {
        div.appendChild(svg_1.embedSVG(svg_1.SVGType.Function));
    }
    else if (type == 'object' && stringValidate_1.isEvent(key)) {
        div.appendChild(svg_1.embedSVG(svg_1.SVGType.Event));
    }
    else if (type == 'object') {
        div.appendChild(svg_1.embedSVG(svg_1.SVGType.Class));
    }
    else if (stringValidate_1.isConst(key)) {
        div.appendChild(svg_1.embedSVG(svg_1.SVGType.Constant));
    }
    else if (type == 'number' || type == 'string' || type == 'boolean') {
        div.appendChild(svg_1.embedSVG(svg_1.SVGType.Field));
    }
    div.appendChild(filedName);
    filedName.innerHTML = key;
    canvas.appendChild(div);
}
function drawAPI(canvas, roots) {
    for (const item of roots) {
        let spet = document.createElement('p');
        spet.innerText = `🥇 ${item["1"].descripion} Property  🥇`;
        canvas.appendChild(spet);
        let originalObj = item["1"].object;
        for (const key in originalObj) {
            drawAnObject(canvas, typeof originalObj[key], key);
        }
        if (item["1"].OwnPropertyDescriptors != undefined) {
            let spet = document.createElement('p');
            spet.style.paddingLeft = '100px';
            spet.innerText = `🥈 ${item["1"].descripion} OwnPropertyDescriptors 🥈`;
            canvas.appendChild(spet);
            for (const key in item["1"].OwnPropertyDescriptors) {
                drawAnObject(canvas, typeof item["1"].OwnPropertyDescriptors[key], key);
            }
        }
        if (item["1"].Prototype != undefined) {
            let spet = document.createElement('p');
            spet.style.paddingLeft = '200px';
            spet.innerText = `🥉 ${item["1"].descripion} Prototype OwnPropertyDescriptors 🥉`;
            canvas.appendChild(spet);
            for (const key in Object.getOwnPropertyDescriptors(item['1'].Prototype)) {
                drawAnObject(canvas, typeof item["1"].Prototype[key], key);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.path = './resource/';
var SVGType;
(function (SVGType) {
    SVGType["Class"] = "class.svg";
    SVGType["CodeSegment"] = "codesegments.svg";
    SVGType["Constant"] = "const.svg";
    SVGType["Enum"] = "enum.svg";
    SVGType["Field"] = "field.svg";
    SVGType["Function"] = "function.svg";
    SVGType["Interface"] = "interface.svg";
    SVGType["Keyword"] = "keyword.svg";
    SVGType["Namespace"] = "namespace.svg";
    SVGType["Event"] = "event.svg";
})(SVGType = exports.SVGType || (exports.SVGType = {}));
/** SVG  width&height px*/
const side = '32';
function embedSVG(type) {
    let embed = document.createElement('embed');
    embed.width = side;
    embed.height = side;
    embed.src = exports.path + type;
    return embed;
}
exports.embedSVG = embedSVG;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isConst(str) {
    if (/^[A-Z]+$/.test(str)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isConst = isConst;
function isEvent(str) {
    return str.substr(0, 2) == 'on' ? true : false;
}
exports.isEvent = isEvent;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Http {
    static get(path) {
        return fetch(path);
    }
}
exports.Http = Http;
class DataUrl {
}
DataUrl.getJsSysAPI = './data/js.json';
exports.DataUrl = DataUrl;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map