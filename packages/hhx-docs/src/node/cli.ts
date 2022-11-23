import cac from 'cac'
import path = require('path')
import { createDevServer } from './dev'

const version = require('../../package.json').version

const cli = cac('hhx-docs').version(version).help()

cli
  .command('[root]', 'start dev server / 开启开发环境服务器')
  .alias('dev')
  .action(async (root: string) => {
    root = root ? path.resolve(root) : process.cwd()
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  })

cli.command('build [root]', 'build for production / 打包为生产环境包').action(async (root: string) => {
  console.log('build', root)
})

cli.parse()
