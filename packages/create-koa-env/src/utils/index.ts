import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { packageJson } from 'types'

export const isArrayEmpty = (arr?: any[]) => !Array.isArray(arr) || arr.length === 0

export const isObjectEmpty = (obj?: object) => isArrayEmpty(Object.keys(obj ?? {}))

/**
 * @description: 读取package.json 文件
 */
export function getPackageJson(): packageJson {
  return JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), { encoding: 'utf-8', flag: 'r' }))
}

/**
 * @description: 更新package.json 文件
 * @param {function} updateFunction
 */
export function updatePackageJson(updateFunction: (packageJson: packageJson) => void) {
  const packageJson = readJsonFile<packageJson>('./package.json')
  updateFunction(packageJson)
  writeJsonFile<packageJson>('./package.json', packageJson)
}

/**
 * @description: 读取指定路径下 json 文件
 * @param {string} filename
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(readFileSync(filename, { encoding: 'utf-8', flag: 'r' }))
}

/**
 * @description: 覆写指定路径下的 json 文件
 * @param {string} filename
 * @param {T} content
 */
export function writeJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content, null, 2))
}

/**
 * @description: 获取文件绝对路径
 * @param {string} fileName
 */
export function getFilePath(fileName: string): string {
  return resolve(process.cwd(), fileName)
}

/**
 * @description: 如果node版本小于14则提醒并退出
 */
export function checkNodeVersion() {
  const currentNodeVersion = process.versions.node
  const semver = currentNodeVersion.split('.')
  const major = semver[0]

  if (parseInt(major) < 14) {
    console.error(`当前node版本为${currentNodeVersion}，请升级node版本到14或以上`)
    process.exit(1)
  }
}
