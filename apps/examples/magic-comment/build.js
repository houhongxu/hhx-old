const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = [
  {
    name: 'preload',
    entry: path.resolve(__dirname, './index.preload.js'),
    mode: 'none',
    output: {
      filename: 'main.[id].[contenthash:6].js',
      chunkFilename: '[name].[id].chunk.[contenthash:6].js',
      iife: false,
      clean: true,
      path: path.resolve(__dirname, 'dist/preload'),
    },
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, './index.html'),
    //   }),
    // ],
  },
  {
    name: 'prefetch',
    entry: path.resolve(__dirname, './index.prefetch.js'),
    mode: 'none',
    output: {
      filename: 'main.[id].[contenthash:6].js',
      chunkFilename: '[name].[id].chunk.[contenthash:6].js',
      iife: false,
      clean: true,
      path: path.resolve(__dirname, 'dist/prefetch'),
    },
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, './index.html'),
    //   }),
    // ],
  },
]
// 1. preload 加载当前路由必需资源，优先级高
// 2. prefetch 优先级低，在浏览器 idle 状态时加载资源。一般用以加载其它路由资源，如当页面出现 Link，可 prefetch 当前 Link 的路由资源。（next.js 默认会对 link 做懒加载+prefetch，即当某条 Link 出现页面中，即自动 prefetch 该 Link 指向的路由资源

// preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。所以！！！需要在sumjs里preload导入add才产生preload（加载chunk的chunk才会preload）
// preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
// preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
// 浏览器支持程度不同。prefetch更高

const magiccomment = () => {
  return webpack(config)
}

// magiccomment().run((err, stats) => {
//   console.log(err ?? '---magic-comment---done---')
// })

exports.config = config
