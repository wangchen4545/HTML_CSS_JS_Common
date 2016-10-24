/**
 * Created by Administrator on 2016/10/24.
 */

var http=require("http");
var form=require("formidable");

var server=http.createServer(function(request,response){

    switch(request.method){
        case "GET":
            show(request,response);
            break;
        case "POST":
            up_data(request,response);
            break;

    }

});
function show(request,response){
    var html='<form action="\" method="post" enctype="multipart/form-data"> <p> <input type="text" name="name"/> </p> <p> <input type="file" name="file"/> </p> <p><input type="submit" value="ио┌В"/></p> </form>';
    response.setHeader("Content-Type","text/html");
    response.end(html)
}
function up_data(request,response){
    if(!isformData(request)){
        response.statusCode=400;
        response.end("404")
        return;
    }
}

function isformData(request){
    var type=request.headers["Content-type"] || "";

    return 0==type.indexOf("multipart/form-data");

}
