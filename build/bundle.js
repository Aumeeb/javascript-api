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

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const svg_1 = __webpack_require__(1);
const stringValidate_1 = __webpack_require__(2);
function initTreeRoot() {
    const roots = new Map();
    roots.set('window', new class {
        constructor() {
            this.object = window;
        }
    });
    // roots.set('navigator ', navigator);
    // roots.set('screen', screen);
    // roots.set('history', history);
    // roots.set('location', location);
    // roots.set('Array', Array);
    // roots.set('Number', Number);
    return roots;
}
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
function drawAPI(canvas) {
    for (const iterator of roots) {
        let spet = document.createElement('p');
        spet.innerText = `🌺 ${iterator[0]} 🌺`;
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
                    svg.src = svg_1.path + svg_1.SVGPath.Function.toString();
                }
                else if (type == 'object') {
                    svg.src = svg_1.path + svg_1.SVGPath.Class.toString();
                    if (stringValidate_1.isEvent(key)) {
                        svg.src = svg_1.path + svg_1.SVGPath.Event.toString();
                    }
                }
                else if (type == 'number' || type == 'string' || type == 'boolean') {
                    svg.src = svg_1.path + svg_1.SVGPath.Field.toString();
                }
                // else if (type == 'boolean') {
                //     svg.src = path + SVGPath.Field.toString();
                // }
                if (stringValidate_1.isConst(key)) {
                    let svgConst = document.createElement('embed');
                    svgConst.width = side;
                    svgConst.height = side;
                    svgConst.src = svg_1.path + svg_1.SVGPath.Constant.toString();
                    div.appendChild(svgConst);
                }
                div.appendChild(filedName);
                filedName.innerHTML = key;
                canvas.appendChild(div);
            }
        }
        else {
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
                    svg.src = svg_1.path + svg_1.SVGPath.Function.toString();
                }
                else if (type == 'object') {
                    svg.src = svg_1.path + svg_1.SVGPath.Class.toString();
                    if (stringValidate_1.isEvent(key)) {
                        svg.src = svg_1.path + svg_1.SVGPath.Event.toString();
                    }
                }
                else if (type == 'number' || type == 'string' || type == 'boolean') {
                    svg.src = svg_1.path + svg_1.SVGPath.Field.toString();
                }
                // else if (type == 'boolean') {
                //     svg.src = path + SVGPath.Field.toString();
                // }
                if (stringValidate_1.isConst(key)) {
                    let svgConst = document.createElement('embed');
                    svgConst.width = side;
                    svgConst.height = side;
                    svgConst.src = svg_1.path + svg_1.SVGPath.Constant.toString();
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
const side = `32`;
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.path = './resource/';
var SVGPath;
(function (SVGPath) {
    SVGPath["Class"] = "class.svg";
    SVGPath["CodeSegment"] = "codesegments.svg";
    SVGPath["Constant"] = "const.svg";
    SVGPath["Enum"] = "enum.svg";
    SVGPath["Field"] = "field.svg";
    SVGPath["Function"] = "function.svg";
    SVGPath["Interface"] = "interface.svg";
    SVGPath["Keyword"] = "keyword.svg";
    SVGPath["Namespace"] = "namespace.svg";
    SVGPath["Event"] = "event.svg";
})(SVGPath = exports.SVGPath || (exports.SVGPath = {}));


/***/ }),
/* 2 */
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


/***/ })
/******/ ]);