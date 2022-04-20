// pages/news/newsdetail/newsdetail.js
const app = getApp();
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        passage:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        console.log(app.globalData.num)
        console.log(app.globalData.urllist)
        wx.request({//请求后台，
            url:urls+'second_new',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
                num: app.globalData.num,
                urllist:app.globalData.urllist
            },
            method:'POST',   
            success(res){//接收后端分配url
                console.log(res);
                that.setData({
                    passage:res.data.zi_list
                    
              })
            },
            fail(){  
                console.log('fail')
            },
            complete(res){   
                console.log('complete')   
            }
        })   
       
        app.globalData.urllist
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