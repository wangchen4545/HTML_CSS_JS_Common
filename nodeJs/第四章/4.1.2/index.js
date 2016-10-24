/**
 * Created by richu on 2016/10/18.
 */

var http=require("http");
//require:需要，要求
//request:请求，需要，申请书，response:反应，回答
var server=http.createServer(function(request,response){
    //response.write();
    var body="hello";
    response.setHeader("Content-Length",body.length);
    response.setHeader("Content-Type","text/plain");
    response.statusCode=304;
    response.end(body);
}).listen(8080);

