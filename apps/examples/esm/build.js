const webpack = require('webpack')
const path = require('path')

const config = {
  name: 'esm',
  entry: path.resolve(__dirname, './index.js'),
  mode: 'none',
  output: {
    iife: false,
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
}

const esm = () => webpack(config)

// esm().run((err, stats) => {
//   console.log(err ?? '---esm---done---')
// })

exports.config = config
