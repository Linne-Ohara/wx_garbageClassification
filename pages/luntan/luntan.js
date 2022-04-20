const app = getApp()

var urls=app.globalData.serverUrl
const imageUrl = app.globalData.serverUrl +  '/up1_image'//这里可以理解为路径拼接

Page({
  data: {
    // 需要上传的图片
    needUploadFiles: [],

    //上传成功在后端的图片路径
    picSrc:[],
    //图片：pic
    wenzi:''
  },

 
  // 选择图片上传
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType:['original','compressed'],
      sourceType:['album','camera'], 
      success:function(res){  
      //tempFilePaths可以作为img标签的src属性显示图片 
        const tempFilePaths=res.tempFilePaths
        that.setData({
          needUploadFiles: that.data.needUploadFiles.concat(res.tempFilePaths)
        });
        // console.log(tempFilePaths)
      }
    })
  },


  // 上传图片文件
  uploadFiles: function() {
    var that = this;
    that.setData({
      picSrc: []
    }); 
    for(let i=0;i<this.data.needUploadFiles.length;i++){
      let filePath= this.data.needUploadFiles[i]
      console.log(filePath)
      wx.uploadFile({
        filePath: filePath,
        url:imageUrl,//仅为示例，非真实的接口地址 filePath:tempFilePaths[0],
        name: 'image',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success: function(res){
          //打印结果
          console.log(res)
          that.setData({
            picSrc: that.data.picSrc.concat(res.data)
            //picSrc:res.data
          }); 
         if(i==that.data.needUploadFiles.length-1){
           console.log(that.data.picSrc)
           that.upwenzi()
         }
        }
      })
    }
    //quedin，sc
  },


  //点击红叉按钮删除当前图片
  delUploadingFiles: function(e) {
    let newNeedUploadFiles = this.data.needUploadFiles
    console.log(e.currentTarget.dataset.id)
    
    let delObjPicFun = function(delObjPic) {
      if(delObjPic == e.currentTarget.dataset.id)
        return delObjPic
    }
    let delObjIndex = newNeedUploadFiles.findIndex(delObjPicFun)
    newNeedUploadFiles.splice(delObjIndex,1)
    this.setData({
      needUploadFiles:newNeedUploadFiles
    })
  },
  name: function(res){

    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      wenzi: res.detail.value//赋值给name_value
    })
  },
  upwenzi(){
    var that=this;
    console.log(that.data.picSrc)
    wx.request({//请求后台，获取该城市详细政策
      url:urls+'up_luntan',
      header:{
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
          wenzi:that.data.wenzi,
          tupian:that.data.picSrc,
          touxiang:app.globalData.userInfo
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res);
          //弹成功，跳转论坛首页
          wx.showModal({
            title: '提示',
            content: '成功分享，快去交流吧！',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/luntan_main/luntan_main',
                })
              
           var touxiang=app.globalData.userInfo;
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.switchTab({
                  url: '/pages/luntan_main/luntan_main',
                })
               
              }
            }
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
 

});

