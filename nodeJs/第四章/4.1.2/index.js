/**
 * Created by richu on 2016/10/18.
 */

var http=require("http");
//require:��Ҫ��Ҫ��
//request:������Ҫ�������飬response:��Ӧ���ش�
var server=http.createServer(function(request,response){
    //response.write();
    var body="hello";
    response.setHeader("Content-Length",body.length);
    response.setHeader("Content-Type","text/plain");
    response.statusCode=304;
    response.end(body);
}).listen(8080);

