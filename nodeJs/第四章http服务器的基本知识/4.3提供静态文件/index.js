/**
 * Created by richu on 2016/10/19.
 */

var http=require("http"),
    parse=require("url").parse,
    join=require("path").join;
    fs=require("fs");

var root=__dirname;

http.createServer(function(resquest,response){

    var url=parse(resquest.url);
    var path=join(root,url.pathname);
    //ÎÄ¼şÁ÷
    var stream=fs.createReadStream(path);

    stream.on("data",function(chunk){

    });
    stream.on("end",function(){
        response.end();
    })
}).listen(8080);
