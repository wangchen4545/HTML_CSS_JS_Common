/**
 * Created by richu on 2016/8/11.
 */
//Promise�첽���
/*
*�޸�ֵ����
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

//�ɹ�
//*�ҵ������ǲ��������¸�ֵ������ֵ�����ǿ����޸�����
// */
const a={
    fn:function(abc){
        return abc
    }
};
console.log(a.fn('123'));
/*
* ���������޸���ֵ����
* */
let b={
    fn:'abc'
};
b={
    fn:'123456'
};
console.log(b);

/*��ͷ����
*
*this��ָ�����
* ��function��thisָ�����c=object
* ���ü�ͷ���� this��ָ���� window��Ҳ����˵���˺�����Ƕ��this��ָ���Ǹ���
* */
var c={
    fn:function(obj){
        console.log(this);
        console.log(obj)
    }
};
c.fn('abc');

var d={
    fn:(obj)=>{
        console.log(obj);
        console.log(this);
    }
}
d.fn('abc');