import { resolve } from 'path'
import fs from 'fs-extra'
import { loadConfigFromFile } from 'vite'
import { SiteConfig, UserConfig } from '../shared/types'

type RawConfig = UserConfig | Promise<UserConfig> | (() => UserConfig | Promise<UserConfig>)

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'HHX-DOCS',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {},
  }
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode)

  const siteConfig: SiteConfig = {
    root,
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig),
  }
  return siteConfig
}

export async function resolveUserConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  // 获取配置文件路径
  const configPath = getUserConfigPath(root)
  // 读取配置文件内容
  const result = await loadConfigFromFile({ command, mode }, configPath, root)

  if (result) {
    // 读取的用户配置
    const { config: rawConfig = {} as RawConfig } = result
    // 配置类型的三种情况
    // 1. object
    // 2. promise
    // 3. function
    const userConfig = (await (typeof rawConfig === 'function' ? rawConfig() : rawConfig)) as UserConfig

    return [configPath, userConfig] as const
  } else {
    return [configPath, {}] as const
  }
}

function getUserConfigPath(root: string) {
  try {
    // 支持的配置文件名
    const supportConfigFiles = ['config.ts', 'config.js']
    // 存在的配置文件路径
    const configPath = supportConfigFiles.map((file) => resolve(root, file)).find(fs.pathExistsSync)
    return configPath
  } catch (e) {
    console.error(`Failed to load user config: ${e} / 加载用户配置失败：${e}`)
    throw e
  }
}

export function defineConfig(config: UserConfig) {
  return config
}
