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
                        console.log("û���ҵ�index.html");
                        response.end("Server Error");
                    }else{
                        var tmpl= data.toString();
                        //toString ת���ַ���
                        var html=tmpl.replace("%",titles.join("<li>"));
                        //��������Զ���ȫ�ˡ�������
                        console.log(titles.join("<li>"));

                        //var html=tmpl.replace("%",titles.join("<li></li>"));
                        //���ѡ������ֻ�ǵ������ַ������ӻ�����⣬���û���Ӧ��ѭ��һ��

                        response.writeHead(200,{"ContentType":"text/html"});
                        response.end(html)
                    }
                });
            }
        });
    }else{

    }
}).listen(8080,function(){
    console.log("��ʼ����")
});