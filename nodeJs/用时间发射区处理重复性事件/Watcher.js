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
* ĳһ�������̳�event.EventEmitter��������Ķ���
 *     util.inherits(test,event.EventEmitter)
*      test.prototype=new event.EventEmitter();
* �������ǵȼ۵�
 *    ��ȡ�ļ� Ȼ����test.emit("event",options)
 *    ���͵��¼��жӣ�Ȼ������¼��Ϳ�������
*       ������������һ��ϵͳ�¼������а󶨣���������¼���Ҳ�����ɣ��ܸо���Ƕ�׹�ϵ��ࣩ��
 *     ������һ���½ڣ��첽���������⣬�������������ִ�еĺ�����һ�㣬���ﵽ������Ⱦ���������⣬
 *     ���о���es6��let���ܽ������û��
 *  */

var wacther=new Watcher(watchDir,processedDir);

watcher.on("process",function(files){
    var watchFile= this.watchDir+"/"+files;
    var processedFile=this.processedDir+"/"+files.toLowerCase();

    fs.rename(watchFile,processedFile,function(err,data){
            if(err) return
    });
});


