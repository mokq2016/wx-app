import wepy from 'wepy';
import config from '../config/config'

function reqGet(url, data, header){
    var config = {
      url:url,
      data:data,
      method:'GET'
    }
    if(header){
      config['header'] = header;
    }
    return request(config);
  }
  function reqPost(url,data,header){
    var config = {
      url: url,
      data: data,
      method: 'POST'
    }
    if (header) {
      config['header'] = header;
    }
    return request(config);
  }

  function request(options){
    try {
        var token = wx.getStorageSync('token')
        if(token){
          if (!options.header){
            options.header = {};
          }
          options.header['token'] = token;
        }
        console.log(options)
      } catch (e) {
        console.log(e)
      }
      return new Promise(function (resolve, reject) {
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: config.serverHost + options.url,
          data: options.data,
          header: options.header,
          method: options.method,
          success: function (res) {
            wx.hideLoading();
            if (res.data == '会话结束，请重新登录！'){
                wx.showModal({
                  title: '提示',
                  showCancel:false,
                  content: '会话结束，请重新登录！',
                  success:function(){
                    wx.reLaunch({
                      url:'/pages/login/login',
                      success:function(){
                        wx.clearStorage();
                      }
                    })
                  }
                })
                return;
            }
           
            resolve(res.data)
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '系统异常，请稍后再试！',
              showCancel:false,
              success:function(){
                wx.navigateBack({
                  delta:1
                })
              }
            })
            reject(res)
          }
        })
      })
  }
  module.exports = {
    reqGet: reqGet,
    reqPost: reqPost
  }