// pages/index/mine.js
//获取应用实例
const app = getApp();

var urls=app.globalData.serverUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen:'',
    userName:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuitems: [
      { text: '信息完善', url: '', icon: '../../images/minePic/completeInformation.svg', tips: '', tap: 'bindTapUserInfo' },
      { text: '个人信息修改', url: '', icon: '../../images/minePic/changeInformation.svg', tips: '', tap: 'change_info' },
      { text: '个人信息查询', url: '', icon: '../../images/minePic/checkInformation.svg', tips: '', tap: 'manage_info' },
      { text: '积分排名', url: '', icon: '../../images/minePic/score.svg', tips: '', tap: 'bindTapScore' },
      { text: '积分兑换', url: '', icon: '../../images/minePic/scoreExchange.svg', tips: '', tap: 'bindTapshop' },
      { text: '我的订单', url: '', icon: '../../images/minePic/myOrder.svg', tips: '', tap: 'my_goods' },
      { text: '在线客服', url: '', icon: '../../images/minePic/onlineCustomerCare.svg', tips: '', tap: 'online_kefu' },
      { text: '关于我们', url: '', icon: '../../images/minePic/aboutUs.svg', tips: '', tap: 'about_us' },
      { text: '注销', url: '', icon: '../../images/minePic/logoff.svg', tips: '', tap: 'delete_info' },
    ]
  },
  onLoad: function (options) {
    var that=this;
    var touxiang=app.globalData.userInfo
    console.log(touxiang)     
        wx.request({//请求后台，获取个人积分
          url:urls+'person_jifen',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
            
            touxiang:touxiang,
            
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


      
    

  



    var that = this;
    if (app.globalData.wxUserInfo) {
      that.setUserInfo(app.globalData.wxUserInfo);
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面展示
   */
  onShow: function (options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userName: app.globalData.userName,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userName: res.userName,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            
          })
        }
      })
    }
    
  },

  

  //获取用户图片及昵称
  getUserProfile: function(e) {
    console.log('111')
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo)
        wx.setStorageSync('userHeaderPic', this.data.userInfo)
      }
    }) 
  },

  // getUserInfo: function (e) {
  //   this.setUserInfo(e.detail.userInfo);
  // },

  //设置默认信息
  setUserInfo: function (userInfo) {
    console.log(userInfo)
    if (userInfo != null) {
      app.globalData.wxUserInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },


  //人物信息按钮点击事件
  bindTapUserInfo() {
    if (app.globalData.isBindUser) {
      // 如果已经绑定用户，则跳到用户信息
      wx.navigateTo({url: 'user/userinfo'})
    } else {
      // 未绑定，则跳到用户绑定
      wx.navigateTo({url: 'user/bindUser'})
    }
  },


  //积分排名按钮点击事件
  bindTapScore() {
    wx.navigateTo({
      url: 'sort_jifen/sort_jifen',
    })
  },
bindTapshop() {
  wx.navigateTo({
    url: 'shop_jifen/shop_jifen',
  })
},
online_kefu() {
  wx.navigateTo({
    url: 'online_kefu/online_kefu',
  })
},
about_us() {
  wx.navigateTo({
    url: 'about_us/about_us',
  })
},
manage_info() {
  wx.navigateTo({
    url: 'manage_info/manage_info',
  })
},
my_goods() {
  wx.navigateTo({
    url: 'my_goods/my_goods',
  })
},
change_info() {
  wx.navigateTo({
    url: 'change_info/change_info',
  })
},
onPullDownRefresh: function () {
  //调用刷新时将执行的方法
this.onLoad();
this.onShow();

},
delete_info() {
  var that=this; 
  wx.showModal({
    title: '注销提示',
    content: '是否注销',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
         
        wx.request({//请求后台，注销
          url:urls+'zhuxiao_info',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
            phone: app.globalData.user_phone
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
        wx.clearStorage()
         //删全局
         app.globalData.addressDetail='';
         app.globalData.user_phone='';
         app.globalData.ture_name='';
         app.globalData.userInfo='';
         app.globalData.userName='';
         that.setData({
           jifen:'',
           userName:'',
           userInfo: ''
         })
         that.onLoad()
         that.onShow()

      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
})