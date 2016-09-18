/*

var newObject={};

var newObject= new Object();
/!*
*ECMAScript3.0 方法
* *!/
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
/**
*   4、书里说觉得麻烦的话，可以用以下的方式
*
*   （下面的东西没有搞明白，明天再说）
*
**/
var newObject={};

/**
*
*
* */

//设置属性先创建一个person对象；
/**
* 定义一个的属性值
* defineProperty(Object,"name",value)
*   value:{
*       configurable: false, //是否可以删除属性,是否可以修改属性的 writable 、 enumerable 、 configurable 属性。
        enumerable: false,   //是否可以枚举,是否可以通过for...in 遍历到，是否可以通过 Object.keys() 方法获取属性名称
        writable: false,     //是否可以对属性进行重新赋值
        value: null,　　　　　//属性的默认值
        set: undefined,     //属性被赋值时,此方法被自动调用
        get: undefined      //属性被读取时,此方法被自动调用
*   }
*   下面是定义多个的属性值
*   defineProperties{Object,
*       {
*           "age":{
*               value:"hello"
*           },
*           sex:{
*              value:"hello"
*           }
*       }
*   }
* */
var defineProp=function(obj,key,value){
    var config=obj;
    //设置配置文件
    config.value=value;
    Object.defineProperty(obj,key,config);
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

//这些方法甚至可以用于继承，

var driver=Object.create(person);

defineProp(driver,"topSpeed","100mph");

console.log(person.car);

console.log(driver.topSpeed);


/**
*  访问
* */