import chalk from 'chalk'
import { program } from 'commander'
import { checkNodeVersion, getPackageJson } from 'utils'
import { create } from 'commands'

checkNodeVersion()

program
  .version(`create-koa-cli ${getPackageJson().version}`, '-v --version', 'output the version number 显示版本号')
  .usage(chalk.green('create-koa-cli <command> [options]'))

program
  .command('create', { isDefault: true })
  .argument('[project-name]', 'project-name 项目名称', 'koa-cli')
  .description('create new project 创建新项目')
  .action((projectName) => {
    create(projectName)
  })

program.parse()
