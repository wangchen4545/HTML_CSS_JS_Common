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


const events=require("events"),
      net=require("net");


var channel=new events.EventEmitter();

channel.clients={};
channel.subscriptions={};

channel.on('join',function(id,client){
    this.clients[id]=client;
    this.subscriptions[id]=function(senderId,message){
        if(id!=senderId){
            this.clients[id].write(message);
        }
    };
    this.on("broadcast",this.subscriptions[id]);
});

channel.on("leave",function(id){

    channel.removeListener("broadcast",this.subscriptions[id]);

    channel.emit("broadcast",id,""+id+"Àë¿ª");
});

channel.on("shutdown",function(){
    channel.emit("broadcast","","down");
    channel.removeListener("broadcast",function(){
        console.log("detail")
    });
});




var server=net.createServer(function(client){
    var id=client.remoteAddress+":"+client.remotePort;
    channel.emit("join",id,client);
    client.on("data",function(data){
        data=data.toString();
        console.log(data)
        if(data=="s"){
            channel.emit("shutdown")
        }
        channel.emit("broadcast",id,data);
    });

    client.on("close",function(){
        channel.emit("leave",id)
    });
}).listen(8080);




