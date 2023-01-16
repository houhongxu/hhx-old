import { build as viteBuild, InlineConfig } from 'vite'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'
import pluginReact from '@vitejs/plugin-react'
import { join } from 'path'
import type { RollupOutput } from 'rollup'
import fse from 'fs-extra'
import ora from 'ora'
import { pathToFileURL } from 'url'

const spinner = ora()

export async function bundle(root: string) {
  // 根据是否为服务端渲染返回vite打包配置
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    // 此插件，自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact()],
    // 客户端build目录下自动放入assets文件夹，文件夹内才是客户端入口的js文件，script标签引入时自动以assets目录为根目录
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm',
        },
      },
    },
  })

  spinner.start(`Building client + server bundles... / 构建客户端与服务端的包中。。。`)

  try {
    // 并发获取双端构建的包
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(resolveViteConfig(false)),
      viteBuild(resolveViteConfig(true)),
    ])

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput]
  } catch (e) {
    console.log(e)
  }

  spinner.stop()
}

export async function renderPage(renderInserver: () => string, root: string, clientBundle: RollupOutput) {
  // 获取客户端入口chunk，引入后才完成同构，页面才可以交互
  const clientEntryChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry)

  spinner.start(`Rendering page in server side... / 服务端渲染页面中。。。`)

  // 获取服务端渲染的html
  const appHtml = renderInserver()

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="我的博客">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${clientEntryChunk?.fileName}"></script>
      </body>
    </html>
  `.trim()

  // 生成客户端构建目录
  await fse.ensureDir(join(root, 'build'))
  // 在产物目录中，生成服务端构建成的html文件
  await fse.writeFile(join(root, 'build/index.html'), html)
  // 移除服务端构建目录
  await fse.remove(join(root, '.temp'))

  spinner.stop()
}

export async function build(root: string = process.cwd()) {
  // 获取客户端构建包
  const [clientBundle] = await bundle(root)
  // 服务端入口路径
  const serverEntryPath = join(root, '.temp', 'server-entry.js')
  // 获取服务端渲染函数，pathToFileURL兼容Windows,await import兼容esm
  const { renderInServer } = await import(pathToFileURL(serverEntryPath).toString())
  // 服务端渲染产出ssg产物
  await renderPage(renderInServer, root, clientBundle)
}
