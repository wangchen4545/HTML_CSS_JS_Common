/**
 * Created by wangchen8 on 2016/9/29.
 */
var http=require("http");
var fs=require("fs");
// var server=http.createServer();


http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"image/jpg"});
    fs.createReadStream("test.jpg").pipe(res);
}).listen(3000);
/*server.on("request",function (req,res){
    res.writeHead(200,{"Content-Type":"image/png"});
    fs.createReadStream("test.jpg").pipe(res);
});
server.lister(3000);*/
console.log(111);



