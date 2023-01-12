import cac from 'cac'
import { resolve } from 'path'
import path = require('path')
import { build } from './build'
import { createDevServer } from './dev'

// 读取版本号
const version = require('../../package.json').version

// 实例化脚手架
const cli = cac('hhx-docs').version(version).help()

// 任意命令启动开发环境服务器，命令别名为dev，命令内容可以为路径
cli
  .command('[root]', 'start dev server / 开启开发环境服务器')
  .alias('dev')
  .action(async (root: string) => {
    // 判断是否指定路径
    root = root ? path.resolve(root) : process.cwd()
    // 实例化服务
    const server = await createDevServer(root)
    // 开启服务
    await server.listen()
    // 打印服务链接
    server.printUrls()
  })

cli.command('build [root]', 'build for production / 打包为生产环境包').action(async (root: string) => {
  try {
    root = resolve(root)
    await build(root)
  } catch (e) {
    console.log(e)
  }
})

cli.parse()
