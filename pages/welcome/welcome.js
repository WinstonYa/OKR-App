import API from './../../models/api';
const app = getApp();

Page({
  onLoad() {
    let storageUserInfo = wx.getStorageSync('userInfo');
    if (storageUserInfo) {
      app.globalData.userInfo = storageUserInfo;
      wx.switchTab({
        url: '/pages/todo/todo'
      })
    }
  },
  handleLogin(e) {
    let userInfo = e.detail.userInfo;
    console.log(userInfo)
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: API.login,
            method: 'POST',
            data: {
              code: res.code,
              userInfo
            },
            success(res) {
              console.log( res.data.userInfo)
              let userInfo = res.data.userInfo;
              wx.setStorageSync('userInfo', userInfo);
              app.globalData.userInfo = userInfo;
              wx.switchTab({
                url: '/pages/todo/todo'
              })
            }
          })
        } else {
          console.log('登陆失败！' + res.errMsg)
        }
      }
    })
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
  }
})