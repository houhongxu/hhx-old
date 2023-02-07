import { createServer as createViteDevServer } from 'vite'
import { vitePluginIndexHtml } from './vite-plugin/index-html'
import pluginReact from '@vitejs/plugin-react'
import { resolveConfig } from './config'
import { pluginConfig } from './vite-plugin/config'
import { PACKAGE_ROOT_PATH } from './constants'

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development')

  // 创建vite-dev-server并传入配置
  return createViteDevServer({
    root,
    plugins: [vitePluginIndexHtml(), pluginReact(), pluginConfig(config)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT_PATH],
      },
    },
  })
}
