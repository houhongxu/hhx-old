const { axios } = require('hhx-axios')

axios({
  method: 'get',
  url: '/',
  params: {
    a: [1, 2, 3, 4],
  },
})

axios({
  method: 'get',
  url: '/',
  params: {
    a: '123笑死hhh',
  },
})

const date = new Date()
axios({
  method: 'get',
  url: '/',
  params: {
    date: date,
  },
})

axios({
  method: 'get',
  url: '/',
  params: {
    a: '@:$, ',
  },
})

axios({
  method: 'get',
  url: '/',
  params: {
    a: 'bisnull',
    b: null,
  },
})

axios({
  method: 'get',
  url: '/base#hash',
  params: {
    a: 'hash',
  },
})

axios({
  method: 'get',
  url: '?a=1',
  params: {
    b: '2',
  },
})
