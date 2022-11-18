import fs from 'fs'
import url from 'url'
import http from 'http'
import https from 'https'
import { JSDOM } from 'jsdom'
import iconv from 'iconv-lite'
import nodejieba from 'nodejieba'
// 开启服务
// http
//   .createServer((req, resp) => {
//     resp.write('xxx')
//     resp.end()
//   })
//   .listen(9001)
let count = 1

// 请求
const request = async (sUrl: string, callback: (data: any) => void) => {
  const urlObj = url.parse(sUrl)

  const options: http.RequestOptions = {
    hostname: urlObj.hostname,
    path: urlObj.path,
  }
  const _callback = (res: http.IncomingMessage) => {
    if (res.statusCode === 200) {
      const arr: Array<any> = []
      res.on('data', (chunk: any) => {
        arr.push(chunk)
      })
      res.on('end', () => {
        typeof callback === 'function' && callback(arr)
      })
    } else if (res.statusCode === 302 || res.statusCode === 301) {
      console.log('count', count++, res.headers.location)
      if (res.headers.location) {
        request(res.headers.location, callback)
      } else {
        console.log('no location')
      }
    }
  }

  let req: http.ClientRequest
  if (urlObj.protocol === 'http:') {
    req = http.request(options, _callback)
  } else {
    req = https.request(options, _callback)
  }
  req.end()
  req.on('error', () => {
    console.log('error')
  })
}

const str = 'https://www.xs8.cn/chapter/22247838401371304/59733788305371716'
// 发起请求
request(str, (data: Array<any>) => {
  let html
  const buffer = Buffer.concat(data)

  // 解码
  if (buffer.toString().indexOf('\r\n') > -1) {
    html = iconv.decode(buffer, 'gbk')
  }
  html = buffer.toString()

  // 生成jsdom
  const dom = new JSDOM(html)
  const str = dom.window.document
    .querySelector('.read-content')
    ?.innerHTML.replace(/<style>[^>]+>/g, '')
    .replace(/<[^>]+>/g, '')

  // 分词
  const map: { [key: string]: number } = {}
  const arr = nodejieba.cut(str ?? '')
  const res = arr
    .map((item) => item.trim())
    .filter((item) => !!item)
    .forEach((item) => (map[item] ? map[item]++ : (map[item] = 1)))

  const mapArr = Object.entries(map).map((item) => ({ key: item[0], count: item[1] }))
  console.log(mapArr.filter((item) => item.count > 1).sort((a, b) => b.count - a.count))

  // 生成html
  fs.writeFile('spider.html', html, 'utf8', () => {
    console.log('done')
  })
})
