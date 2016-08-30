/**
 * Created by richu on 2016/8/8.
 */

/**参数：obj:dom节点对象，name:样式（如：width）
*   注意获取参数的值 只是px，获取其他值需要自己进行计算，如rem
**/
function getStyle(obj,name){
    return parseInt(obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]);
}
/**参数：obj：dom节点对象，className：名字
 *  注意只能添加一个className;不能添加 'div1 div2',类似这种
 * */
function addClass(obj,className){
    if(obj.classList){
        obj.classList.add(className);
    }else{
        if(!hasClass(obj,className)){
            obj.className+=className
        }
    }
}
function hasClass(obj,className){
    var re=new RegExp(className);
    if(obj.classList){
      return obj.classList.contains(className);
    }else{
      return re.test(obj.className);
    }
}
function removeClass(obj,className){
    var re=new RegExp(className);
    if(obj.classList){
        obj.classList.remove(className);
    }else{
        if(hasClass(obj,className)){
            obj.className=obj.className.replace(re,'');
        }
    }
}
//
(function(win,doc){

    var WCAnim=(function(){
        var WCAnim=function(obj,json,options){

            return new WCAnimate.animateFarime(obj,json,options);

        };
        WCAnimate={
            animateFarime:function(obj,json,options){
            /**
            *   执行判断什么方法执行
             *  也可以使用添加在dom上的自定义属性
             *      data-animate-type,
             *      data-animate-time,
             *      data-animate-style[width,height,left,top],
             * */
            var browserData=WCAnimate.browser(),
                attribute=WCAnim.getData(obj);

                if(browserData.isSenior){
                    //this.()
                }else{

                }
            },
            browser:function(){
                /**
                *   主要是做兼容性处理高级浏览器，和IE的区别,
                 *   我选择的是笨方法进行的处理
                 *   ie9支持translate，但是不支持transition，
                 *      所以放弃，使用left，top 来进行动画过渡
                * */
                var browserJSON={};
                var browser=window.navigator.userAgent;

                //switch browser.test('')
                //chrome:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
                //360:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36
                //firefox:Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0
                //ie9:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3)

                if(browser.match(/Chrome/)){

                    browserJSON.isSenior=true;
                    browserJSON.name='-webkit-';

                }else if(browser.match(/Firefox/)){

                    browserJSON.isSenior=true;
                    browserJSON.name='-moz-';

                }else if(browser.match(/MSIE/)){

                    if(browser.match(/MSIE 9\.0/)){

                        browserJSON.isSenior=false;
                        browserJSON.name=undefined;

                    }else if(browser.match(/MSIE 10/)){
                        browserJSON.isSenior=true;
                        browserJSON.name='';
                    }else if(browser.match(/MSIE 11/)){
                        browserJSON.isSenior=true;
                        browserJSON.name='';
                    }else{
                        browserJSON.isSenior=false;
                        browserJSON.name=undefined;
                    }

                }
                console.log(browser.match(/MSIE 9\.0/));
                console.log(browser.isSenior)
                return browserJSON;
            },
            getData:function(){

            },
            extend:function(){}
        };

        return WCAnim;
    })();
    window.WCAnim=WCAnim;
})(window,document);


/** obj => 对象
 * json => 需要改变的动画，以及动画的终点
 * option => 可选参数 {time：过渡事件(ms),type:动画样式（Tween）}
 * */
function animate(obj,json,options,callBack){

    var options=options||{};
        options.time= options.time||700;
        options.type=options.type || Tween.Cubic.easeIn,
        baseTransitionTime=16;

    obj.timer=null;
    var start={},
        dis={},
        count=Math.ceil(options.time/baseTransitionTime),
        n=0;

    for(var name in json){
        if(name=='opacity'){
            start[name]=Math.round(parseFloat(getStyle(obj,name))*100);
        }else{
            start[name]=parseInt(getStyle(obj,name));
        }
        dis[name]=json[name]-start[name];
    }

    clearTimeout(obj.timer);


    console.log(111);
    this.anim=function(){
        n++;
        /*
         * Tween.js
         * t: current time（当前时间）；
         * b: beginning value（初始值）；
         * c: change in value（变化量）；
         * d: duration（持续时间）。
         * you can visit 'http://easings.net/zh-cn' to get effect
         */
        // function(t, b, c, d)
        for(var name in json){

            var cur=options.type(n,start.width,dis.width,count);

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur+')'
            }else{
                obj.style[name]=cur+'px';
            }
        };

        console.log(cur);

        if(n>count-1){
            clearTimeout(obj.timer);
        }else{
            obj.timer=setTimeout(this.anim,baseTransitionTime);
        }

    };
    obj.timer=setTimeout(this.anim,baseTransitionTime);
}



/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://5easings.net/zh-cn' to get effect
 */
var Tween = {
    Linear: function(t, b, c, d) {  return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;





/* requestAnimationFrame.js
 * by zhangxinxu 2013-09-30
 */
//(function() {
//    var lastTime = 0;
//    var vendors = ['webkit', 'moz'];
//    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
//        window[vendors[x] + 'CancelRequestAnimationFrame'];
//    }
//
//    if (!window.requestAnimationFrame) {
//        window.requestAnimationFrame = function(callback, element) {
//            var currTime = new Date().getTime();
//            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
//            var id = window.setTimeout(function() {
//                callback(currTime + timeToCall);
//            }, timeToCall);
//            lastTime = currTime + timeToCall;
//            return id;
//        };
//    }
//    if (!window.cancelAnimationFrame) {
//        window.cancelAnimationFrame = function(id) {
//            clearTimeout(id);
//        };
//    }
//}());