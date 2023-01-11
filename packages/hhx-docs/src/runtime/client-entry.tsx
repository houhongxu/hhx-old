import { createRoot } from 'react-dom/client'
import { App } from './App'

function renderInClient() {
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('#root element not found / #root元素不存在')
  }
  createRoot(containerEl).render(<App></App>)
}

renderInClient()
