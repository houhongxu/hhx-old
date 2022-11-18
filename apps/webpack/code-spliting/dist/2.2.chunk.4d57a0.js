"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([[2],[
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 测试preload时引入
// setTimeout(() => {
//   import(
//     /* webpackChunkName: 'add' */
//     /* webpackPreload: true */
//     './add').then(m => {
//       console.log(m.default(3, 4))
//     })
// }, 3000000)

const sum = (...args) => args.reduce((x, y) => x + y)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sum);


/***/ })
]]);