// pages/python/python.js
const questionData = require('../../utils/data.js')
const functionAlgorithm = require('../../../../publicFunction/functionalAlgorithm.js')


//提取缓存中的收藏列表
var data_c; 

//数组深拷贝
const copy = functionAlgorithm.copy
//判断值是否在数组中
const contains = functionAlgorithm.contains

//获取应用实例
const app = getApp()
var error_s;
var success2;
var collectionData = [];//收藏的题目
//var questionData = [];
//判断值是否在数组中


//选取收藏的题目
function get_collection(questionData, list) {
  for (var i = 0; i < list.length; i++) {
    if(list[i]<1000)
      collectionData.push(questionData.data_all[list[i]-1])    
    collectionData[i].isStore = true
  }
  return collectionData;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: 'utils/image/pro.png',
    userInfo: {},
    hasUserInfo: false,
    isLoading: false,
    isFirst: true,
    swiper: {
      active: 0
    },
    layerlayer: {
      isLayerShow: false,//默认弹窗
      layerAnimation: {},//弹窗动画
    },
    isLocal: true,
    answers: {
      start: 0,//初始题号
      end: 0,//结束题号
      allList: [],//题号数据
      activeNum: 0,//当前显示条数
      onceLoadLength: 5,//一次向俩端加载条数，因我使用本地数据，此属性未实际使用
      isShowTip: false//默认是否显示提示
    },
    showModalStatus: false
  },

  //单选逻辑
  tapRadio: function (e) {
    let thisOption = e.currentTarget.dataset.option
    //console.log(thisOption)
    let list = this.data.answers.allList[thisOption[2]].options.map(function (option, i) {
      if (thisOption[1] == i && option.class != 'active') {
        option.Select = true
      } else {
        option.Select = false
      }
      return option
    })
    this.data.answers.allList[this.data.swiper.active].options = list
    this.tapSelect(e)

  },


  //单选答案判断逻辑
  tapSelect: function (e) {
    var success1;
    if (!this.data.isFirst || this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer) {
      return false
    }

    this.data.isFirst = false
    let bool = true
    let correct = this.data.answers.allList[this.data.swiper.active]['a']

    let data = this.data.answers.allList[this.data.swiper.active].options.map((option, i) => {

      if (option.Select && option.label != correct) {
        option.class = 'error'
        bool = false
      }
      if (!option.Select && option.label === correct) {
        option.class = 'active-success'
        bool = false
      }
      if (option.Select && option.label === correct) {
        option.class = 'success'
      }
      return option
    })

    if (bool) {
      this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer = 1
      this.data.answers.success++

    } else {
      this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer = 2
      this.data.answers.error++
      error_s = this.data.answers.error * 5
      
    }

    this.data.answers.allList[this.data.answers.start + this.data.swiper.active].options = data
    this.data.answers.isShowTip = !bool
    this.setData(this.data)

    //延迟加载滑动
    if (this.data.answers.activeNum + 1 < this.data.answers.allList.length) {
      var suc = this.onSwiper('left');
      if (!bool) {
        wx.showModal({
          showCancel: false,//是否显示取消按钮
          title: '错误答案',
          content: '正确答案为' + correct,
          success: function (res) {
            if (res.confirm) {
              console.log('错误答案')
            }
          }
        })
      }
      setTimeout(() => this.onSwiper('left'), 200)
    } else {
      // 结束了
      var text;
      if (bool) text = "按确定返回主页"
      else text = '正确答案为' + correct
      wx.showModal({
        title: '这是最后一题了',
        showCancel: false,//是否显示取消按钮
        content: text,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            wx.redirectTo({
              url: '../../../pages/index/index'
            })
          }
        }
      })
    }
  },



  //页码切换列表效果
  pageClick: function () {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    if (!this.data.layerlayer.isLayerShow) {
      layerAnimation.translate3d(0, 0, 0).step()
    } else {
      layerAnimation.translate3d(0, '100%', 0).step()
    }
    this.data.layerlayer.isLayerShow = !this.data.layerlayer.isLayerShow
    this.data.layerlayer.layerAnimation = layerAnimation
    this.setData(this.data)
  },
  //页码切换列表收缩
  layerFooterClick: function () {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    layerAnimation.translate3d(0, '100%', 0).step()
    this.data.layerlayer.isLayerShow = false
    this.data.layerlayer.layerAnimation = layerAnimation
    this.setData(this.data)
  },

  //收藏逻辑
  collectList: function () {
    //console.log(collectionData)
    let index = this.data.answers.activeNum
    if (this.data.answers.allList[index].isStore == "false")
      this.data.answers.allList[index].isStore = false
    console.log(this.data.answers.allList[index].isStore)
    this.data.answers.allList[index].isStore = !this.data.answers.allList[index].isStore
    console.log(this.data.answers.allList[index].isStore)
    //初始收藏为空列表
   // console.log(data_c)
    //获取题号
    var idx = this.data.answers.allList[index].id;
    var types = this.data.answers.allList[index].type;

    //判断收藏列表中是否存在该题目
    var result = 0;
    if (types == "单选")
      result = contains(data_c, idx);
    else
      result = contains(data_c, idx + 10000);

    //以下的逻辑为更新收藏列表
    if (this.data.answers.allList[index].isStore == true && result == -1) {  
      data_c.push(idx);
    } else if (this.data.answers.allList[index].isStore == false && result > -1) {
      data_c.splice(result, 1);
    }
    console.log("当前的收藏列表" + data_c)
    this.setData(this.data)
    //将收藏列表存入缓存
    wx.setStorageSync("collections", data_c)
  },

  //题号变更逻辑
  setActiveNum: function (e) {
    let thisOption = e.currentTarget.dataset.option - 0
    this.data.answers.activeNum = thisOption
    this.data.isFirst = false
    this.data.isLoading = false
    this.layerFooterClick()
    this.getSubject()
  },

  //swiper切换
  setEvent: function (e) {
    this.data.swiper.touchstartEvent = e
    return false
  },
  //滑动结束
  touchEnd: function (e) {
    this.onSwiper(this.getDirection(this.data.swiper.touchstartEvent, e))
    return false
  },
  //swiper切换
  onSwiper: function (dire) {
    let that = this
    let active = 0
    let animationPre = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    let animationT = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    let animationNext = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    if (!this.$isLock) {//锁屏控制
      this.$isLock = true
      if (dire == 'bottom' || dire == 'top' || !dire) {
        this.$isLock = false
        return false
      }
      if (dire == 'right') {
        animationPre.translate3d('0', 0, 0).step()
        animationT.translate3d('100%', 0, 0).step()
        if (this.data.answers.activeNum > this.data.answers.start) {
          active = - 1
        } else {
          this.$isLock = false
          return
        }
      }
      if (dire == 'left') {
        animationT.translate3d('-100%', 0, 0).step()
        animationNext.translate3d('0', 0, 0).step()
        if (this.data.answers.activeNum < this.data.answers.end - 1) {
          active = 1
        } else {
          this.$isLock = false
          return
        }
      }
      this.data.isFirst = true
      this.data.swiper.animationPre = animationPre.export()
      this.data.swiper.animationT = animationT.export()
      this.data.swiper.animationNext = animationNext.export()
      this.setData(this.data)

      this.data.swiper.active = this.data.swiper.active + active
      this.data.answers.activeNum = this.data.answers.activeNum + active
      setTimeout(function () {
        that.setHtmlsetHtml(active)
      }, 300)
    }
  },
  //修改页面至正常位置
  setHtmlsetHtml: function (active) {
    let animationPre = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    let animationT = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    let animationNext = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    animationPre.translate3d('-100%', 0, 0).step()
    animationT.translate3d('0', 0, 0).step()
    animationNext.translate3d('100%', 0, 0).step()

    this.data.swiper.animationPre = animationPre
    this.data.swiper.animationT = animationT
    this.data.swiper.animationNext = animationNext
    this.setData(this.data)

    //调用加载数据方法
    // if ((this.data.swiper.active == 2 && this.data.answers.start > 0) || (this.data.swiper.active + 2 == this.data.answers.list.length && this.data.answers.end < this.data.answers.allList.length)) {
    //   // this.getSubject()
    // }

    //调用滑动结束回调
    if (this.isLockCall && typeof this.isLockCall == 'function') {
      this.isLockCall()
      this.isLockCall = false
    }
    this.$isLock = false
  },
  //获得手势方向
  getDirection: function (startEvent, endEvent) {
    let x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX
    let y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY
    let pi = 360 * Math.atan(y / x) / (2 * Math.PI)
    if (pi < 25 && pi > -25 && x > 0 && Math.abs(x) > 10) {
      return 'right'
    }
    if (pi < 25 && pi > -25 && x < 0 && Math.abs(x) > 10) {
      return 'left'
    }
    if ((pi < -75 || pi > 750) && y > 0 && Math.abs(y) > 10) {
      return 'bottom'
    }
    if ((pi < -75 || pi > 75) && y < 0 && Math.abs(y) > 10) {
      return 'top'
    }
  },
  getSubject: function () {
    this.data.answers.end = this.data.answers.allList.length
    console.log(this.data.answers.allList)
    //注册滑动结束回调
    if (this.$isLock) {
      this.isLockCall = function () {
        this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
        this.data.answers.allList = copy(collectionData)
        this.data.isLoading = false
        this.data.isFirst = true
        this.setData(this.data)
      }
    } else {
      this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
      this.data.answers.allList = copy(collectionData)
      this.data.isLoading = false
      this.data.isFirst = true
      this.setData(this.data)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (params) {
    //获取缓存的收藏列表
    data_c = wx.getStorageSync("collections")

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    
    console.log(data_c)
    collectionData = []
    get_collection(questionData, data_c)
    this.data.answers.allList = copy(collectionData)
    this.data.answers.success = 0
    this.data.answers.error = 0
    this.data.answers.loading = false
    this.setData(this.data)
    this.getSubject()
    console.log(this.data.answers.allList)
    //wx.clearStorage(questionData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    wx.getFileSystemManager().readFile({
      filePath:this.data.background,
      encoding:"base64",
      success:res=>{
        this.setData({
          background:'data:image/png;base64,' + res.data
        })
      },
      fail:res=>{
        console.log("fail to read this picture")
      }
    })
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