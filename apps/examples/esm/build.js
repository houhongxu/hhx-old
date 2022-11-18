const webpack = require('webpack')
const path = require('path')

const esm = () =>
  webpack({
    entry: path.resolve(__dirname, './index.js'),
    mode: 'none',
    output: {
      iife: false,
      clean: true,
      path: path.resolve(__dirname, 'dist'),
    },
  })

esm().run((err, stats) => {
  console.log(err ?? '---done---')
})
