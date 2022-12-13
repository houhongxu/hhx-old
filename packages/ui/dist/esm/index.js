var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Button = () => {
  return /* @__PURE__ */ jsx("div", { className: "rounded-md ", children: /* @__PURE__ */ jsx("a", { href: "https://turbo.build/repo/docs", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6", children: [
    "TEST",
    /* @__PURE__ */ jsx("span", { className: "ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent", children: "\u2192" })
  ] }) }) });
};

// src/MultiInput.tsx
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Button as Button2 } from "antd";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";

// ../helper/validate.ts
var isArrayEmpty = (value) => !Array.isArray(value) || value.length === 0;

// src/MultiInput.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var MultiInput = ({ onChange, value, isNumber = true }) => {
  const initialValue = useMemo(() => [{ key: "0", value: "" }], []);
  const [inputs, setInputs] = useState(initialValue);
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
  useEffect(() => {
    setInputs(
      value && !isArrayEmpty(value) ? value.map((item, index) => ({ key: index.toString(), value: item })) : initialValue
    );
  }, [initialValue, value]);
  return /* @__PURE__ */ jsxs2("div", { style: { width: "100%", height: 33 + inputs.length * 42 }, children: [
    inputs.map((input, index) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", margin: "2px 0 10px 0" }, children: [
      /* @__PURE__ */ jsx2("span", { style: { lineHeight: "32px" }, children: isNumber ? `\u7B2C${parseInt(input.key) + 1}\u4E2A\uFF1A` : `${String.fromCharCode(parseInt(input.key) + 65)}\uFF1A` }),
      /* @__PURE__ */ jsx2("div", { style: { width: 296, display: "flex" }, children: /* @__PURE__ */ jsx2(
        Input,
        {
          placeholder: "\u8BF7\u586B\u5165\u540E\u518D\u65B0\u589E",
          value: input.value,
          onChange: (e) => setInputs(inputs.map((item) => item.key === input.key ? { key: input.key, value: e.target.value } : item)),
          onBlur: () => {
            onChange(inputs.map((item) => item.value));
          }
        }
      ) }),
      index !== 0 && /* @__PURE__ */ jsx2(
        MinusCircleOutlined,
        {
          style: { position: "relative", top: 4, margin: "0 8px", color: "#999", fontSize: 24, cursor: "pointer" },
          onClick: () => {
            remove(input.key);
          }
        }
      )
    ] }, input.key)),
    (isNumber || inputs.length < 4) && /* @__PURE__ */ jsx2(Button2, { type: "dashed", onClick: () => add(), style: { width: 352 }, icon: /* @__PURE__ */ jsx2(PlusOutlined, {}), children: "\u65B0\u589E" })
  ] });
};

// src/utils/cache.ts
import create from "zustand";
var imgCache = /* @__PURE__ */ new Set();
var cache = create((set) => ({
  imgCache,
  setCache: (src) => src && imgCache.add(src),
  checkCache: (src) => src && imgCache.has(src) ? true : false
}));

// src/Image.tsx
import { useInViewport } from "ahooks";
import classNames from "classnames";
import mediumZoom from "medium-zoom";
import qs from "query-string";
import { useCallback, useEffect as useEffect2, useMemo as useMemo2, useRef, useState as useState2 } from "react";
import { Blurhash as BlurImage } from "react-blurhash";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);
  const [loading, setLoading] = useState2(true);
  const isCached = cache.getState().checkCache(src);
  const [delaying, setDelaying] = useState2(true);
  const [zoom, setZoom] = useState2();
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
  const { hash, color, ratio } = useMemo2(() => {
    try {
      if (!src)
        throw new Error();
      const query = qs.parseUrl(src).query;
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
  const handleLoad = useCallback(
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
  const handleClick = useCallback(
    (e) => {
      if (!zoomable && onClick) {
        onClick(e);
      }
    },
    [zoomable, onClick]
  );
  const attachZoom = useCallback(
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
  useEffect2(() => {
    if (!zoom) {
      setZoom(mediumZoom());
    }
  }, [zoom]);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref,
      style: fixOpacityIgnoreHidden ? fixOpacityIgnoreHiddenStyle : style,
      className: classNames("flex items-center justify-center relative", className),
      onClick: handleClick,
      children: [
        ratio && /* @__PURE__ */ jsx3("div", { className: "", style: { paddingBottom: 1 / ratio * 100 + "%" } }),
        (isCached || inViewport) && /* @__PURE__ */ jsx3(
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
        typeof placeholder !== "boolean" && !isCached && delaying && /* @__PURE__ */ jsx3(
          "div",
          {
            className: classNames(
              "absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000",
              loading ? "opacity-100" : "opacity-0"
            ),
            children: placeholder
          }
        ),
        placeholder === true && !isCached && hash && delaying && /* @__PURE__ */ jsx3(
          BlurImage,
          {
            hash,
            className: classNames(
              "!absolute !inset-0 !w-full !h-full transition-opacity duration-1000",
              loading ? "opacity-100" : "opacity-0"
            )
          }
        ),
        placeholder === true && !isCached && !hash && color && delaying && /* @__PURE__ */ jsx3(
          "div",
          {
            style: { background: color },
            className: classNames(
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
export {
  Button,
  Image,
  MultiInput
};
