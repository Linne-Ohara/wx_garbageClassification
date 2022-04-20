// pages/luntan_main/viewpinlun/viewpinlun.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pinlun_list:'',
      detailluntan:'',
      whichluntan:0,
      wenzi:'',
      urls:'',//前缀
      zhonzhui:"static/image/",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  name: function(res){

    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      wenzi: res.detail.value//赋值给name_value
    })
  },
  mypinlun: function(){
    var that=this;
    wx.request({//请求后台
      url:urls+'write_pinlun',
      header:{
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
          wenzi:that.data.wenzi,
          whichluntan:app.globalData.whichluntan,
          touxiang:app.globalData.userInfo
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res);
          that.onLoad();
      },
      fail(){  
          console.log('fail')
      },
      complete(res){   
          console.log('complete')   
      }
  })
  },
  onLoad: function (options) {
    var whichluntan=app.globalData.whichluntan//哪个帖子
    this.setData({
      urls:app.globalData.serverUrl,
      detailluntan:app.globalData.detailluntan,
      whichluntan:app.globalData.whichluntan,
    })
    var that=this;
    wx.request({//请求后台
      url:urls+'viewpinlun',
      header:{
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
        whichluntan:whichluntan//id
      },
      method:'POST',   
      success(res){//接收后端分配url
          //找到该帖子对应的评论
          console.log(res)
          let thisComments = []
          console.log(res.data.luntan_list)
          for(let i in res.data.luntan_list) {
            let thisComment = res.data.luntan_list[i]
            let thisTimeStr = thisComment.date
            let delPosition = thisTimeStr.indexOf('.')
            if(delPosition != -1) {
              let newTimeStr = thisTimeStr.substring(0,delPosition)
              thisComment.date = newTimeStr
            }

            if(res.data.luntan_list[i].whichluntan == that.data.whichluntan) {
              console.log(thisComments)
              thisComments.push(res.data.luntan_list[i])
            }
          }
          that.setData({
            pinlun_list:thisComments
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