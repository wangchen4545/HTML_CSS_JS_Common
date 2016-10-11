/**
 * Created by richu on 2016/10/11.
 */


//const net=require("net");
//
////var server=net.createServer(function(socket){
////    socket.on("data",function(data){
////        socket.write(data);
////    });
////}).listen(8080);
//
//var server=net.createServer(function(socket){
//    socket.once("data",function(data){
//        socket.write(data);
//    });
//}).listen(8080);


const EventEmitter=require("events").EventEmitter;
