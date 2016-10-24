/**
 * Created by richu on 2016/10/20.
 */

var http=require("http");
var items=[];
var qs=require("querystring");
var servers=http.createServer(function(request,response){

    if(request.url="/"){
        switch(request.method){
            case "GET":
                show(response);
                break;
            case "POST":
                add(request,response);
                break;
            default :
                badRequest(response);
                break
        }
    }
}).listen(8080);

function show(res){
    var html='<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><title></title></head><body>'
    +'<h1>todo List</h1>'
    +'<ul>'
    +items.map(function(item){
        return "<li>"+item+"</li>"
    })
    +'</ul>'
    +'<form method="post" action="/">'
    +'<p><input type="text" name="item"/></p>'
    +'<p><input type="submit" value="add Item"/></p>'
    +'</form></body></html>';
    res.setHeader("Content-Type","text/html");
//    还有个len 就算了吧，总是错误的
    res.end(html);
}

function notFound(response){
    response.statusCode=404;
    response.setHeader("Content-Type","text/plain");
    response.end("not request");
}
function badRequest(response){
    response.statusCode=400;
    response.setHeader("Content-Type","text/plain");
    response.end("bad request")
}
function add(request,reponse){
    var body="";
    request.setEncoding("utf8");
    request.on("data",function(chunk){
        body+=chunk;
    });
    request.on("end",function(){
        var obj=qs.parse("body");
        items.push(obj.item);
        console.log(obj.item);
        show(reponse);
    })
}


















