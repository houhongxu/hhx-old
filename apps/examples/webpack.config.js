const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// 多配置打包示例

/**
 * 在 examples 目录下建多个子目录
 * 把不同的 demo 放到不同的子目录中
 * 每个子目录的下会创建一个 build.js作为配置打包文件
 * 通过调用每个子目录的build.js完成一起打包
 * 如果需要统一配置在此处拿到配置文件后进行配置，当然，build.js中就不能有执行函数了
 */
const configs = fs.readdirSync(__dirname).reduce((configs, dir) => {
  const fullDir = path.join(__dirname, dir)
  const entry = path.join(fullDir, 'build.js')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    require(entry)
  }
  return configs
}, [])

module.exports = configs
