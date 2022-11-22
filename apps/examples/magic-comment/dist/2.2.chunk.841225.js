(self["webpackChunkexamples"] = self["webpackChunkexamples"] || []).push([[2],[
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { axios } = __webpack_require__(2)

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: [1, 2, 3, 4],
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: '123笑死hhh',
//   },
// })

// const date = new Date()
// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     date: date,
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: '@:$, ',
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: 'bisnull',
//     b: null,
//   },
// })

// axios({
//   method: 'get',
//   url: '/base#hash',
//   params: {
//     a: 'hash',
//   },
// })

// axios({
//   method: 'get',
//   url: '?a=1',
//   params: {
//     b: '2',
//   },
// })

// ---
axios({
  method: 'post',
  url: 'http://httpbin.org/post',
  data: {
    a: 1,
    b: 1,
  },
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: 'http://httpbin.org/post',
  data: arr,
})


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.axios = void 0;
const xhr_1 = __webpack_require__(3);
const helper_1 = __webpack_require__(4);
function axios(config) {
    processConfig(config);
    (0, xhr_1.xhr)(config);
}
exports.axios = axios;
function processConfig(config) {
    config.url = transformUrl(config);
    config.data = transformRequestData(config);
}
function transformUrl(config) {
    const { url, params } = config;
    return (0, helper_1.buildUrl)(url, params);
}
function transformRequestData(config) {
    const { data } = config;
    return (0, helper_1.transformRequest)(data);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xhr = void 0;
function xhr(config) {
    const { data = null, url, method = 'GET' } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    request.send(data);
}
exports.xhr = xhr;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(9), exports);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildUrl = void 0;
const utils_1 = __webpack_require__(6);
function buildUrl(url, params) {
    if (!params) {
        return url;
    }
    const parts = [];
    Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value === null || typeof value === 'undefined') {
            return;
        }
        let values;
        if (Array.isArray(value)) {
            values = value;
            key += '[]';
        }
        else {
            values = [value];
        }
        values.forEach((value) => {
            if ((0, utils_1.isDate)(value)) {
                value = value.toISOString();
            }
            else if ((0, utils_1.isPlainObject)(value)) {
                value = JSON.stringify(value);
            }
            parts.push(`${(0, utils_1.encode)(key)}=${(0, utils_1.encode)(value)}`);
        });
    });
    let serializedParams = parts.join('&');
    if (serializedParams) {
        const noHashParams = serializedParams.split('#')[0];
        url += (url.indexOf('?') === -1 ? '?' : '&') + noHashParams;
    }
    return url;
}
exports.buildUrl = buildUrl;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encode = void 0;
function encode(value) {
    return encodeURIComponent(value)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
exports.encode = encode;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isObjectEmpty = exports.isArrayEmpty = exports.isPlainObject = exports.isDate = void 0;
const toString = (value) => Object.prototype.toString.call(value);
function isDate(value) {
    return toString(value) === '[object Date]';
}
exports.isDate = isDate;
function isPlainObject(value) {
    return toString(value) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
const isArrayEmpty = (value) => !Array.isArray(value) || value.length === 0;
exports.isArrayEmpty = isArrayEmpty;
const isObjectEmpty = (value) => !isPlainObject(value) || (0, exports.isArrayEmpty)(Object.keys(value));
exports.isObjectEmpty = isObjectEmpty;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformRequest = void 0;
const utils_1 = __webpack_require__(6);
function transformRequest(data) {
    if ((0, utils_1.isPlainObject)(data)) {
        return JSON.stringify(data);
    }
    return data;
}
exports.transformRequest = transformRequest;


/***/ })
]]);