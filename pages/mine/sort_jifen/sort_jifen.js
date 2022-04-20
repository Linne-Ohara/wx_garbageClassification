// pages/sort_jifen/sort_jifen.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newlist:'',
        personal:''         
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
          //积分排序
          var that=this;
          wx.request({//请求后台，获取该城市详细政策
            url:urls+'listcustomers',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
                touxiang:app.globalData.userInfo
            },
            method:'POST',   
            success(res){//接收后端分配url
                console.log(res);
                let personalInf = res.data.person_rank.match(/\d+/g)
                that.setData({
                  newlist:res.data.newlist,
                  personal:res.data.person_rank,
                  personalScore:personalInf[0],
                  personalSort:personalInf[1],
                  userInfo:app.globalData.userInfo,
                  userName:app.globalData.userName,
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