const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// 多入口示例

module.exports = {
  mode: 'development',

  /**
   * 在 examples 目录下建多个子目录
   * 把不同的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 index.js
   * index.js 作为 webpack 构建的入口文件
   * entries 是一个对象，key 为目录名，value为入口绝对路径
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'index.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
    }
    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: ['css-loader', 'postcss-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '...'],
  },
}
