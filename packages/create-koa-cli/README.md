# 快速创建 koa 后端环境的脚手架

可通过 `yarn create koa-cli` 执行（npm 尚未支持）

## TODO

- [x] 支持 扩展自定义依赖
- [ ] 支持 npm

## tsc 缺陷

引入自己写的函数的时候，如果路径别名的文件夹没在入口引入过，就会报错找不到因为 tsc 根据深度优先遍历引入路径别名，而不影响编译是因为 ts-alias

待尝试开发工具：

- [ ] ncc
- [ ] tsup

## 参考

- [ts-cli](https://github.com/liyongning/ts-cli)
- [create-react-app](https://github.com/facebook/create-react-app)
- [vue-cli](https://github.com/vuejs/vue-cli)
