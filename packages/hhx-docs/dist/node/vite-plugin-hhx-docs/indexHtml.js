"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vitePluginIndexHtml = void 0;
const fs_1 = require("fs");
const constants_1 = require("../constants");
// TODO 看文档看视频
function vitePluginIndexHtml() {
    return {
        name: 'hhx-docs:index-html',
        apply: 'serve',
        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    let html = (0, fs_1.readFileSync)(constants_1.DEFAULT_HTML_PATH, 'utf-8');
                    try {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'text/html');
                        res.end(html);
                    }
                    catch (e) {
                        return next(e);
                    }
                });
            };
        },
    };
}
exports.vitePluginIndexHtml = vitePluginIndexHtml;
