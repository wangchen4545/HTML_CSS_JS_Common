/**
 * Created by richu on 2016/10/10.
 */

const CNY=6.7016;

function roundTwoDecimals(number){
    return Math.round(number*100)/100;
}

exports.ToUs=function($){
    return roundTwoDecimals($*CNY);
};

