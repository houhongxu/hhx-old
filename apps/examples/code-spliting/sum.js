// 测试preload时引入
// setTimeout(() => {
//   import(
//     /* webpackChunkName: 'add' */
//     /* webpackPreload: true */
//     './add').then(m => {
//       console.log(m.default(3, 4))
//     })
// }, 3000000)

const sum = (...args) => args.reduce((x, y) => x + y)

export default sum
