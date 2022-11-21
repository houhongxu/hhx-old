export interface packageJson {
  name: string
  version: string
  scripts: {
    [key: string]: string
  }
}

export interface JSON {
  [key: string]: unknown
}
