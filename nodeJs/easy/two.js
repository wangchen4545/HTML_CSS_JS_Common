/**
 * Created by wangchen8 on 2016/9/29.
 */
var http=require("http");
var server=http.createServer();
server.on("request",function(req,res){
    res.writeHead(200,{'Content-Type':"test/plain"});
    res.end();
    console.log(1111)
});
server.listen(8080);
