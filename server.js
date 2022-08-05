var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\n比如：node server.js 8888 ')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
   
  console.log('收到新请求！路径（带查询参数）为：' + pathWithQuery)

  response.statusCode = 200
  
  // 默认首页为 /index.html
  // 文件路径
  const filePath=path ==='/' ? '/index.html' : path
  let content
  try{
    content=fs.readFileSync(`./public${filePath}`)
  }catch(error){
    content='文件不存在'
    response.statusCode=404   
  }
  // suffix:后缀
  let index=filePath.indexOf('.')
  const suffix=filePath.substring(index)
  // 哈希表：文件类型
  const fileTypes={
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.xml':'text/xml',
    '.json':'text/json',
    '.jpg':'image/jpeg',
    '.png':'image/png'
  }
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
  response.write(content)
  response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听端口 ' + port + ' 成功\n请用Ctrl加左键单击，打开 http://localhost:' + port)