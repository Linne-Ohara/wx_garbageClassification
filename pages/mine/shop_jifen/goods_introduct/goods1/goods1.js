// pages/mine/shop_jifen/goods_introduct/goods1/goods1.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urls:'',
      
       
        goodsname:0,
        goods_sell: 0,
        goodsjifen: 0,
        goodsname: 0,
        goodsnum: 0,
        goodspicture: 0,
        goodsprice: 0,
        picture_list:0,
    },
    exchange(){
        var that=this;
        wx.showModal({
          title: '兑换提示',
          content: '是否兑换该商品',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              console.log('用户点击确定') 
              console.log(that.data.goodsnum) 
              console.log(that.data.goodsjifen)
         var touxiang=app.globalData.userInfo;
          wx.request({//请求后台，进行商品兑换
            url:urls+'exchange_goods',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
              touxiang:touxiang,
              goodsname:that.data.goodsname,
              goodsnum:that.data.goodsnum,
              goodsjifen:that.data.goodsjifen
            },
            method:'POST',   
            success(res){//接收后端分配url
                console.log(res);
                console.log(res.data.ret);
                if(res.data.ret==1) {
                    wx.showToast({
                      title:res.data.msg ,
                      icon:'none'
                    })
                  }else{
                    app.globalData.goodsname=that.data.goodsname
                    app.globalData.goodspic=that.data.goodspicture
                    wx.navigateTo({
                      url: '../exchange_good/exchange_good',
                    })
                  }            },
            fail(){  
                console.log('fail')
            },
            complete(res){   
                 console.log('complete')   
            }
        })     


            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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
            goodsname:options.goodsname
          })


          var that=this;
          
          wx.request({//请求后台，获取该城市详细政策
            url:urls+'get_a_good',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
              goodsname:that.data.goodsname,
            },
            method:'POST',   
            success(res){//接收后端分配url
                console.log(res);
                that.setData({
                  policy:res.data,
                  goods_sell: res.data.goods_sell,
                  goodsjifen: res.data.goodsjifen,
                  goodsname: res.data.goodsname,
                  goodsnum: res.data.goodsnum,
                  goodspicture: res.data.goodspicture,
                  goodsprice: res.data.goodsprice,
                  picture_list:res.data.picture_list,

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