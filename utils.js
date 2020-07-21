const types = obj => {
  const str = Object.prototype.toString.call(obj)
  const reg = /\s(.+)(?=\])/
  return str
    .match(reg)[1]
    .toLowerCase()
}

module.exports = {
  types
}