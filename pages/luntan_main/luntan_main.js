// pages/lutan_main/luntan_main.js
const app = getApp()

var urls=app.globalData.serverUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
     urls:'',//前缀
     zhonzhui:"static/image/",
      luntan_list:'',
      userInfo:'',//个人头像
      userName:''
  },
  fatie: function () {
    wx.navigateTo({
      url: '/pages/luntan/luntan',
    })
  },
  pinlun: function (e) {

    let which = e.currentTarget.dataset.id
    app.globalData.whichluntan=which
    app.globalData.detailluntan=this.data.luntan_list
    wx.navigateTo({
      url: './viewpinlun/viewpinlun',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
        userInfo:app.globalData.userInfo,
        urls:app.globalData.serverUrl,
        userName:app.globalData.userName,
    })
    wx.request({//请求后台
      url:urls+'luntan_main',
      header:{
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
          a:0
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res);
          //对返回的数据进行处理
          for(let i in res.data.luntan_list) {
            let thisComment = res.data.luntan_list[i]
            let thisTimeStr = thisComment.date
            let delPosition = thisTimeStr.indexOf('.')
            let newTimeStr = thisTimeStr.substring(0,delPosition)
            thisComment.date = newTimeStr
            thisComment.tupian0 = thisComment.tupian0.filter((item)=>{return item != ''})
          }
          that.setData({
            luntan_list:res.data.luntan_list
          })
          
      },
      fail(){  
          console.log('fail')
      },
      complete(res){   
          console.log('complete')   
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
  this.onLoad();
  this.onShow();
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})