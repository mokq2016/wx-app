import wepy from 'wepy';
import http from './http';

wepy.component.prototype.$get = http.reqGet;
wepy.component.prototype.$post = http.reqPost;
