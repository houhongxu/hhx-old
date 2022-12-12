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
    "Read the docs",
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
export {
  Button,
  MultiInput
};
