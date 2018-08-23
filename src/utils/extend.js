import wepy from 'wepy';
import http from './http';

wepy.component.prototype.$get = http.reqGet;
wepy.component.prototype.$post = http.reqPost;


wepy.component.prototype.$error = function(obj){
    console.log(typeof obj === 'string',obj)
    if(typeof obj === 'string'){
        this.$invoke('message','handleShow',{content:obj})
    }else{
        this.$invoke('message','handleShow',obj)
    }
    
}