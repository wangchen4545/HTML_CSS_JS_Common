/**
 * Created by richu on 2016/10/10.
 */
//
//const CNY=6.7016;
//
//function roundTwoDecimals(number){
//    return Math.round(number*100)/100;
//}
//
//exports.ToUs=function($){
//    return roundTwoDecimals($*CNY);
//};

var currency=function(){
    this.CNY=6.7016;
};

currency.prototype.round=function(amount){
    return Math.round(amount*100)/100
};

currency.prototype.ToUs=function(num){
    return this.round(num*this.CNY)
};

module.exports=exports=currency;
