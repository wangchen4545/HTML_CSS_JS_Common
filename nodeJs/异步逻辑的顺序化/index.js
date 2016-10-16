/**
 * Created by richu on 2016/10/13.
 */

var fs=require("fs"),
    request=require("request"),
    htmlparser=require("htmlparser"),
    configFileName="./res_feeds.txt";

function checkForRSSFile(){

    fs.exists(configFileName,function(exists){
        if(!exists){
            return next(new Error("configFileName"));
        }
        next(null,configFileName);
    })
}
function readRSSFile(configFileName){
    fs.readFile(configFileName,function(err,feedList){
        if(err) return next(err);
        feedList=feedList.toString().replace(/^\s+|\s+$/,"").split("\n");

        var random=Math.floor(Math.random()*feedList.length);
        next(null,feedList[random]);

    });
}
function downloadFeed(feedUrl){
    request({rui:feedUrl},function(err,res,body){
        if(err) return next(err);
        if(res.statusCode !=200){
            return next(new Error("不等于200"))
        }
        next(null,body)
    })
}
function parseRSSFeed(res){
    var handler=new htmlparser.RssHandler();
    var parser=new htmlparser.Parser(handler);


    parser.parseComplete(res);
    console.log(handler.dom);
    /*if(!handler.dom.items.length){
        return next(new Error("no RSS"))
    }*/
    //var item=handler.dom.items.shift();
    //console.log(item.title);
    //console.log(item.link);
}
var tasks=[checkForRSSFile,readRSSFile,downloadFeed,parseRSSFeed];
function next(err,resulte){
    //if(err) throw err;

    var currentsTask=tasks.shift();

    //shift 删除第一个值并且返回第一个值
    /*
    * var currentsTask=tasks.shift()；
    * currentTask其实就是第一个函数
    * */

    console.log(currentsTask);

    if(currentsTask){
        currentsTask(resulte)
    }
}

next();













