"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
  Image: () => Image,
  MultiInput: () => MultiInput
});
module.exports = __toCommonJS(src_exports);

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-md ", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "https://turbo.build/repo/docs", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6", children: [
    "TEST",
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

// src/utils/cache.ts
var import_zustand = __toESM(require("zustand"));
var imgCache = /* @__PURE__ */ new Set();
var cache = (0, import_zustand.default)((set) => ({
  imgCache,
  setCache: (src) => src && imgCache.add(src),
  checkCache: (src) => src && imgCache.has(src) ? true : false
}));

// src/Image.tsx
var import_ahooks = require("ahooks");
var import_classnames = __toESM(require("classnames"));
var import_medium_zoom = __toESM(require("medium-zoom"));
var import_query_string = __toESM(require("query-string"));
var import_react3 = require("react");
var import_react_blurhash = require("react-blurhash");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Image = (_a) => {
  var _b = _a, {
    imageStyle,
    className,
    style,
    src,
    children,
    onClick,
    onLoad,
    hash: _hash,
    color: _color,
    ratio: _ratio,
    placeholder = true,
    zoomable = false,
    coverAndCenter = false,
    fixOpacityIgnoreHidden = false
  } = _b, restProps = __objRest(_b, [
    "imageStyle",
    "className",
    "style",
    "src",
    "children",
    "onClick",
    "onLoad",
    "hash",
    "color",
    "ratio",
    "placeholder",
    "zoomable",
    "coverAndCenter",
    "fixOpacityIgnoreHidden"
  ]);
  const ref = (0, import_react3.useRef)(null);
  const [inViewport] = (0, import_ahooks.useInViewport)(ref);
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const isCached = cache.getState().checkCache(src);
  const [delaying, setDelaying] = (0, import_react3.useState)(true);
  const [zoom, setZoom] = (0, import_react3.useState)();
  const coverAndCenterStyle = __spreadValues({
    top: 0,
    bottom: 0,
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center"
  }, imageStyle);
  const fixOpacityIgnoreHiddenStyle = __spreadValues({
    backfaceVisibility: "hidden",
    transform: "translate3d(0, 0, 0)"
  }, style);
  const { hash, color, ratio } = (0, import_react3.useMemo)(() => {
    try {
      if (!src)
        throw new Error();
      const query = import_query_string.default.parseUrl(src).query;
      return {
        hash: query["hash"] || _hash,
        color: query["color"] || _color,
        ratio: Number(query["width"]) / Number(query["height"]) || _ratio
      };
    } catch (err) {
      return {
        hash: _hash,
        color: _color,
        ratio: _ratio
      };
    }
  }, [_hash, _color, _ratio, src]);
  const handleLoad = (0, import_react3.useCallback)(
    (e) => {
      if (onLoad) {
        onLoad(e);
      }
      setLoading(false);
      if (!isCached && (placeholder || hash || color)) {
        setTimeout(() => {
          setDelaying(false);
          cache.getState().setCache(src);
        }, 1e3);
      } else {
        cache.getState().setCache(src);
      }
    },
    [color, hash, isCached, onLoad, placeholder, src]
  );
  const handleClick = (0, import_react3.useCallback)(
    (e) => {
      if (!zoomable && onClick) {
        onClick(e);
      }
    },
    [zoomable, onClick]
  );
  const attachZoom = (0, import_react3.useCallback)(
    (ref2) => {
      if (!zoom)
        return;
      if (zoomable) {
        zoom.attach(ref2);
      } else {
        zoom.detach(ref2);
      }
    },
    [zoomable, zoom]
  );
  (0, import_react3.useEffect)(() => {
    if (!zoom) {
      setZoom((0, import_medium_zoom.default)());
    }
  }, [zoom]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      ref,
      style: fixOpacityIgnoreHidden ? fixOpacityIgnoreHiddenStyle : style,
      className: (0, import_classnames.default)("flex items-center justify-center relative", className),
      onClick: handleClick,
      children: [
        ratio && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "", style: { paddingBottom: 1 / ratio * 100 + "%" } }),
        (isCached || inViewport) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "img",
          __spreadValues({
            loading: "lazy",
            src,
            alt: "img",
            className: "absolute w-full left-0 right-0 m-0",
            style: coverAndCenter ? coverAndCenterStyle : imageStyle,
            onLoad: handleLoad,
            ref: attachZoom
          }, restProps)
        ),
        typeof placeholder !== "boolean" && !isCached && delaying && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              "absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000",
              loading ? "opacity-100" : "opacity-0"
            ),
            children: placeholder
          }
        ),
        placeholder === true && !isCached && hash && delaying && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_blurhash.Blurhash,
          {
            hash,
            className: (0, import_classnames.default)(
              "!absolute !inset-0 !w-full !h-full transition-opacity duration-1000",
              loading ? "opacity-100" : "opacity-0"
            )
          }
        ),
        placeholder === true && !isCached && !hash && color && delaying && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            style: { background: color },
            className: (0, import_classnames.default)(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              loading ? "opacity-100" : "opacity-0"
            )
          }
        ),
        children
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Image,
  MultiInput
});
