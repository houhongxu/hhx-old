"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "hhx-docs",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        dev: "tsup --watch",
        "dev:comment": "--watch \u8868\u793A\u76D1\u542C\u6A21\u5F0F\uFF0C\u8FD9\u6837\u4FEE\u6539\u6587\u4EF6\u540E\u5C31\u4F1A\u81EA\u52A8\u89E6\u53D1\u91CD\u65B0\u7F16\u8BD1",
        build: "tsup",
        preview: "cd build && serve .",
        "test:unit": "vitest run",
        "test:comment": "\u76F4\u63A5\u4F7F\u7528vitest\u547D\u4EE4\u53EF\u4EE5\u5F00\u542F\u76D1\u542C\u6A21\u5F0F",
        "prepare:e2e": "tsx scripts/prepare-e2e.ts",
        "test:e2e": "playwright test"
      },
      bin: {
        "hhx-docs": "bin/cli.js"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@playwright/test": "1.26.1",
        "@types/fs-extra": "^11.0.1",
        "@types/node": "^18.11.9",
        "@types/react": "^18.0.26",
        "@types/react-dom": "^18.0.10",
        execa: "^6.1.0",
        rollup: "^3.3.0",
        tsup: "^6.1.3",
        tsx: "^3.12.2",
        typescript: "^4.9.3",
        vitest: "^0.27.1"
      },
      dependencies: {
        "@vitejs/plugin-react": "^3.0.1",
        cac: "^6.7.14",
        "fs-extra": "^11.1.0",
        ora: "^6.1.2",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        vite: "^3.2.4"
      }
    };
  }
});

// src/node/cli.ts
var _cac = require('cac'); var _cac2 = _interopRequireDefault(_cac);
var _path = require('path');

// src/node/build.ts
var _vite = require('vite');

// src/node/constants/index.ts

var PACKAGE_ROOT_PATH = _path.join.call(void 0, __dirname, "..");
var DEFAULT_HTML_PATH = _path.join.call(void 0, PACKAGE_ROOT_PATH, "template.html");
var CLIENT_ENTRY_PATH = _path.join.call(void 0, PACKAGE_ROOT_PATH, "src", "runtime", "client-entry.tsx");
var SERVER_ENTRY_PATH = _path.join.call(void 0, PACKAGE_ROOT_PATH, "src", "runtime", "server-entry.tsx");

// src/node/build.ts
var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);

var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var _ora = require('ora'); var _ora2 = _interopRequireDefault(_ora);
var _url = require('url');
var spinner = _ora2.default.call(void 0, );
async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    plugins: [_pluginreact2.default.call(void 0, )],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  spinner.start(`Building client + server bundles... / \u6784\u5EFA\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u7AEF\u7684\u5305\u4E2D\u3002\u3002\u3002`);
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      _vite.build.call(void 0, resolveViteConfig(false)),
      _vite.build.call(void 0, resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
  spinner.stop();
}
async function renderPage(renderInserver, root, clientBundle) {
  const clientEntryChunk = clientBundle.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry);
  spinner.start(`Rendering page in server side... / \u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762\u4E2D\u3002\u3002\u3002`);
  const appHtml = renderInserver();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="\u6211\u7684\u535A\u5BA2">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${_optionalChain([clientEntryChunk, 'optionalAccess', _ => _.fileName])}"><\/script>
      </body>
    </html>
  `.trim();
  await _fsextra2.default.ensureDir(_path.join.call(void 0, root, "build"));
  await _fsextra2.default.writeFile(_path.join.call(void 0, root, "build/index.html"), html);
  await _fsextra2.default.remove(_path.join.call(void 0, root, ".temp"));
  spinner.stop();
}
async function build(root = process.cwd()) {
  const [clientBundle] = await bundle(root);
  const serverEntryPath = _path.join.call(void 0, root, ".temp", "server-entry.js");
  const { renderInServer } = await Promise.resolve().then(() => require(_url.pathToFileURL.call(void 0, serverEntryPath).toString()));
  await renderPage(renderInServer, root, clientBundle);
}

// src/node/dev.ts


// src/node/vite-plugin/indexHtml.ts
var _promises = require('fs/promises');
function vitePluginIndexHtml() {
  return {
    name: "hhx-docs:index-html",
    apply: "serve",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await _promises.readFile.call(void 0, DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(req.url, html, req.originalUrl);
            res.statusCode = 200;
            res.setHeader("content-type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/dev.ts


// src/node/config.ts



async function resolveConfig(root, command, mode) {
  const configPath = getUserConfigPath(root);
  const result = await _vite.loadConfigFromFile.call(void 0, { command, mode }, configPath, root);
  if (result) {
    const { config: rawConfig = {} } = result;
    const userConfig = await (typeof rawConfig === "function" ? rawConfig() : rawConfig);
    return [configPath, userConfig];
  } else {
    return [configPath, {}];
  }
}
function getUserConfigPath(root) {
  try {
    const supportConfigFiles = ["config.ts", "config.js"];
    const configPath = supportConfigFiles.map((file) => _path.resolve.call(void 0, root, file)).find(_fsextra2.default.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to load user config: ${e} / \u52A0\u8F7D\u7528\u6237\u914D\u7F6E\u5931\u8D25\uFF1A${e}`);
    throw e;
  }
}

// src/node/dev.ts
async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, "serve", "development");
  return _vite.createServer.call(void 0, {
    root,
    plugins: [vitePluginIndexHtml(), _pluginreact2.default.call(void 0, )]
  });
}

// src/node/cli.ts
var version = require_package().version;
var cli = _cac2.default.call(void 0, "hhx-docs").version(version).help();
cli.command("[root]", "start dev server / \u5F00\u542F\u5F00\u53D1\u73AF\u5883\u670D\u52A1\u5668").alias("dev").action(async (root) => {
  root = root ? _path.resolve.call(void 0, root) : process.cwd();
  const server = await createDevServer(root);
  try {
    await server.listen();
  } catch (e) {
    console.log(e);
  }
  server.printUrls();
});
cli.command("build [root]", "build for production / \u6784\u5EFA\u4E3A\u751F\u4EA7\u73AF\u5883\u5305").action(async (root) => {
  try {
    root = _path.resolve.call(void 0, root);
    await build(root);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
