const fs = require("fs");
const path = require("path");

const { parse } = require("@babel/parser");
const { default: traverse } = require("@babel/traverse");
const { default: generate } = require("@babel/generator");

let moduleId = 0;

function buildModule(filename) {
  filename = path.resolve(
    __dirname,
    filename.endsWith(".js") ? filename : filename + ".js"
  );

  const code = fs.readFileSync(filename, "utf8");

  const ast = parse(code, { sourceType: "module" });

  const deps = [];
  const currentModuleId = moduleId;

  traverse(ast, {
    enter({ node }) {
      if (node.type === "CallExpression" && node.callee.name === "require") {
        const argument = node.arguments[0];

        if (argument.type === "StringLiteral") {
          moduleId++;

          const nextFilename = path.join(
            path.dirname(filename),
            argument.value
          );

          argument.value = moduleId;
          node.callee.name = "webpackRequire";

          deps.push(buildModule(nextFilename));
        }
      }
    },
  });
  return {
    id: currentModuleId,
    filename,
    deps,
    code: generate(ast).code,
  };
}

function moduleTreeToQueue(moduleTree) {
  const { deps, ...module } = moduleTree;

  const moduleQueue = deps.reduce(
    (pre, m) => {
      return pre.concat(moduleTreeToQueue(m));
    },
    [module]
  );

  return moduleQueue;
}

function createModuleWrapper(code) {
  return `
  (function(module,webpackExports,webpackRequire){
    ${code}
  })
  `;
}

function createBundleTemplate(entry) {
  const moduleTree = buildModule(entry);
  const modules = moduleTreeToQueue(moduleTree);

  const template = `
    const webpackModules=[${modules.map((m) => createModuleWrapper(m.code))}]

    const webpackModuleCache={}

    function webpackRequire(moduleId){
      const cachedModule=webpackModuleCache[moduleId]
      
      if(cachedModule){
        return cachedModule.exports
      }

      const module={exports:{}}
      webpackModuleCache[moduleId]=module

      webpackModules[moduleId](module,module.exports,webpackRequire)

      return module.exports
    }

    webpackRequire(0)
  `;

  fs.mkdirSync(path.resolve(__dirname, "./dist"));
  fs.writeFileSync(path.resolve(__dirname, "./dist/main.js"), template);
}

module.exports = createBundleTemplate;
