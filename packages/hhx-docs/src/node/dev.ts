import { createServer as createViteDevServer } from 'vite'
import { vitePluginIndexHtml } from './vite-plugin/indexHtml'
import pluginReact from '@vitejs/plugin-react'

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [vitePluginIndexHtml(), pluginReact()],
  })
}
