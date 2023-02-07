import { relative } from 'path'
import { Plugin } from 'vite'
import { SiteConfig } from '../../shared/types/index'

const SITE_DATA_ID = 'hhx-docs:site-data'
const RESOLVED_SITE_DATA_ID = '\0' + SITE_DATA_ID

export function pluginConfig(config: SiteConfig): Plugin {
  return {
    name: 'hhx-docs:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return RESOLVED_SITE_DATA_ID
      }
    },
    load(id) {
      if (id === RESOLVED_SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },

    // async handleHotUpdate(ctx) {
    //   const customWatchedFiles = [config.configPath]
    //   const include = (id: string) => customWatchedFiles.some((file) => id.includes(file))

    //   if (include(ctx.file)) {
    //     console.log(`\n${relative(config.root, ctx.file)} changed, restarting server...`)
    //     // 重点: 重启 Dev Server
    //   }
    // },
  }
}
