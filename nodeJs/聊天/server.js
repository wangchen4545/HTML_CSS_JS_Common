/**
 * Created by Administrator on 2016/10/5.
 */

const http=require("http"),
       fs=require("fs"),
       path=require("path"),
       mime=require("mime");
var cache={};

var chatServer=require("./lib/chat_server");
chatServer.listen(server);

function send404(response){
    response.writeHead(404,{"Content-Type":"text/plan"});
    response.write("error 404:response not found");
    response.end();
}
function sendFile(response,filePath,fileContents){
    response.writeHead(
        200,
        {"content-Type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}
function serveStatic(response,cache,absPath){
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    }else{
        console.log(absPath)
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response)
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data);
                    }
                });
            }else{
                send404(response);
            }
        })
    }
}
var server=http.createServer(function(request,response){
    var filePath=false;
    //console.log(request.url);

    if(request.url=="/"){
        filePath="public/index.html"
    }else{
        filePath="public"+request.url;
    }
    var absPath="./"+filePath;
    serveStatic(response,cache,absPath);
});
server.listen(8080,function(){
    console.log(111)
})






