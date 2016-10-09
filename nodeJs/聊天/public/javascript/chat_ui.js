/**
 * Created by Administrator on 2016/10/5.
 */
function processUserinput(chatApp,socket){
    var message=$(".send_message").val();
    var systemMessage;

    if(message.charAt(0)=="/"){
        systemMessage=chatApp.processCommand(message);
        if(systemMessage){
            $("#messages").append(divEscapedContentElement(systemMessage));

        }else{
            chatApp.sendMessage($("#room").text(),message);
            $("#message").append(divEscapedContentElement(message));
            $("#message").scrollTop($("#message").prop("scrollHeight"))
        }
    }
    $("#send_message").val("");
}

var socket=io.connect();

$(function(){
    var charApp=new Chat(socket);
    socket.on("nameResult",function(result){
        var message;
        if(result.success){
            message="you are now know as"+result.name+"."
        }else{
            message=result.message;
        }
        $("#message").append(divEscapedContentElement(message));
    });

    socket.on("joinResult",function(result){
        $("#room").text(result.room);
        $("#message").append(divEscapedContentElement("Room chengd"));
    });
    socket.on("message",function(){
       var newElement=$("<div></div>").text(message.text);
        $("#message").append(newElement);
    });
    socket.on("rooms",function(rooms){
        $("#room_list").empty();

        for(var room in rooms){
            room=rooms.substring(1,room.length);
            if(room != ""){
                $("#room-list").append(divEscapedContentElement(room));
            }
        }
        $("#room_list div").click(function(){
            charApp.processCommand("/join "+$(this).text());
            $(".send_message").focus()
        });
    });
    setInterval(function(){
        socket.emit("rooms");

    },1000);

    $(".send_message").focus()

    $(".send_form").submit(function(){
        processUserinput(charApp,socket);
        return false
    });
});
















