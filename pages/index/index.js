//index.js
//获取应用实例
const app = getApp()
var urls=app.globalData.serverUrl
var nowLocation = app.globalData.nowLocation
// let userInfo = app.globalData.userInfo
// console.log(app.globalData.nowLocation)
// 引入SDK核心类
const QQMapWX = require("../libs/qqmap-wx-jssdk");
var qqmapsdk;
var question_all


Page({
  data: {
    touxiang:"",
    nichen:"",
    province: "",
    city: "",
    urls:"",
    county: "登录",
    addressDetail: "无",
    longitude: "", //经度
    latitude: ""  ,// 纬度
    picList:["1.png","2.png","3.png"],//轮播图图片具体后台地址
    picUrl:'static/lunbo/',//轮播图图片后台路径
    positions:{"nowLocation":"666","nowCity":"555"},//向缓存保留的城市数据
    menuItemsObj:{
      smallIcon:{
        textDiscriminate:{ text:'文字识别',url:'../page_char/page_char',icon:'../../images/IndexPic/textDiscriminate.svg'},
        latestNews:{ text:'最新消息',url:'../news/news',icon:'../../images/IndexPic/latestNews.svg'},
        getPolicy:{text:'政策查询',url:'../getPolicy/pages/guideIndex',icon:'../../images/IndexPic/getPolicy.svg'},
        scoreShop:{text:'积分商城',url:'../../pages/mine/shop_jifen/shop_jifen',icon:'../../images/IndexPic/scoreShop.svg'},
      },
      answerQuestion:{ text: '题目问答', hint: '垃圾分类题目', icon: '../../images/QandA.svg', tips: '', tap: 'toQuestionIndex'},
      picDiscriminate:{ text: '图片识别', hint: '识别垃圾分类', icon: '../../images/rubbishDis.svg', tips: '', url:'../picDiscriminate/pages/picDiscriminate'},
    },
    showConcatModal: false
  },

  //加载相关功能模块
  onLoad: function () {

    var that=this;
    wx.getStorage({
      key: 'addressDetail',
      success:function(res){
        that.setData({
          addressDetail:res.data
        })
      },
      fail:()=>{
      }
    })
    wx.getStorage({
      key: 'chenshi',
      success:function(res){
        that.setData({
          county:res.data
        })
      }
    })
 
    
    
    wx.request({//请求后台，获取问题
      url:urls+'get_question',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
        a:0,
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res.data.question);
          app.globalData.question_all=res.data.question;
          question_all=res.data.question
      },
      fail(res){  
          console.log(res)
          console.log('fail')
      },
      complete(res){   
          console.log('complete')   
      }
    })   
 
    var that =this;
    wx.getSetting({
    //
      success (res){
        if (true) {
          let userInfoStorage =  wx.getStorageSync('userHeaderPic')
          let userNameStorage =  wx.getStorageSync('userName')
          console.log(userInfoStorage,userNameStorage)
          //保存头像昵称到全局配置
          app.globalData.userInfo = userInfoStorage
          app.globalData.userName = userNameStorage
          //bendi
          wx.setStorage({
            key: 'userName',
            data: app.globalData.userName
          })
          wx.setStorage({
            key: 'userInfo',
            data: app.globalData.userInfo 
          })
          
         


          //读取全局配置头像
          that.setData({
            nichen:app.globalData.userName,
            touxiang:app.globalData.userInfo,
            addressDetail:app.globalData.addressDetail
          })

          //传昵称头像传入数据库
          console.log(that.data.addressDetail)
          wx.request({//请求后台，传入用户基础数据
            url:urls+'save_userdata',
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
              nichen:that.data.nichen,
              touxiang:that.data.touxiang,
              addressDetail:that.data.addressDetail
            },
            method:'POST',   
            success(res){//接收后端分配url
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
            
          
        }
      }
      })




    qqmapsdk = new QQMapWX({
      key: 'KVFBZ-GR2KD-PU344-H7WLB-MFV7Q-YOFFX'
    });
    //添加要保留到缓存的信息,添加服务器地址到data中
    this.setData({
      'positions.nowLocation':this.data.addressDetail,
      'positions.nowCity':this.data.county,
      urls:urls
    })
   
				wx.getStorage({
				  key: 'addressDetail',
				  success: function (res) {
					  app.globalData.addressDetail= res.data;//读取key值为myData的缓存数据
					  console.log(app.globalData.addressDetail)
				  }
        })
        wx.getStorage({
				  key: 'user_phone',
				  success: function (res) {
					  app.globalData.user_phone= res.data;//读取key值为myData的缓存数据
					  console.log(app.globalData.user_phone)
				  }
        })
      	wx.getStorage({
				  key: 'ture_name',
				  success: function (res) {
					  app.globalData.ture_name= res.data;//读取key值为myData的缓存数据
					  console.log(app.globalData.ture_name)
				  }
        })
        wx.getStorage({
				  key: 'userName',
				  success: function (res) {
					  app.globalData.userName= res.data;//读取key值为myData的缓存数据
					  console.log(app.globalData.userName)
				  }
        })
        wx.getStorage({
				  key: 'wxUserInfo',
				  success: function (res) {
					  app.globalData.wxUserInfo= res.data;//读取key值为myData的缓存数据
					  console.log(app.globalData.wxUserInfo)
				  }
        })
  },

	

  //...
  getUserProfile: function(e) {
    console.log('111')
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo.avatarUrl
        app.globalData.userName = res.userInfo.nickName
        this.setData({
            touxiang: app.globalData.userInfo,
            nichen: app.globalData.userName,
            hasUserInfo: true
          })
          wx.setStorageSync('userHeaderPic', this.data.touxiang)
          wx.setStorageSync('userName', this.data.nichen)
          this.onLoad()

        },
        fail:(res)=>{
          console.log("failed")
        }
      }
    ) 
  },

  //授权后进行的操作
  onGotUserInfo: function() {
    this.getUserProfile()
    //刷新页面更新信息
    this.onLoad()
  },
  
  //根据点击的目标进入垃圾分类指南页面的指定模块
  toclassify:function(e) {
    let whatRubbish = e.target.dataset.id
    wx.navigateTo({
      url: '../guide/classifyGuide/classify?whatRubbish=' + whatRubbish,
    })
    console.log(e.target.dataset.id)
  },

  //进入答题页面
  toQuestionIndex: function() {
    if(!app.globalData.userInfo) {
      wx.showToast({
        title: '请先授权登录',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '../../question/pages/index/index',
      })
    }
    
  },
  //进入垃圾识别页面
  toDiscriminateIndex: function() {
    wx.navigateTo({
      url:'../../rubbishDiscriminate/pages/discriminate',
    })
  },
  //进入分类指南页面
  toGuideIndex: function() {
    var that=this;
    wx.setStorageSync(//保存城市数据
      'city',
      that.data.positions
    ),
    wx.navigateTo({
      url: '../../guide/pages/guideIndex',
    })
  },


  showConcatModal: function(e) {
    this.setData({
      showConcatModal: true,
    }) 
  },
  dismissConcatModal: function (e) {
    this.setData({
      showConcatModal: false,
    })
  },
  
  //....
  getAddress(){
    this.getJingWeiDu();
  },
  /**
   * 获取经纬度
   */
  getJingWeiDu() {
    let that = this;
    wx.getLocation({
      success(res) {
        console.log(res);
        console.log(that.positions)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        }, () => {
          that.jingWeiduToDiZhi();
        });
  
      }
    })
  },
  /**
   * 经纬度转换成地址
   */
  jingWeiduToDiZhi() {
    let that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function(res){
        console.log("result")
        console.log(res);
        let tempData = res.result.address_component;
        that.setData({
          province: tempData.province,
          city: tempData.city,
          'positions.nowLocation':res.result.address,
          'positions.nowCity':tempData.district,
          county: tempData.district,
          addressDetail: res.result.address
        });
        app.globalData.addressDetail= res.result.address
        console.log(app.globalData.addressDetail)
        wx.setStorage({//保存城市数据
          key: 'addressDetail',
          data: app.globalData.addressDetail
        })
        wx.setStorage({//保存城市数据
          key: 'chenshi',
          data:tempData.city
        })
        
          
         
      },
      
      fail: function(error) {
        console.log("err")
        console.error(error);
      },
      complete: function(res) {
        console.log("complete")
        console.log(res);
      }
    })
  },


  getAddressAndUserProfile() {
    const that = this
    const runRequestQueue = new Promise((resolve,reject)=>{
      that.getAddress()
     
      console.log(that == this)
    }) .then(
      that.getUserProfile()
    )

  }
  // toYourCity(){
  //   var that=this;
  //   wx.setStorageSync(//保存城市数据
  //     'city',
  //     that.data.positions
  //   ),
  //   console.log(that.data.positions)
  //   wx.navigateTo({
  //     url: '../policy/policy',
  //   })
  // }
})

