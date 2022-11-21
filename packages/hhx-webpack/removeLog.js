const { parse } = require("@babel/parser");
const { default: traverse } = require("@babel/traverse");
const { default: generate } = require("@babel/generator");

const removeLog = (code) => {
  const ast = parse(code, { sourceType: "module" });

  traverse(ast, {
    enter(path) {
      const { node } = path;
      if (
        node.type === "CallExpression" &&
        node.callee.object.name === "console" &&
        node.callee.property.name === "log"
      ) {
        path.remove();
      }
    },
  });
  return generate(ast).code;
};

console.log(
  removeLog(`
  console.log("hello");
  console.warn("hello2")
  const foo = "bar";
`)
);
