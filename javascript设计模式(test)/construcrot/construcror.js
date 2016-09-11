
var newObject={};

var newObject= new Object();
/*
*ECMAScript3.0 方法
* */
// 1、“.” 的语法
//设置属性

newObject.morekey="hello";

var key=newObject.morekey;

// 2、“[]”（方括号方法）

newObject["morekey"]="hello";

var key = newObject["morekey"];

// 3、只适用于ECMAscript5的方法, Object.defineProperty

Object.defineProperty(newObject,"morekey",{
    value:"hello",
    writable:true,
    enumerable:true,
    configurable:true
});
/*
*   4、书里说觉得麻烦的话，可以用以下的方式
*
*   （下面的东西没有搞明白，明天再说）
*
* */

//设置属性先创建一个person对象；

var defineProp=function(obj,key,value){
    config.value=value;
    Object.defineProperty(obj,key,value);
};


var person=Object.create(null)  ;

//然后设置各个属性

defineProp(person,"car","delorean");
defineProp(person,"dateOfBirth","1981");
defineProp(person,"hasBeard","false");

//设置属性；

Object.defineProperties(newObject,{
    "somekey":{
        value:"hello",
        writable:true
    },
    "anotherKey":{
        value:"Foo bar",
        writable:false
    }
});
//1、2 的获取属性的方法可以获取到3、4方式使用的属性




/**
*  访问
* */