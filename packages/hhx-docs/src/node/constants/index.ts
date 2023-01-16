import { join } from 'path'
//这是tsc的产物根路径
// export const PACKAGE_ROOT_PATH = join(__dirname, '..', '..', '..')

// 这是tsup的产物根路径，产物结构不同所以根路径要更新
export const PACKAGE_ROOT_PATH = join(__dirname, '..')

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT_PATH, 'template.html')

export const CLIENT_ENTRY_PATH = join(PACKAGE_ROOT_PATH, 'src', 'runtime', 'client-entry.tsx')
export const SERVER_ENTRY_PATH = join(PACKAGE_ROOT_PATH, 'src', 'runtime', 'server-entry.tsx')
