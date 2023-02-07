import {
  __commonJS,
  __dirname,
  resolveConfig
} from "./chunk-Q45M7S75.mjs";

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
        vite: "^3.2.1"
      }
    };
  }
});

// src/node/cli.ts
import cac from "cac";
import { resolve } from "path";

// src/node/build.ts
import { build as viteBuild } from "vite";

// src/node/constants/index.ts
import { join } from "path";
var PACKAGE_ROOT_PATH = join(__dirname, "..");
var DEFAULT_HTML_PATH = join(PACKAGE_ROOT_PATH, "template.html");
var CLIENT_ENTRY_PATH = join(PACKAGE_ROOT_PATH, "src", "runtime", "client-entry.tsx");
var SERVER_ENTRY_PATH = join(PACKAGE_ROOT_PATH, "src", "runtime", "server-entry.tsx");

// src/node/build.ts
import pluginReact from "@vitejs/plugin-react";
import { join as join2 } from "path";
import fse from "fs-extra";
import ora from "ora";
import { pathToFileURL } from "url";
var spinner = ora();
async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    plugins: [pluginReact()],
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
      viteBuild(resolveViteConfig(false)),
      viteBuild(resolveViteConfig(true))
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
        <script type="module" src="/${clientEntryChunk?.fileName}"><\/script>
      </body>
    </html>
  `.trim();
  await fse.ensureDir(join2(root, "build"));
  await fse.writeFile(join2(root, "build/index.html"), html);
  await fse.remove(join2(root, ".temp"));
  spinner.stop();
}
async function build(root = process.cwd()) {
  const [clientBundle] = await bundle(root);
  const serverEntryPath = join2(root, ".temp", "server-entry.js");
  const { renderInServer } = await import(pathToFileURL(serverEntryPath).toString());
  await renderPage(renderInServer, root, clientBundle);
}

// src/node/dev.ts
import { createServer as createViteDevServer } from "vite";

// src/node/vite-plugin/index-html.ts
import { readFile } from "fs/promises";
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
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");
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
import pluginReact2 from "@vitejs/plugin-react";

// src/node/vite-plugin/config.ts
var SITE_DATA_ID = "hhx-docs:site-data";
var RESOLVED_SITE_DATA_ID = "\0" + SITE_DATA_ID;
function pluginConfig(config) {
  return {
    name: "hhx-docs:config",
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return RESOLVED_SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    }
  };
}

// src/node/dev.ts
async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, "serve", "development");
  return createViteDevServer({
    root,
    plugins: [vitePluginIndexHtml(), pluginReact2(), pluginConfig(config)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT_PATH]
      }
    }
  });
}

// src/node/cli.ts
var version = require_package().version;
var cli = cac("hhx-docs").version(version).help();
cli.command("[root]", "start dev server / \u5F00\u542F\u5F00\u53D1\u73AF\u5883\u670D\u52A1\u5668").alias("dev").action(async (root) => {
  root = root ? resolve(root) : process.cwd();
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
    root = resolve(root);
    await build(root);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
