/**
 * Created by richu on 2016/8/11.
 */

'use strict';

//Promise异步编程
/*
*修改值错误
* */
//const a=234;
//const a=123465;
//console.log(a);

//const a={
//    name:'wc'
//};
//
//const a={
//    name='wm'
//}
//
//console.log(a)
//
//const a={
//    name:'wc'
//};
//
//const a={
//    age:111
//}
//
//console.log(a)

//成功
//*我的理解是不可以重新赋值，添加值，但是可以修改属性
// */
//const a={
//    fn:function(abc){
//        return abc
//    }
//};
//console.log(a.fn('123'));
/*
* 可以任意修改其值方法
* */
//let b={
//    fn:'abc'
//};
//b={
//    fn:'123456'
//};
//console.log(b);

/*箭头函数
*
*this的指向变了
* 用function的this指向的是c=object
* 而用箭头函数 this的指向是 window，也就是说少了函数的嵌套this的指向是父级,
*   使用定时器会改变this指向，但是如果用箭头函数并不会改变this的指向
* */
//var c={
//    fn:function(obj){
//        console.log(this);
//        console.log(obj)
//    }
//};
//c.fn('abc');
//
//var d={
//    fn:(obj)=>{
//        console.log(obj);
//        console.log(this);
//    }
//}
//d.fn('abc');

//var fn=()=>{
//
//}
//fn();

//不好使想要new出来对象踏实的用function fn(){}
//const a= 'abc';
//
//var fn=()=>{
//
//    this.text=a;
//}
////
////function fn(){
////    this.text=a;
////}
//console.log(new fn());




