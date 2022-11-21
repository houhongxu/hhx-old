import chalk from 'chalk'
import { log } from 'console'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import { cd, exec } from 'shelljs'
import { getFullPath, getPackageJson, updatePackageJson } from 'utils'

/**
 * @description: 创建新项目
 * @param {string} projectName
 */
export async function create(projectName: string): Promise<void> {
  log(chalk.green('---开始搭建---'))

  isFileExist(projectName)

  const selectedPackages = await selectPackages()

  initProject(projectName)

  initPackageJson(projectName)

  installPackages(selectedPackages)

  log(chalk.green('---搭建完成---'))
}

/**
 * @description: 验证当前目录下是否已经存在指定文件，如果存在则退出
 * @param {string} filename
 */
function isFileExist(filename: string) {
  // 获取文件路径
  const filePath = getFullPath(filename)

  // 若文件存在则退出进程
  if (existsSync(filePath)) {
    log(`${filename}已存在`)
    process.exit(1)
  }
}

/**
 * @description: 选择功能
 */
async function selectPackages(): Promise<Array<string>> {
  // 输出信息
  log(chalk.blue(`Koa Cli version ${getPackageJson().version}`))
  log('请选择所需功能')
  const { packages } = await inquirer.prompt([
    {
      name: 'packages',
      type: 'checkbox',
      message: 'Check the features needed for your project 选择你项目所需要的依赖包',
      choices: [
        { name: 'typescript', value: 'typescript' },
        { name: 'prettier', value: 'prttier' },
        { name: '疯狂星期四v50', value: '疯狂星期四v50' },
      ],
    },
  ])

  return packages as Array<string>
}

/**
 * @description: 初始化项目
 * @param {string} projectName
 */
function initProject(projectName: string) {
  exec(`mkdir ${projectName}`)
  cd(projectName)
  exec('npm init -y')
}

/**
 * @description: 修改package.json属性
 * @param {string} projectName
 */
function initPackageJson(projectName: string) {
  updatePackageJson((packageJson) => {
    packageJson.name = projectName
  })
}

/**
 * @description: 安装依赖包
 * @param {Array} packages
 */
function installPackages(selectedPackages: Array<string>) {
  // TODO 添加默认包
  log(chalk.cyan('TODO'))
  selectedPackages.forEach((item) => {})
}
