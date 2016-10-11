/**
 * Created by richu on 2016/10/11.
 *
 **/

/*只是blog文件的跳出嵌套*/

const http=require("http"),
      fs=require("fs");

var server=http.createServer(function(require,reponse){
    getTit(reponse)
}).listen(8080);

function getTit(reponse){
    fs.readFile("./titles.json",function(err,data){
        if(err) return error();
        getTemplate(JSON.parse(data.toString()),reponse)
    });
}
function getTemplate(tit,reponse){
    fs.readFile("./index.html",function(err,data){
        if(err) return error();
        formatHtml(tit,data.toString(),reponse)
    });
}
function formatHtml(tit,tmpl,reponse){
    var html=tmpl.replace("%",tit.join("<li></li>"));
    reponse.writeHead(200,{"Content-Type":"text/html"});
    reponse.end(html)
}
function error(err,response){
    console.log("server error");
    response.end("404");
}

