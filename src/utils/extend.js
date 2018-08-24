import wepy from 'wepy';
import http from './http';

wepy.component.prototype.$get = http.reqGet;
wepy.component.prototype.$post = http.reqPost;


wepy.component.prototype.$error = function(obj){
    if(typeof obj === 'string'){
        this.$invoke('message','handleShow',{content:obj})
    }else{
        this.$invoke('message','handleShow',obj)
    }
    
}

wepy.component.prototype.$alert = function(obj){
    if(typeof obj === 'string'){
        wx.showModal({
            title:'提示',
            content:obj,
            showCancel:false
        })
    }else{
        wx.showModal({
            title:'提示',
            content:obj,
            showCancel:false,
            ...obj
        })
    }
}