// pages/news/news.js
const app = getApp();
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        namelist:"",
        urllist:""
    },
    news1: function (e) {
        var num=e.currentTarget.dataset.id
        app.globalData.num=num
        app.globalData.urllist=this.data.urllist
        wx.navigateTo({
          url: './newsdetail/newsdetail',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        wx.request({//请求后台，
            url:urls+'first_news',
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
                    namelist:res.data.namelist,
                    urllist:res.data.urllist
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