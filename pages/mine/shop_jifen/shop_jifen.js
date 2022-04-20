// pages/mine/shop_jifen/shop_jifen.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urls:'',
        goods:"",
        jpg:'1.jpg'
    },

    /**
     * 生命周期函数--监听页面加载
     *
     */
     
    togoodsname:function(e) {
        let goodsname = e.currentTarget.dataset.id
        wx.navigateTo({
          url: './goods_introduct/goods1/goods1?goodsname=' + goodsname,
        })

        console.log(e.currentTarget.dataset.id)
        
      },
     

    onLoad: function (options) {



        var that=this;
        that.setData({
            urls:app.globalData.serverUrl
        })


        wx.request({//请求后端，商品信息
          url:urls+'listgoods',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
              a:0
          },
          method:'POST',   
          success(res){//接收后端分配url
              console.log(res);
              that.setData({
                goods:res.data.newlist
            })
          },
          fail(){  
              console.log('fail')
          },
          complete(res){   
              console.log('complete')   
          }
      })   
      console.log(that.data.newlist)

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