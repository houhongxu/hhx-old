/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
// type是react组件，createElement返回的是react element
export function createElement(type, config, children) {
  let propName

  // Reserved names are extracted
  const props = {}

  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    // 检查ref
    if (hasValidRef(config)) {
      ref = config.ref

      if (__DEV__) {
        warnIfStringRefCannotBeAutoConverted(config)
      }
    }
    // 检查key
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source
    // Remaining properties are added to a new props object
    for (propName in config) {
      // 将config中保留属性（key,ref,__self,__source）外的属性赋值给props
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray)
      }
    }
    props.children = childArray
  }

  // Resolve default props
  // 类组件的defaultprops赋值
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }
  if (__DEV__) {
    if (key || ref) {
      const displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type
      if (key) {
        defineKeyPropWarningGetter(props, displayName)
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName)
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    // 合法的react element对象标志
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  }

  if (__DEV__) {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    })
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    })
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    })
    if (Object.freeze) {
      Object.freeze(element.props)
      Object.freeze(element)
    }
  }

  return element
}
