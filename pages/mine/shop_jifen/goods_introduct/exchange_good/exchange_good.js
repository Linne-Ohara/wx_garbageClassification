// pages/mine/shop_jifen/goods_introduct/exchange_good/exchange_good.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据 
     */
    data: {
        goodsname:'',//商品名称
        goodspic:'',//商品图片
        user_phone:'',//用户电话
        ture_name:0,
        addressDetail:'',
        urls:'',
        jpg:'1.jpg'
    },
    duihuan: function(res){
        var that=this;
        wx.request({//请求后台，传入订单数据
            url:urls+'order_ok',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
              true_name:that.data.ture_name,
              goodsname:that.data.goodsname,
              user_phone:that.data.user_phone
            },
            method:'POST',   
            success(res){//接收后端分配url
               console.log(res)
               //现实兑换成功后跳转到商城页面
               wx.showModal({
                title: '兑换提示',
                content: '您已成功兑换该商品',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                 wx.reLaunch({
                   url: '/pages/mine/my_goods/my_goods',
                 })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.reLaunch({
                        url: '/pages/mine/my_goods/my_goods',
                      })
                  }
                }
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
    name: function(res){
       
        console.log("输入的值为："+res.detail.value);//打印输入的值
        this.setData({
          name_value: res.detail.value//赋值给name_value
        })
      }, 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        that.setData({
            urls:app.globalData.serverUrl
        })
        this.setData({
            goodsname:app.globalData.goodsname,//商品名称
            goodspic:app.globalData.goodspic,//商品图片
            user_phone:app.globalData.user_phone,//用户电话
            ture_name:app.globalData.ture_name,//真实姓名
            addressDetail:app.globalData.addressDetail,
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