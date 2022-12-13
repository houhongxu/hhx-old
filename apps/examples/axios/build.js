const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'axios',
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
}

// ! 我们请求的接口返回的是 json 结构的数据，jsonp 请求返回的是 js 文件，里面就一个callback，调用了callback，传递了数据
const axios = () => {
  return webpack(config)
}

// axios().run((err, stats) => {
//   console.log(err ?? '---code-spliting---done---')
// })

exports.config = config
