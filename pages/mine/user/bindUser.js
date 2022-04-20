// pages/user/bindUser.js
const app = getApp()
var urls=app.globalData.serverUrl
var util = require('../../../utils/util.js')
var appConfig = require('../../../appConfig.js')
var _countDownIntervalId = -1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNoArray: ['大陆', '港澳台'],
    cardNoArrayIndex: 0,
    telephoneNum: '',//手机号
    currentTime: 60,
    time: '获取验证码',
    disabled: false,
    picValidCodeUrl: appConfig.picCodeUrl,
    is_OK:0,
    vertifyCode:0,//验证码
    userName:0//姓名
  },
  
  sureTap: function (e) {                                   //确认
    var that = this;
    if (!this.dataVertify()) {
      // 数据有效性验证
      return;
    }
    var name = this.data.userName;
  
    var smsCode = this.data.vertifyCode;
    console.log(smsCode)                            //输入的验证码
    var mobile = this.data.telephoneNum;
    // 登录


     //验证 验证码
     wx.request({//请求后台，传入用户基础数据
      url:urls+'check_vercode',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
        phone_number:that.data.telephoneNum,
        vercode:that.data.vertifyCode,
        touxiang:app.globalData.userInfo,
        true_name:that.data.userName
      },
      method:'POST',   
      success(res){//接收后端分配url
        console.log(res)
        
        if(res.data.ret==1){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }else{
          //绑定成功
          app.globalData.user_phone=that.data.telephoneNum
          app.globalData.ture_name=that.data.userName//真实姓名
         wx.setStorage({//
              key: 'user_phone',
              data: app.globalData.user_phone
            })
            wx.setStorage({//
              key: 'ture_name',
              data: app.globalData.ture_name
            })
          wx.setStorage({//
            key: 'is_bind',
            data:'ture'
          })
    
          wx.showModal({
            showCancel: false,//是否显示取消按钮
            title: '恭喜！',
            content: '您绑定成功了',
          })
        }
       
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
      key: 'is_bind',
      success: function (res) {
        var cityInformation = res.data;//读取key值为myData的缓存数据
        console.log(cityInformation)
        if(cityInformation== 'ture'){
          
          
          wx.showModal({
            title: '您已绑定相关信息',
            content: '如要修改，请点击个人信息管理进行修改',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              }
            }
          })
        }else{
       
        }
        
      }
    })
    this.stopCountDown();
   
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

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cardNoArrayIndex: e.detail.value
    })
  },
  teleInput: function (e) {
    this.setData({
      telephoneNum: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  cardInput: function (e) {
    this.setData({
      cardNum: e.detail.value
    })
  },
  picValidCodeInput: function (e) {
    this.setData({
      picValidCode: e.detail.value
    })
  },
  vertifyCodeInput: function (e) {
    this.setData({
      vertifyCode: e.detail.value
    })
  },
  /**
   * 用户绑定（确定）按钮点击事件
   */

  
  stopCountDown: function () {
    var that = this;
    if (_countDownIntervalId >= 0) {
      clearInterval(_countDownIntervalId);
      _countDownIntervalId = -1;
    }
    that.setData({
      time: '获取验证码',
      currentTime: 60,
      disabled: false
    })
  },
  startCountDown: function (currentTime) {
    var that = this;
    that.stopCountDown();
    that.setData({
      time: currentTime + 's后重发',
      disabled: true
    })
    _countDownIntervalId = setInterval(function () {
      if (_countDownIntervalId >= 0) {
        that.setData({
          time: (currentTime - 1) + 's后重发'
        })
        currentTime--;
        if (currentTime <= 0) {
          that.stopCountDown();
        }
      }
    }, 1000)
  },
  tapPicValidCode: function(e) {
    this.refreshPicValidCode();
  },
  refreshPicValidCode: function () {
    this.setData({
      picValidCodeUrl: appConfig.picCodeUrl + '?r=' + Math.random()
    })
  },

  /**
   * 校验通过
   */
  showToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
    })
  },
  /**
   * 绑定提交数据校验
   */
  dataVertify: function() {
    var name = this.data.userName;
    var credNo = this.data.cardNum;
    var smsCode = this.data.vertifyCode;
    var mobile = this.data.telephoneNum;
    if (util.isBlankOrEmpty(name)) {
      this.showToast('请输入姓名...');
      return false;
    }
    var index = this.data.cardNoArrayIndex;
 
   
    if (!util.isTelephone(mobile)) {
      this.showToast('请输入正确的手机号...');
      return false;
    }
    return true;
  },
  /**
   * 发送验证码bindTap事件
   */
  tapSendVertifyCode: function (e) {
    
      //未绑定
      var that = this;
      if (util.isTelephone(that.data.telephoneNum)) {
        console.log(that.data.telephoneNum)
         //验证手机号
         wx.request({//请求后台，传入用户基础数据
          url:urls+'get_phoneyanzheng',
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data:{  
            phone_number:that.data.telephoneNum,
          },
          method:'POST',   
          success(res){//接收后端分配url
              that.setData({
                is_OK:res.data.msg
                
            })
            console.log(res)
          },
          fail(){  
              console.log('fail')
          },
          complete(res){   
              console.log('complete')   
          }
      })   
        this.showToast('正在发送...');
        var currentTime = that.data.currentTime;
        that.startCountDown(currentTime);
        var phone = that.data.telephoneNum;
        var picValidCode = that.data.picValidCode
        // 网络请求验证码
  
      } else {
        that.showToast('请输入正确的手机号');
      }

    }
   
  
})