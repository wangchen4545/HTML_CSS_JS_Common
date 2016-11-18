

function scbGetString(json){
    var str;
    var CookieStr="";
    var UrlStr="";
    for(var i in json){
        if(i=="url"){
            if(getUrl(json[i])==null){
                alert("没有找到,url"+json[i])
            }else{
                str="&"+json[i]+"="+getUrl(json[i]);
            }
        }
        if(i=="cookie"){
            if(getCookie(json[i])==null){
                alert("没有找到,cookie"+json[i])
            }else{
                str="&"+json[i]+"="+getCookie(json[i]);
            }
        }
    }

    function getCookie(a){
        var cookie=null,
            startIndex=document.cookie.indexOf(a),
            length=startIndex+1+ a.length,
            endIndex=document.cookie.indexOf(";",length);

        if((!startIndex) && a != document.cookie.substring(0, a.length)) return null;

        if(startIndex==-1) return null;

        if(endIndex==-1)  endIndex = document.cookie.length;

        cookie= encodeURIComponent(document.cookie.substring(length,endIndex));
        return cookie;
    }
    function getUrl(a){
        var _href=window.location.href,
            startIndex=-_href.indexOf(a);
        /* ^ 匹配右边的 & + name + (匹配&之外的任意个数的)*/
        var re=new RegExp(a + '=([^&]{0,})', 'i');

        if(startIndex==-1){
            return null;
        }else{
            if(_href.match(re)==undefined){
                return null;
            }
            return encodeURIComponent(_href.match(re)[1]);
        }
    }
    return str;
}
