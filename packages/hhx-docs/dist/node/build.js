"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.renderPage = exports.bundle = void 0;
const vite_1 = require("vite");
const constants_1 = require("./constants");
const plugin_react_1 = require("@vitejs/plugin-react");
const path_1 = require("path");
const fs = require("fs-extra");
async function bundle(root) {
    // 根据是否为服务端渲染返回vite打包配置
    const resolveViteConfig = (isServer) => ({
        mode: 'production',
        root,
        // 此插件，自动注入 import React from 'react'，避免 React is not defined 的错误
        plugins: [(0, plugin_react_1.default)()],
        // 客户端build目录下自动放入assets文件夹，文件夹内才是客户端入口的js文件，script标签引入时自动以assets目录为根目录
        build: {
            ssr: isServer,
            outDir: isServer ? '.temp' : 'build',
            rollupOptions: {
                input: isServer ? constants_1.SERVER_ENTRY_PATH : constants_1.CLIENT_ENTRY_PATH,
                output: {
                    format: isServer ? 'cjs' : 'esm',
                },
            },
        },
    });
    console.log(`Building client + server bundles... / 构建客户端与服务端的包中。。。`);
    try {
        // 并发获取双端构建的包
        const [clientBundle, serverBundle] = await Promise.all([
            (0, vite_1.build)(resolveViteConfig(false)),
            (0, vite_1.build)(resolveViteConfig(true)),
        ]);
        return [clientBundle, serverBundle];
    }
    catch (e) {
        console.log(e);
    }
}
exports.bundle = bundle;
async function renderPage(renderInserver, root, clientBundle) {
    // 获取客户端入口chunk，引入后才完成同构，页面才可以交互
    const clientEntryChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
    console.log(`Rendering page in server side... / 服务端渲染页面中。。。`);
    // 获取服务端渲染的html
    const appHtml = renderInserver();
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="我的博客">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${clientEntryChunk?.fileName}"></script>
      </body>
    </html>
  `.trim();
    // 生成客户端构建目录
    await fs.ensureDir((0, path_1.join)(root, 'build'));
    // 在产物目录中，生成服务端构建成的html文件
    await fs.writeFile((0, path_1.join)(root, 'build/index.html'), html);
    // 移除服务端构建目录
    await fs.remove((0, path_1.join)(root, '.temp'));
}
exports.renderPage = renderPage;
async function build(root = process.cwd()) {
    // 获取客户端构建包
    const [clientBundle] = await bundle(root);
    // 服务端入口路径
    const serverEntryPath = (0, path_1.join)(root, '.temp', 'server-entry.js');
    // 获取服务端渲染函数
    const { renderInServer } = require(serverEntryPath);
    // 服务端渲染产出ssg产物
    await renderPage(renderInServer, root, clientBundle);
}
exports.build = build;
