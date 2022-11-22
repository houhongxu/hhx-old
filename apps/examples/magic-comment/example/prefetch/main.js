/******/ 	__webpack_require__.F.j = (chunkId) => {
/******/ 		if((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
/******/ 			installedChunks[chunkId] = null;
/******/ 			var link = document.createElement('link');// 创建link标签
/******/ 			if (__webpack_require__.nc) {
/******/ 				link.setAttribute("nonce", __webpack_require__.nc);
/******/ 			}
/******/ 			link.rel = "prefetch";// 配置link标签属性为prefetch
/******/ 			link.as = "script";// 正在加载的内容类型
/******/ 			link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 			document.head.appendChild(link); //把link标签放入dom，开始加载
/******/ 		}
/******/ 	};