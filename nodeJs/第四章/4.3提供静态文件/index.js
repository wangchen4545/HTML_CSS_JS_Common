/**
 * Created by richu on 2016/10/19.
 */

var http=require("http"),
    parse=require("url").parse,
    join=require("path").join,
    fs=require("fs");

var root=__dirname;
/*
http.createServer(function(resquest,response){

    var url=parse(resquest.url);
    var path=join(root,url.pathname);
    //文件流
    var stream=fs.createReadStream(path);

    stream.on("data",function(chunk){

    });
    stream.on("end",function(){
        response.end();
    })
}).listen(8080);*/


//http.createServer(function(resquest,response){
//
//    var url=parse(resquest.url);
//    var path=join(root,url.pathname);
//    //文件流
//    var stream=fs.createReadStream(path);
//
//    stream.pipe(response);
//    stream.on("error",function(){
//        response.statusCode=500;
//
//        response.end();
//    });
//
//}).listen(8080);


var server=http.createServer(function(resquest,response){
    var url=parse(resquest.url);
    var path=join(root,url.pathname);

    fs.stat(path,function(err,stat){
        if(err){
            if(err.code=="ENOENT"){
                response.statusCode=404;
                response.end("404");

            }else{
                response.statusCode=500;
                response.end();
            }
        }else{
            //response.setHeader("Content-Length",stat.size);
            var stream=fs.createReadStream(path);

            stream.pipe(response);

            stream.on("error",function(){
                response.statusCode=500;
                response.end();
            });
        }
    });
}).listen(8080);