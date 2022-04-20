// pages/policy/policy.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: "",
    city: "",
    chenshi:"",
    county: "",
    addressDetail: "",
    longitude: "", //经度
    latitude: ""  ,// 纬度
    policy:'',
    

  },
  searchPolicy(){
    var city=this.data.chenshi;
    var that=this;
    console.log(city)
    wx.request({//请求后台，获取该城市详细政策
      url:urls+'cityZhence',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
        county:city
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res);
          that.setData({
            policy:res.data
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
				wx.getStorage({
				  key: 'chenshi',
				  success: function (res) {
					  var cityInformation = res.data;//读取key值为myData的缓存数据
					  console.log(cityInformation)
					  
					  that.setData({//拿到缓存中的数据并渲染到页面
						chenshi: cityInformation,
					  })
				  }
				})

    var cityInformation = wx.getStorageSync('city');
    console.log(cityInformation)
    this.setData({
      county:cityInformation.nowCity,
      addressDetail:cityInformation.nowLocation
    })
  },


  toclassify:function(e) {
    let whatRubbish = e.target.dataset.id
    wx.navigateTo({
      url: '../classifyGuide/classify?whatRubbish=' + whatRubbish,
    })
    console.log(e.target.dataset.id)
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