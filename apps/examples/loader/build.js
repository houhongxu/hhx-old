const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'loader',
  mode: 'none',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    clean: true,
    iife: false,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        use: path.resolve(__dirname, './json-loader.js'),
        test: /\.json3$/,
      },
      {
        use: path.resolve(__dirname, './removeLogLoader.js'),
        test: /\.js$/,
      },
    ],
  },
}

const loader = () => webpack(config)

// loader().run((err, stats) => {
//   console.log(err ?? '---loader---done---')
// })

exports.config = config
