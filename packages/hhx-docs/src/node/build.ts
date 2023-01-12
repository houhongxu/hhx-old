import { build as viteBuild, InlineConfig } from 'vite'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'
import pluginReact from '@vitejs/plugin-react'
import { join } from 'path'
import type { RollupOutput } from 'rollup'
import * as fs from 'fs-extra'

export async function bundle(root: string) {
  // 根据是否为服务端渲染返回vite打包配置
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    // 此插件，自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact()],
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

  console.log(`Building client + server bundles... / 构建客户端与服务端的包中。。。`)

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
}

export async function renderPage(renderInserver: () => string, root: string, clientBundle: RollupOutput) {
  // 获取入口chunk
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry)

  console.log(`Rendering page in server side... / 服务端渲染页面中。。。`)

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
        <script type="module" src="/${clientChunk?.fileName}"></script>
      </body>
    </html>
  `.trim()

  // 生成客户端构建目录
  await fs.ensureDir(join(root, 'build'))
  // 在客户端目录中，生成服务端构建成的html文件
  await fs.writeFile(join(root, 'build/index.html'), html)
  // 移除服务端构建目录
  await fs.remove(join(root, '.temp'))
}

export async function build(root: string = process.cwd()) {
  // 获取客户端构建包
  const [clientBundle] = await bundle(root)
  // 服务端入口路径
  const serverEntryPath = join(root, '.temp', 'server-entry.js')
  // 获取服务端渲染函数
  const { renderInserver } = require(serverEntryPath)

  await renderPage(renderInserver, root, clientBundle)
}
