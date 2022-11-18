import { log } from 'console'
import { writeFileSync } from 'fs'
import { prettierConfig } from './config'
import { updatePackageJson } from 'utils'
import chalk from 'chalk'
import { exec } from 'shelljs'

/**
 * 安装 Prettier
 */
export function installPrettier() {
  exec('yarn add prettier -D')

  // 添加 .prettierrc.js
  try {
    writeFileSync('./prettier.config.js', prettierConfig, { encoding: 'utf-8' })
  } catch (err) {
    log(chalk.red('Failed to write prettier.config.js 创建prettier.config.js失败'))
  }

  updatePackageJson((packageJson) => (packageJson.scripts['prettier'] = 'prettier --write "src/**/*.ts"'))
}
