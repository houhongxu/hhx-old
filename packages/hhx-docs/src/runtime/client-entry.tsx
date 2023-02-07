// 进行客户端渲染将react组件挂载到模板html中
import { createRoot } from 'react-dom/client'
import { App } from './App'

function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('#root element not found / #root元素不存在')
  }
  createRoot(containerEl).render(<App></App>)
}

renderInBrowser()
