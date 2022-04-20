// pages/mine/my_goods/my_goods.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
            order:0,
    },
    togoodsname:function(e) {
        let goodsname = e.currentTarget.dataset.id
        

        console.log(e.currentTarget.dataset.id)
        
      },
      quRenOrder:function(e) {
        let which_order = e.currentTarget.dataset.id//wxml获取点了哪个
        console.log(e.currentTarget.dataset.id)
        var that=this;   
        wx.request({//请求后台，确认订单状态
          url:urls+'change_state',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
            order_id:which_order,
          },
          method:'POST',   
          success(res){//接收后端分配url
              console.log(res);
             
          },
          fail(){  
              console.log('fail')
          },
          complete(res){   
              console.log('complete')   
             
          }
        })   
        that.onLoad();
      },
      

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var phone=app.globalData.user_phone
        console.log(phone)
        var that=this;   
        wx.request({//请求后台，个人订单信息
          url:urls+'get_personorder',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
             phone_number:phone
          },
          method:'POST',   
          success(res){//接收后端分配url
              console.log(res);
            that.setData({
                order:res.data.Order_books
            })
            console.log(res.data.Order_books);
              
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