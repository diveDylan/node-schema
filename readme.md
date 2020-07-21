### Document
a node schema tool

### Usage
```bash
cd json 
mkdir <your_json_file>
cd root
node app
```

### JSON
```json
{
  "title": "schema的title",
  "description": "schema description",
  "json": {
  }
}
```

### Schema

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "响应格式",
    "description": "响应格式规范",
    "type": "object",
    "properties": {
       "code": {
           "type": "string"
           "description": "响应状态码的枚举，具体见后端定义的enum response code"
        },
        "message": {
            "type":  "string",
            "description": "响应的信息，一般是针对整个响应的概况，成功，错误信息等"
        },
        "data": {
            "type": "object | array",
            "description": "响应的具体内容"
         }
    },
    "required": [
        "code",
        "message",
        "data"
    ]
}



```
