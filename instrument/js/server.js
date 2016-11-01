/**
 * Created by richu on 2016/11/1.
 */
var http=require("http");
var fs=require("fs");
var str="<ul><li>1</li></ul>";
var server=http.createServer(function(request,response){

    fs.readFile("../test.html",function(err,data){

        request.setEncoding("utf8");
        //request.statusCode=200;
        response.writeHead(200,{"Set-cookie":"sid=wangchen"});
        var str=data.toString();

        response.end(str);

        console.log(str);
    })

}).listen(8080);

