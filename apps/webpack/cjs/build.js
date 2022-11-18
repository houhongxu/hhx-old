const webpack = require('webpack')
const path = require('path')

const cjs = () => {
  return webpack({
    entry: path.resolve(__dirname, './index.js'),
    // 当 mode 为 production 时，将自动开启 terser 对代码进行压缩及 Tree Shaking
    mode: 'none',
    output: {
      iife: false,
      clean: true,
      // output.path 必须为一个绝对路径
      path: path.resolve(__dirname, 'dist'),
    },
  })
}

cjs().run((err, stats) => {
  console.log(err ?? '---done---')
})
