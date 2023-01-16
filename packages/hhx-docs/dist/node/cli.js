"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const path_1 = require("path");
const path = require("path");
const build_1 = require("./build");
const dev_1 = require("./dev");
// 读取版本号
const version = require('../../package.json').version;
// 实例化脚手架
const cli = (0, cac_1.default)('hhx-docs').version(version).help();
// 任意命令启动开发环境服务器，命令别名为dev，命令内容可以为路径
cli
    .command('[root]', 'start dev server / 开启开发环境服务器')
    .alias('dev')
    .action(async (root) => {
    // 判断是否指定路径
    root = root ? path.resolve(root) : process.cwd();
    // 实例化服务
    const server = await (0, dev_1.createDevServer)(root);
    try {
        // 开启服务
        await server.listen();
    }
    catch (e) {
        console.log(e);
    }
    // 打印服务链接
    server.printUrls();
});
cli.command('build [root]', 'build for production / 构建为生产环境包').action(async (root) => {
    try {
        root = (0, path_1.resolve)(root);
        await (0, build_1.build)(root);
    }
    catch (e) {
        console.log(e);
    }
});
cli.parse();
