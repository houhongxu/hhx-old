const webpack = require('webpack')
const path = require('path')

const loader = () =>
  webpack({
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
          use: './json-loader.js',
          test: /\.json3$/,
        },
        {
          use: './removeLogLoader.js',
          test: /\.js$/,
        },
      ],
    },
  })

loader().run((err, stats) => {
  console.log(err ?? '---loader---done---')
})
