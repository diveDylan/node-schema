'use strict'
const fs = require('fs')
const path = require('path')
const { types } = require('./utils')

/**
 * @description 读取目录下所有JSON文件转成schema格式
 * @param { string } folder 目录名城
 * @return { void }
 */
function transferJSONFilesToSchema(folder) {
  let files = fs.readdirSync(folder)
  files.forEach(filename => {
    const data = fs.readFileSync(folder + '/' + filename, 'utf8')
    transferCore(data, filename)
  })
}

const schemaTemplate = {
  "$schema": "http://json-schema.org/draft-04/schema#"
}

/**
 * @description json 转schema并写入schema目录
 * @param { object } jsonData
 * @param { string } filename
 * @return { void } 返回空 
 */
function transferCore(jsonData, filename) {
  const { json, title, description } = jsonData
  let schema = {}
  schema.title = title
  schema.description = description
  schema.required = Object.keys(json)
  schema.type = types(json)
  schema.properties = {}
  schema.required.forEach(prop => {
    schema.properties[prop] = {
      "type": types(json[prop]),
      "description": ""
    }
  })
  fs.writeFileSync(
    `./schema/${filename}.json`,
    JSON.stringify(Object.assign(schema, schemaTemplate), null, '\t')
  )
}

function run() {
  transferJSONFilesToSchema(path.resolve(__dirname, 'json'))
}

run()