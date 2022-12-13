import create from 'zustand'

const imgCache = new Set<string>()

type State = {
  imgCache: Set<string>
}

type Action = {
  setCache: (src?: string) => void
  checkCache: (src?: string) => boolean
}

export const cache = create<State & Action>((set) => ({
  imgCache,
  setCache: (src) => src && imgCache.add(src),
  checkCache: (src) => (src && imgCache.has(src) ? true : false),
}))
