/**
 * Created by richu on 2016/10/20.
 */

var http=require("http");
var items=[];

var servers=http.createServer(function(request,response){

    if(request.url="/"){
        switch(request.method){
            case "GET":
                show(response);
                break;
            case "POST":

                break;
            default :

                break
        }
    }
});

function show(res){
    var html='<html><head lang="en"><meta charset="UTF-8"><title></title></head><body>'
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
    res.setHeader("Content-Type","text/plan");
//    还有个len 就算了吧，总是错误的
    res.end();
}

