/**
 * Created by richu on 2016/10/18.
 */
var http=require("http");
var url=require("url");
var items=[];
var server=http.createServer(function(resquest,response){
    resquest.setEncoding="utf-8";
    var item="";

    switch(resquest.method){
        case "POST":
            resquest.on("data",function(chunk){
                item+=chunk;
            });
            resquest.on("end",function(){
                items.push(item);
                response.end(item)
            });
            break;
        case "GET":
            var body=items.map(function(item,i){
                console.log(this);
                return i+")"+item;

            },testThis).join("\n");
            resquest.on("data",function(chunk){
                item+=chunk;
            });
            //response.setHeader("Content-Length",new Buffer(body));
            response.setHeader("Content_Type","text/plan,charset='utf-8'");
            resquest.on("end",function(){
                items.push(item);
                response.end()
            });
            break;
        case "DELETE":
            var path=url.parse(request.url).pathname;
            var i=parent(path.slice(1),10);
            if(isNaN(i)){
                response.status=400;
                response.end("inavlid")
            }else if(!items[i]){
                response.status=404;
                response.end("inavlid");
            }else{
                items.splice(i,1)
            }
            break;

    }

}).listen(8080);

function testThis(){

}