module.exports = function (code) {
  const json = typeof code === 'string' ? code : JSON.stringify(code)
  return `module.exports = ${json}`
}
