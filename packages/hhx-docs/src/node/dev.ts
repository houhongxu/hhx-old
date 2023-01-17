import { createServer as createViteDevServer } from 'vite'
import { vitePluginIndexHtml } from './vite-plugin/indexHtml'
import pluginReact from '@vitejs/plugin-react'
import { resolveConfig } from './config'

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development')

  return createViteDevServer({
    root,
    plugins: [vitePluginIndexHtml(), pluginReact()],
  })
}
