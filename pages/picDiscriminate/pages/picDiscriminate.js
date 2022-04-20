const app = getApp()

var urls=app.globalData.serverUrl
const imageUrl = app.globalData.serverUrl + app.globalData.apiVersion //路径拼接

Page({
  data: {
    // 需要上传的图片
    needUploadFiles: [],
    //识别结果
    discriminateResult:'',
    detailResult:'',
    //图片路径
    picSrc:'',
    //图片：pic
  },

  //识别图片
  toDiscriminatePicture: function() {
    let pic=this.data.picSrc;
    let that=this;
    console.log(pic)
    wx.request({//请求后台，获取该城市详细政策
      url:urls+'shibie_image',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data:{  
        pic:pic
      },
      method:'POST',   
      success(res){//接收后端分配url
          console.log(res);
          that.setData({
            discriminateResult:res.data.four,
            detailResult:res.data.sixty
        })
        console.log(res.data.sixty);
      },
      fail(){  
          that.setData({
            discriminateResult:"网络连接错误"
          })
          console.log('fail')
      },
      complete(res){   
          console.log('complete')   
      }
    })   
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
    this.setData({
      discriminateResult:"识别中...."
    })
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
            picSrc:res.data
          }); 
          that.toDiscriminatePicture()
        }
      })
    }
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
  }

});

