# webpack 测试用例

## 打包

每个文件夹有单独的 build.js 通过 node 调用 webpack

子文件夹进行多配置导出，在 webpack.config.js 可以统一打包，暂时调用子文件夹 build 进行统一打包，未进行统一配置

总体的多入口打包尚未做分别配置，暂时不用，仅做示例

## TODO

- [x] 将测试的手写简易 webpack 分离

## 注意

vercel 的 serve 是以 package.json 目录来算，在 code-spliting 目录不能直接 npx serve dist 应该 npx serve ./code-spliting/dist

## 测试 hhx-axios 相关

修改好 hhx-axios 后 执行该用例目录下的 test:axios 即可
