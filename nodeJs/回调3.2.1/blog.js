/**
 * Created by richu on 2016/10/11.
 *
 **/

 const http=require("http"),
       fs=require("fs");

http.createServer(function(require,response){
    if(require.url=="/"){
        fs.readFile("./titles.json",function(err,data){
            if(err){
                console.log("404");
                response.end("Server Error");
            }else{
               var titles=JSON.parse(data);
                console.log(titles);
                fs.readFile("./index.html",function(err,data){
                    if(err){
                        console.log("没有找到index.html");
                        response.end("Server Error");
                    }else{
                        var tmpl= data.toString();
                        //toString 转成字符串
                        var html=tmpl.replace("%",titles.join("<li>"));
                        //输出了是自动补全了。。。。
                        console.log(titles.join("<li>"));

                        //var html=tmpl.replace("%",titles.join("<li></li>"));
                        //如果选择这种只是单纯的字符串连接会出问题，觉得还是应该循环一下

                        response.writeHead(200,{"ContentType":"text/html"});
                        response.end(html)
                    }
                });
            }
        });
    }else{

    }
}).listen(8080,function(){
    console.log("开始监听")
});