/**
 * Created by richu on 2016/10/12.
 */

var net=require("net"),
    events=require("events"),
    fs=require("fs"),
    http=require("http");

var channel=new events.EventEmitter();

var server=net.createServer(function(client){
    var data1=null;
    fs.readFile("./css.html",function(err,data){
        data=data.toString();
        client.on("data",function(){
            channel.emit("change",data);
        });
    });
    channel.on("change",function(data){
        console.log(data);
        channel.emit("send",data);
    });
    channel.on("send",function(data){
        console.log(data+1)
    });
}).listen(8080);

