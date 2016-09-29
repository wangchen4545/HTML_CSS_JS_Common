/**
 * Created by wangchen8 on 2016/9/29.
 */

var fs=require('fs');

fs.readFile("tsconfig.json",function(err,data){
    console.log(data);
    if(err){
        console.log(err)
    }
});


