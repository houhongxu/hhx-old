"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const path = require("path");
const dev_1 = require("./dev");
const version = require('../../package.json').version;
const cli = (0, cac_1.default)('hhx-docs').version(version).help();
cli
    .command('[root]', 'start dev server / 开启开发环境服务器')
    .alias('dev')
    .action(async (root) => {
    root = root ? path.resolve(root) : process.cwd();
    const server = await (0, dev_1.createDevServer)(root);
    await server.listen();
    server.printUrls();
});
cli.command('build [root]', 'build for production / 打包为生产环境包').action(async (root) => {
    console.log('build', root);
});
cli.parse();
