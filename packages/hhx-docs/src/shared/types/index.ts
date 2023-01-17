import { UserConfig as ViteConfig } from 'vite'

export interface UserConfig {
  title?: string
  description?: string
  themeConfig?: ThemeConfig
  vite?: ViteConfig
}

export interface ThemeConfig {
  nav?: NavItemWithLink[]
  sidebar?: Sidebar
  footer?: Footer
}

export type NavItemWithLink = {
  text: string
  link: string
}

export interface Sidebar {
  [path: string]: SideBarGroup[]
}

export interface SideBarGroup {
  text?: string
  items: SidebarItem[]
}

export type SidebarItem = { text: string; link: string } | { text: string; link?: string; items: SidebarItem }

export interface Footer {
  message?: string
  copyright?: string
}
