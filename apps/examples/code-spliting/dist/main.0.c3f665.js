(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([[0],[
/* 0 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 测试hash时引入
// import _ from 'lodash'
// console.log(_.get)

__webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(__webpack_require__, 1)).then((m) => {
  console.log(m.default(3, 4))
})

// 第二次 import() 时不会再次加载 chunk
// import("./sum").then((m) => {
//   console.log(m.default(3, 4));
// });


/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(0));
/******/ }
]);