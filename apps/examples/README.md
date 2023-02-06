# webpack 相关 测试用例

## 打包

每个文件夹有单独的 build.js 通过 node 调用 webpack

子文件夹进行多配置导出，在 webpack.config.js 可以统一打包，暂时调用子文件夹 build 进行统一打包，未进行统一配置

总体的多入口打包尚未做分别配置，暂时不用，仅做示例

因为需要热重载，所以还是需要进行统一配置

统一配置时注释掉每个 build.js 中的执行文件

热重载会自动打开从上到下（因为读取目录时的顺序）的**第一个**有 html 配置的服务，如果没有是 Cannot get 页面

## TODO

- [x] 将测试的手写简易 webpack 分离
- [x] 热重载

## 注意

vercel 的 serve 是以 package.json 目录来算，在 code-spliting 目录不能直接 npx serve dist 应该 npx serve ./code-spliting/dist

## 测试 hhx-axios 相关

修改好 hhx-axios 后 执行该用例目录下的 test:axios 即可

改进为热重载 dev:axios
