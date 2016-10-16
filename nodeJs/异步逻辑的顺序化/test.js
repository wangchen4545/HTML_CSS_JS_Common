/**
 * Created by richu on 2016/10/16.
 */

var flow=require("nimble"),
    exec=require("child_process").exec;

function downloadNode(version,dest,cb){
    var url="http://nodejs.org/dist/node-v"+version+".tar.gz";
    var filePath=dest+"/"+version+".taz";
    exec("curl"+url+">"+filePath,cb)
}

flow.series([
    function (callback){
        flow.parallel([
            function (cb){
                console.log("donwload v4.4.2");
                downloadNode("4.4.2","/tmp",cb);
            },
            function (cb){
                console.log("donwload v4.4.2");
                downloadNode("4.4.2","/tmp",cb);
            }
        ],callback)
    },
    function(callback){
        console.log("create");
        exec(
            "tar cvf node_distros.tar /tmp/v4.4.2.taz /tmp/v4.4.3.taz",
            function (err,stdout,stderr){
                console.log("All done!")
                callback()
            }
        )
    }
]);
