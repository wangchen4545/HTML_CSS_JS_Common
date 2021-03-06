/**
 * Created by Administrator on 2016/11/14.
 */
var qs=require("querystring");

exports.sendHtml=function(req,html){
    req.setHeader("Content-Type","text/html;charset=utf-8");
/*    req.setHeader("Content-Lengt/!**!//!**!/h",Buffer.byteLength(html));*/
    req.end(html);
};

exports.parseReceivedDate=function(req,cd){
    var body="";
    req.setEncoding="utf8";
    req.on("data",function(chunk){
        body+=chunk;
    });
    req.on("end",function(){
        var data=qs.parse(body);
        cd(data);
    });
};
exports.actionForm=function(id,path,lable){
    var html='<form action="'+path+'" method="post">'
        +'<input type="hidden" name="id" value="'+id+'"/>'
        +'<input type="submit" value="'+lable+'"/>'
        +'</form>';
    return html;
};

exports.add=function(db,request,response){
    exports.parseReceivedDate(request,function(work){
        db.query("DELETE FROM work id=?",
        [work.id],
        function (err){
            /*if(err) throw err;*/
            exports.show(db,response)
        }
        )
    });
};
exports.delete=function(db,request,response){
    exports.parseReceivedDate(request,function(work){
        db.query(
            "DELETE FROM work WHERE id=?",
            [work.id],
            function(err){
                /*if(err) throw err;*/
                exports.show(db,response)
            }
        )
    });
};
exports.archive=function(db,request,response){
    exports.parseReceivedDate(request,function(work){
        db.query(
            "UPDATE work SET archived=1 WHERE id=?",
            [work.id],
            function(err){
                /*if(err) throw err;*/
                exports.show(db,response)
            }

        )
    });
};

exports.show=function(db,request,showArchived){
    var query="SELECT * FROM work "+
            "WHERE archived=?"+
            "ORDER BY date DESC";
    var archiveValue=(showArchived)?1:0;

    db.query(
        query,
        [archiveValue],
        function(err,rows){
            /*if(err) throw err;*/
            var html=(showArchived)? "" :"<a href='/archived'>Archived Work</a></br>";

            html+=exports.workHitlistHtml(rows);
            html+=exports.workFormHtml();

            exports.sendHtml(request,html)
        }
    )
};
exports.showArchived=function(db,response){
    exports.show(db,response,true);
};
exports.workHitlistHtml=function(rows){
    var html="<table>";

    for(var i in rows){

        html+="<tr>";
        html+="<td>"+rows[i].date+"</td>";
        html+="<td>"+rows[i].hours+"</td>";
        html+="<td>"+rows[i].description+"</td>";
        if(!rows[i].archived){
            html+="<td>"+exprots.workArchiveForm(rows[i].id)+"</td>";
        }
        html+="<td>"+exprots.workDeleteForm(rows[i].id)+"</td>";
        html+="</tr>";
        /*

        <td></td>
        <td></td>
        <td></td>
        </tr>*/

    }
    html+="</table>";

    return html;
};


exports.workFormHtml=function(){
    var html='<form method="POST" action="/">'
        + '<p>date<input type="text" name="date"/></p>'
        + '<p>Hours <input type="text" name="hours"/></p>'
        + '<p>desc <textarea name="desc"></textarea></p>'
        + '<input value="Add" type="submit"/>'
        + '</form>';
    return html
};
exports.workArchiveForm=function(){

    return exports.actionForm(id,'/archives','Archive');

};

exports.worDeleteForm=function(){
    return exports.actionForm(id,'/delete','Delete')
};


