# 组件库

图片

使用 paddingBottom 撑开等比的宽高

绝对定位图片

使用 hash 或者纯色占位

## 问题

- [ ] mdx 不支持导入 mjs 的库
      但是支持 antd 的 esm 文件夹方式导入，
      因为里面是 js 文件
      所以研究一下 tsup 打包为支持 esm 的库，但是不使用 mjs，因为浏览器环境不支持 mjs
      [见文档](https://tsup.egoist.dev/#bundle-formats)
