/**
 * Created by Administrator on 2016/10/5.
 */
const scoketio=require("socket.io");
var io;
var guestNumber=1;
var nikeNames={};
var namesUsed=[];
var currentRoom{};

exports.listen=function(server){
    io=scoketio.listen(server0)
    io=set("log leve1",1);
    io.scokets.on("connection",funcion(){
        guestNumber=assignGuestName(socket,guestNumber,nikeName,namesUsed)
        joinRoom(socket,"lobby");
        handleMessageBroadcasting(socket,nikeName);
        handleNameChangeAttempts(socket,nikeName,nameUsed);
        handleRoomJoining(socket);
        socket.on("rooms",function(){
            socket.emit("rooms",io.scokets.manager.rooms);
        });
        handleClientDisconnection(scoket,nikeName,nameUsed);
    });
}
