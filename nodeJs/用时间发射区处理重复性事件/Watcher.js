/**
 * Created by richu on 2016/10/12.
 */

function Watcher(watchDir,processedDir){
    this.watchDir=watchDir;
    this.processedDir=processedDir;
}

var events=require("event"),
    util=require("util"),
    fs=require("fs"),
    watchDir="./watch",
    processedDir="./done";

util.inherits(Watcher,events.EventEmitter);

Watcher.prototype.watch=function(){
    var watcher=this;
    fs.readdir(this.watchDir,function(err,files){
        if(err) return;
        for(var index in files){
            watcher.emit("process",files[index])
        }
    });
};
Watcher.prototype.start=function(){
    var watcher=this;
    fs.watchFile(watcher,function(){
        watcher.watch();
    });
};

/**
*
* 某一个函数继承event.EventEmitter函数里面的东西
 *     util.inherits(test,event.EventEmitter)
*      test.prototype=new event.EventEmitter();
* 这两个是等价的
 *    读取文件 然后用test.emit("event",options)
 *    发送到事件列队，然后添加事件就可以用了
*       （但是总是有一个系统事件来进行绑定，但是这个事件绑定也不自由，总感觉和嵌套关系差不多）；
 *     还有下一个章节，异步开发的难题，这个就是用立即执行的函数包一层，来达到不会污染变量的问题，
 *     （感觉用es6的let就能解决）还没试
 *  */

var wacther=new Watcher(watchDir,processedDir);

watcher.on("process",function(files){
    var watchFile= this.watchDir+"/"+files;
    var processedFile=this.processedDir+"/"+files.toLowerCase();

    fs.rename(watchFile,processedFile,function(err,data){
            if(err) return
    });
});


