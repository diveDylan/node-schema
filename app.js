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
  schemaProperty(json,schema)
  console.log(schema)
  fs.writeFileSync(
    `./schema/${filename}.json`,
    JSON.stringify(Object.assign(schema, schemaTemplate), null, '\t')
  )
}

function schemaProperty(obj, propertyObj ={}) {
  if(!propertyObj.properties) propertyObj.properties = {}
  propertyObj.properties.type = types(obj)
  propertyObj.properties.description = ""
  if (types(obj) === 'object') {
    // 对象格式转化
    Object.keys(obj).forEach(key => {
      propertyObj.properties[key] = {
        "type": types(obj[key]),
        "description": "",
      }
      schemaProperty(obj[key], propertyObj.properties[key])
    })
  }
  if (types(obj) === 'array') {
    // 数组schema转化
    propertyObj.properties.item = {
      type: types(obj[0]),
      description: "",
    }
    schemaProperty(arr[0],propertyObj.properties.item )
  }
  return propertyObj
  
}

function run() {
  transferJSONFilesToSchema(path.resolve(__dirname, 'json'))
}

run()