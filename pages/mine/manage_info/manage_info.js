// pages/mine/manage_info/manage_info.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressDetail:'',//地址
        userInfo: null,//头像
        userName: null,//昵称
        user_phone:'',//用户电话
        ture_name:'',//真实姓名
        jifen:0,//only_数据库

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        that.setData({
            addressDetail:app.globalData.addressDetail,//地址
            userInfo: app.globalData.userInfo,//头像
            userName:  app.globalData.userName,//昵称
            user_phone:app.globalData.user_phone,//用户电话
            ture_name:app.globalData.ture_name,//真实姓名
        })
        var touxiang=app.globalData.userInfo
        console.log(touxiang)     
            wx.request({//请求后台，获取个人积分
              url:urls+'person_jifen',
              header:{
                "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
              },
              data:{    
                touxiang:touxiang             
              },
              method:'POST',   
              success(res){//接收后端分配url
                  console.log(res);
                  that.setData({
                    jifen:res.data.jifen
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