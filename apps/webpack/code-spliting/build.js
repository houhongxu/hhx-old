const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

// 如何正确地分包？
//
// 1. webpack 运行时代码不容易变更，需要单独抽离出来  webpack.runtime.js
// 2. React 运行时代吗不容易变更，且每个组件都会依赖它，需要单独抽离出来 react.runtime.js
//
// 第三方库如何分包？
// 1. 一个模块被引用多次 (2次以上)，可称为公共模块，可把公共模块给抽离出来，形成 vendor.js
//
// 如果一个模块被用了多次 (2次以上)，但是该模块体积过大(1MB)，每个页面都会加载它(但是无必要，因为不是每个页面都依赖它)，导致性能变差，此时如何分包？
// 1. 如果一个模块虽是公共模块，但是该模块体积过大，可直接 import() 引入，异步加载，单独分包，比如 echarts
//
// 如果公共模块数量多，导致 vendor.js 体积过大(1MB)，每个页面都会加载它，导致性能变差，此时如何分包
// 1. 思路一: 可对 vendor.js 改变策略，比如被引用了十次以上，被当做公共模块抽离成 verdor-A.js，五次的抽离为 vendor-B.js，两次的抽离为 vendor-C.js
// 2. 思路二: 控制 vendor.js 的体积，当大于 100KB 时，再次进行分包，多分几个 vendor-XXX.js，但每个 vendor.js 都不超过 100KB
// 3. 思路三: ......

// ! 我们请求的接口返回的是 json 结构的数据，jsonp 请求返回的是 js 文件，里面就一个callback，调用了callback，传递了数据
const codesplit = () => {
  return webpack({
    entry: path.resolve(__dirname, './index.js'),
    mode: 'none',
    output: {
      filename: '[name].[id].[contenthash:6].js',
      chunkFilename: '[name].[id].chunk.[contenthash:6].js',
      iife: false,
      clean: true,
      path: path.resolve(__dirname, 'dist'),

      // chunkLoading: 'import', // 默认为'jsonp'
      // chunkFormat: 'module', // 默认为'array-push'
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      // moduleIds: 'deterministic',
      // chunkIds: 'deterministic',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
      }),
    ],
  })
}

// 1. preload 加载当前路由必需资源，优先级高
// 2. prefetch 优先级低，在浏览器 idle 状态时加载资源。一般用以加载其它路由资源，如当页面出现 Link，可 prefetch 当前 Link 的路由资源。（next.js 默认会对 link 做懒加载+prefetch，即当某条 Link 出现页面中，即自动 prefetch 该 Link 指向的路由资源

// preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。所以！！！需要在sumjs里preload导入add才产生preload（加载chunk的chunk才会preload）
// preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
// preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
// 浏览器支持程度不同。prefetch更高

const magiccomment = () => {
  return webpack([
    {
      entry: path.resolve(__dirname, './index.preload.js'),
      mode: 'none',
      output: {
        filename: 'main.[id].[contenthash:6].js',
        chunkFilename: '[name].[id].chunk.[contenthash:6].js',
        iife: false,
        clean: true,
        path: path.resolve(__dirname, 'dist/preload'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
        }),
      ],
    },
    {
      entry: path.resolve(__dirname, './index.prefetch.js'),
      mode: 'none',
      output: {
        filename: 'main.[id].[contenthash:6].js',
        chunkFilename: '[name].[id].chunk.[contenthash:6].js',
        iife: false,
        clean: true,
        path: path.resolve(__dirname, 'dist/prefetch'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
        }),
      ],
    },
  ])
}

codesplit().run((err, stats) => {
  console.log(err ?? '---done---')
})
