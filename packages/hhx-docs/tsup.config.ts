import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node/cli.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  // esm兼容__dirname
  shims: true,
  clean: true,
  // 解决esm内使用require的问题
  // banner: {
  //   js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  // },
})
