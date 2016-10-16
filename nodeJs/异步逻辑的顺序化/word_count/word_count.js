/**
 * Created by richu on 2016/10/16.
 */

const fs=require("fs");
var completedTasks= 0,
      tasks=[],
      wordCounts={},
      filesDir="./";

function checkIfComplete(){
    completedTasks++;
    if(completedTasks==tasks.length){
        for(var index in wordCounts){
            //console.log(index+":"+wordCounts[index])
        }
    }
}

function countWorksInText(text){
    var works=text.toString().toLowerCase().split(/\W+/).sort();

    for(var index in works){
        var word=works[index];
        if(word){
            wordCounts[word]=(wordCounts[word])?wordCounts[word]+1:1
        }
    }
}
fs.readdir(filesDir,function(err,files){
    if(err) throw err;
    for(var index in files){
        var task=(function(files){
            return function(){
                fs.readFile(files,function(err,text){
                   if(err) throw err;
                    countWorksInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir+"/"+files[index])
        console.log(filesDir+"/"+files[index])
        tasks.push(task)
    }
    for(var index in tasks){
        tasks[index]();
    }
});

