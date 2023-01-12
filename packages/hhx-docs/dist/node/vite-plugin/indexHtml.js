"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vitePluginIndexHtml = void 0;
const promises_1 = require("fs/promises");
const constants_1 = require("../constants");
function vitePluginIndexHtml() {
    return {
        name: 'hhx-docs:index-html',
        apply: 'serve',
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: 'script',
                        attrs: {
                            type: 'module',
                            src: `/@fs/${constants_1.CLIENT_ENTRY_PATH}`, // vite约定绝对路径前添加
                        },
                        injectTo: 'body',
                    },
                ],
            };
        },
        configureServer(server) {
            // 拦截根目录请求进行响应
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    // 读取模板文件
                    let html = await (0, promises_1.readFile)(constants_1.DEFAULT_HTML_PATH, 'utf-8');
                    try {
                        // 使用vite内的html转换处理，使vite可以控制react全局热更新，再通过@vitejs/plugin-react实现局部热更新（会按顺序执行所有插件的该api）
                        html = await server.transformIndexHtml(req.url, html, req.originalUrl);
                        // 发送html模板给客户端
                        res.statusCode = 200;
                        res.setHeader('content-type', 'text/html');
                        res.end(html);
                    }
                    catch (e) {
                        // 下一个中间件进行错误处理
                        return next(e);
                    }
                });
            };
        },
    };
}
exports.vitePluginIndexHtml = vitePluginIndexHtml;
