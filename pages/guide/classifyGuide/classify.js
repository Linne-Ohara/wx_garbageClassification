// classifyGuide/classify?whatRubbish=' + whatRubbish
const app = getApp()
var urls=app.globalData.serverUrl
Page({
    data: {
        kehuishou:'',
        youhai:'',
        chuyu:'',
        qita:'',
        kehuishou_list:[],
        youhai_list:[],
        chuyu_list:[],
        qita_list:[],
        
        curNav: 0,
        title:[
            {
                "id":0,
                "name":"可回收物"
            },
            {
                "id": 1,
                "name": "有害垃圾"
            },
            {
                "id": 2,
                "name": "厨余垃圾"
            },
            {
                "id": 3,
                "name": "其它垃圾"
            },
        ],
    },
  
    onLoad: function(options) {
      //获得不同垃圾
      var that=this;  
        wx.request({//请求后台，获取该城市详细政策
        url:urls+'get_lajilist',
        header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
        },
        data:{  
            key:0
        },
        method:'POST',   
        success(res){//接收后端分配url
            console.log(res);
            that.setData({
                kehuishou_list:res.data.kehuishou_list,
                youhai_list:res.data.youhai_list,
                chuyu_list:res.data.chuyu_list,
                qita_list:res.data.qita_list,
            })
        },
        fail(){  
            console.log('fail')
        },
        complete(res){   
            console.log('complete')   
        }
    }),
  
  
      //获得分类规定
      wx.request({//请求后台，增改积分
        url:urls+'get_fenleiguiding',
        header:{
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
        },
        data:{  
          new_jifen:10,
        },
        method:'POST',   
        success(res){//接收后端分配url
            console.log(res);
            that.setData({
              kehuishou:res.data.kehuishou,
              youhai:res.data.youhai,
              chuyu:res.data.chuyu,
              qita:res.data.qita,     
         })
        },
        fail(){  
            console.log('fail')
        },
        complete(res){   
            console.log('complete')     
        }
    })   
  
  
  
  
      this.setData({
        curNav:options.whatRubbish-1
      })
    },
  
    switchRightTab: function(e) {
      this.setData({
        curNav:e.currentTarget.dataset.id
      })
    }
  })
  