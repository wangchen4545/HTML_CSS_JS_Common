/**
 * Created by Administrator on 2016/10/5.
 */

var Chat=function(socket){
    this.socket=socket;
};
Chat.prototype.sendMessage=function(){
    var message={
        room:room,
        text:text
    };
    this.socket.emit("message",message);
};

Chat.prototype.changeRoom=function(room){
    this.socket.emit("join",{
        newRoom:room
    });
};
Chat.prototype.processCommand=function(command){
    var words=command.split(" ");
    var command=words[0].substring(1,words[0].length).toLowerCase();
    var message=false;

    switch (command){
        case "join":
            words.shift();
            var room=words.join(" ");
            this.changeRoom(room);
            break;
        case "nike":
            words.shift();
            var name=words.join(" ");
            this.sockets.emit("nameAttempt",name);
            break;
        default :
            message="un";
            break;
    }
    return message;
};
function divEscapedContentElement(message){
    return $('<div></div>').text(message)
}
function divSystemContentElement(message){
    return $('<div></div>').html('<i>'+message+'</i>');
}


