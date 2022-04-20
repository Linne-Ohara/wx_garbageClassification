//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxUserInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    question_all:'',
    nowLocation:'点击查询',
    wxUserInfo: null,
    isBindUser: false,
    userInfo: null,//头像
    userName: null,
    serverUrl: 'http://122.9.66.131:80/',
    apiVersion: '/up_image',
    addressDetail:'',//地址
    goodsname:'',//商品名称
    goodspic:'',//商品图片
    user_phone:'',//用户电话
    ture_name:'',//真实姓名
    num:0,//点击哪条news
    urllist:''
  }
})