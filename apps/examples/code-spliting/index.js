// 测试hash时引入
// import _ from 'lodash'
// console.log(_.get)

import('../axios').then((m) => {
  console.log('run axios')
})

// 第二次 import() 时不会再次加载 chunk
// import("./sum").then((m) => {
//   console.log(m.default(3, 4));
// });
