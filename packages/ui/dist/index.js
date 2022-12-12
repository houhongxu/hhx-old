"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  MultiInput: () => MultiInput
});
module.exports = __toCommonJS(src_exports);

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-md ", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "https://turbo.build/repo/docs", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6", children: [
    "Read the docs",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent", children: "\u2192" })
  ] }) }) });
};

// src/MultiInput.tsx
var import_icons = require("@ant-design/icons");
var import_antd = require("antd");
var import_react = require("react");
var import_react2 = require("react");
var import_antd2 = require("antd/dist/antd.css");

// ../helper/validate.ts
var isArrayEmpty = (value) => !Array.isArray(value) || value.length === 0;

// src/MultiInput.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var MultiInput = ({ onChange, value, isNumber = true }) => {
  const initialValue = (0, import_react.useMemo)(() => [{ key: "0", value: "" }], []);
  const [inputs, setInputs] = (0, import_react2.useState)(initialValue);
  const add = () => __async(void 0, null, function* () {
    if (inputs[inputs.length - 1].value) {
      onChange([...inputs.map((item) => item.value), ""]);
      setInputs((prev) => [...prev, { key: (parseInt(prev[prev.length - 1].key) + 1).toString(), value: "" }]);
    }
  });
  const remove = (key) => __async(void 0, null, function* () {
    onChange(inputs.filter((item) => item.key !== key).map((item) => item.value));
    setInputs(inputs.filter((item) => item.key !== key));
  });
  (0, import_react2.useEffect)(() => {
    setInputs(
      value && !isArrayEmpty(value) ? value.map((item, index) => ({ key: index.toString(), value: item })) : initialValue
    );
  }, [initialValue, value]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { width: "100%", height: 33 + inputs.length * 42 }, children: [
    inputs.map((input, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", margin: "2px 0 10px 0" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { lineHeight: "32px" }, children: isNumber ? `\u7B2C${parseInt(input.key) + 1}\u4E2A\uFF1A` : `${String.fromCharCode(parseInt(input.key) + 65)}\uFF1A` }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { width: 296, display: "flex" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_antd.Input,
        {
          placeholder: "\u8BF7\u586B\u5165\u540E\u518D\u65B0\u589E",
          value: input.value,
          onChange: (e) => setInputs(inputs.map((item) => item.key === input.key ? { key: input.key, value: e.target.value } : item)),
          onBlur: () => {
            onChange(inputs.map((item) => item.value));
          }
        }
      ) }),
      index !== 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_icons.MinusCircleOutlined,
        {
          style: { position: "relative", top: 4, margin: "0 8px", color: "#999", fontSize: 24, cursor: "pointer" },
          onClick: () => {
            remove(input.key);
          }
        }
      )
    ] }, input.key)),
    (isNumber || inputs.length < 4) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Button, { type: "dashed", onClick: () => add(), style: { width: 352 }, icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.PlusOutlined, {}), children: "\u65B0\u589E" })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  MultiInput
});
