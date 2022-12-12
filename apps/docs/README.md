# HHX 的笔记

## vercel 部署问题

1.注意路径是否完整

## PR

- [ ] [修复@tsconfig/docusaurus/tsconfig.json 内未更新 preset-classic 的问题](https://github.com/tsconfig/bases/pull/147)
- [ ] 本地修复 types:['node']报错的问题

## 问题

- [ ] mdx 不支持导入 mjs 的库
      但是支持 antd 的 esm 文件夹方式导入，
      因为里面是 js 文件
      所以研究一下 tsup 打包为支持 esm 的库，但是不使用 mjs，因为浏览器环境不支持 mjs
      [见文档](https://tsup.egoist.dev/#output-extension)
