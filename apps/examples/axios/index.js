const { axios } = require('hhx-axios')

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: [1, 2, 3, 4],
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: '123笑死hhh',
//   },
// })

// const date = new Date()
// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     date: date,
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: '@:$, ',
//   },
// })

// axios({
//   method: 'get',
//   url: '/',
//   params: {
//     a: 'bisnull',
//     b: null,
//   },
// })

// axios({
//   method: 'get',
//   url: '/base#hash',
//   params: {
//     a: 'hash',
//   },
// })

// axios({
//   method: 'get',
//   url: '?a=1',
//   params: {
//     b: '2',
//   },
// })

// ---
// axios({
//   method: 'post',
//   url: 'http://httpbin.org/post',
//   data: {
//     a: 1,
//     b: 1,
//   },
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: 'http://httpbin.org/post',
//   data: arr,
// })

//---

// axios({
//   method: 'post',
//   url: 'http://httpbin.org/post',
//   data: {
//     a: 1,
//     b: 1,
//   },
// })

// axios({
//   method: 'post',
//   url: 'http://httpbin.org/post',
//   headers: {
//     'content-type': 'application/json',
//     Accept: 'application/json,text/plain,*/*',
//   },
//   data: {
//     a: 1,
//     b: 1,
//   },
// })

// const paramsString = 'q=UR:Utils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: 'http://httpbin.org/post',
//   data: searchParams,
// })

//---

axios({
  method: 'post',
  url: 'http://httpbin.org/post',
  data: {
    a: 1,
    b: 1,
  },
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: 'http://httpbin.org/post',
  responseType: 'json',
  data: {
    a: 2,
    b: 2,
  },
}).then((res) => {
  console.log(res)
})
