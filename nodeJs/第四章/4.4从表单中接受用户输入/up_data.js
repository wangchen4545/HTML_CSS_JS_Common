/**
 * Created by Administrator on 2016/10/24.
 */

var http=require("http");
var formidable=require("formidable");

var server=http.createServer(function(request,response){

    switch(request.method){
        case "GET":
            show(request,response);
            break;
        case "POST":
            up_data(request,response);
            break;
    }
}).listen(8080);
function show(request,response){
    var html='<form action="\" method="post" enctype="multipart/form-data"> <p> <input type="text" name="name"/> </p> <p> <input type="file" name="file"/> </p> <p><input type="submit" value="ÉÏ´«"/></p> </form>';
    response.setHeader("Content-Type","text/html");
    response.end(html);
}
function up_data(request,response){
    if(!isformData(request)){
        response.statusCode=400;
        response.end("404");
        return;
    }
    var form=new formidable.IncomingForm();
    var mydate=new Date().getTime();
    form.on("field",function(field,value){
        //console.log(field);
        //console.log(value);
    });

    form.on("file",function(name,file){
        //console.log("name----",name);
        //console.log(file);
    });

    form.on("end",function(){
        response.end("updata_complete");

        console.log("currentTime"+mydate);
    });
    form.parse(request);
}

function isformData(request){
    var type=request.headers["content-type"] || " ";
    console.log(request.headers["content-type"]);

    return 0==type.indexOf("multipart/form-data");

}













