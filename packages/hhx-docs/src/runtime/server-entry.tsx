import { App } from './app'
import { renderToString } from 'react-dom/server'

export function renderInserver() {
  return renderToString(<App />)
}
