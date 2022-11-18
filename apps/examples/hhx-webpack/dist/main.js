
    const webpackModules=[
  (function(module,webpackExports,webpackRequire){
    const sum = webpackRequire(1);
console.log(sum(1, 2));
  })
  ,
  (function(module,webpackExports,webpackRequire){
    module.exports = (x, y) => x + y;
  })
  ]

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
  