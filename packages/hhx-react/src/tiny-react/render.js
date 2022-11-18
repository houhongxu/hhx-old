let nextUnitOfWork = null; //下一个工作单元
let wipRoot = null; // fiber执行树
let currentRoot = null; // 当前浏览器渲染的fiber树
let deletions = []; // 需要删除的fiber节点数组
let wipFiber = null; // 执行中的fiber
let hooksIndex = null; // hooks序号
// 判断条件
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
const isGone = (next) => (key) => !(key in next);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
/**
 * 更新当前浏览器渲染的dom的属性函数
 * @description: 根据属性是否变化更新当前浏览器渲染的dom
 * @param {*} dom
 * @param {*} prevProps
 * @param {*} nextProps
 */
const updateDom = (dom, prevProps, nextProps) => {
  // 移除事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => isGone(nextProps)(key) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 移除属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((name) => (dom[name] = ""));
  // 新增属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => (dom[name] = nextProps[name]));
  // 新增事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

/**
 * 创建真实dom的函数
 * @description: 转换fiber节点为真实dom
 * @param {*} fiber
 * @return {*}
 */
const createDom = (fiber) => {
  // 文本类型的节点单独创建
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  // 更新真实dom
  updateDom(dom, {}, fiber.props);

  return dom;
};

const commitDelection = (fiber, domParent) => {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDelection(fiber.child, domParent);
  }
};

/**
 * 提交的遍历转换函数
 * @description:根据标签将fiber执行树遍历并转换为真实dom树
 * @param {*} fiber
 */
const commitWork = (fiber) => {
  if (!fiber) return;

  // 跳过函数组件(因为函数组件仅仅处理和组合html dom)，拿到html dom
  let domParentFiber = fiber.parent;

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.dom;

  // 根据标签更新dom树
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDelection(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

/**
 * 提交fiber执行树函数
 * @description: 转换fiber执行树为真实dom树并提交给浏览器
 */
const commitRoot = () => {
  // 删除需要删除的fiber节点数组
  deletions.forEach(commitWork);

  // 转换fiber执行树为真实dom树
  commitWork(wipRoot.child); // ! child是fiber的属性指向的是fiber节点，props.children是虚拟dom的属性，转换为fiber后保留,指向的是子数组

  // 记录当前浏览器渲染的树
  currentRoot = wipRoot;

  // 置空fiber执行树
  wipRoot = null;
};

/**
 * 转换fiber子节点的函数
 * @description: 转换虚拟dom节点为fiber节点，并根据与当前浏览器渲染的节点对比添加处理标签
 * @param {*} wipFiber
 * @param {*} elements
 */
const reconcileChildren = (wipFiber, elements) => {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || !!oldFiber) {
    const element = elements[index];
    let newFiber = null;
    const isSameType = oldFiber && element && oldFiber.type === element.type;

    if (isSameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (!isSameType && element) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (!isSameType && oldFiber) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
};

export const useState = (initial) => {
  const oldHook = wipFiber?.alternate?.hooks?.[hooksIndex];

  // 如果有旧值则不初始化
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  // 如果有旧值则更新最新的旧值
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action instanceof Function ? action(hook.state) : action;
  });

  // 将新值压入队列
  const setState = (action) => {
    hook.queue.push(action);
    // 初始化fiber执行树的根节点为浏览器渲染的fiber树的根节点
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    // 需要删除的fiber节点数组置空
    deletions = [];

    // 工作单元初始化为fiber执行树的根节点
    nextUnitOfWork = wipRoot;
  };

  wipFiber.hooks.push(hook);
  hooksIndex++;

  return [hook.state, setState];
};

const updateFunctionComponent = (fiber) => {
  wipFiber = fiber;
  hooksIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)]; // type是一个函数组件，运行这个函数会返回子组件，所以只能有一个子组件
  reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 转换当前fiber节点子节点的虚拟dom为fiber节点
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
};

/**
 * 执行工作单元的函数
 * @description: 执行当前工作单元并返回下一个
 * @param {*} fiber
 */
const performUnitOfWork = (fiber) => {
  // 执行当前任务单元:fiber节点=>真实dom节点
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 按子兄叔顺序返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
};

/**
 * 工作流
 * @description: 确保浏览器空闲时执行工作单元
 */
const workLoop = (deadline) => {
  let shouldYield = false;

  // 存在下一个工作单元 且 存在空余时间（浏览器不在执行）
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行当前工作单元并获取下一个工作单元
    shouldYield = deadline.timeRemaining() < 1; // 浏览器当前帧剩余时间<1=>浏览器将要执行
  }

  // 不存在下一个工作单元 且 存在fiber执行树（fiber执行树遍历完毕）
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
};
requestIdleCallback(workLoop);

/**
 * 渲染函数
 * @param {*} element
 * @param {*} container
 */
export const render = (element, container) => {
  // 初始化fiber执行树的根节点
  wipRoot = {
    dom: container,
    props: {
      children: [element], // 子节点仍然是element虚拟dom
    },
    alternate: currentRoot,
  };

  // 需要删除的fiber节点数组置空
  deletions = [];

  // 工作单元初始化为fiber执行树的根节点
  nextUnitOfWork = wipRoot;
};
