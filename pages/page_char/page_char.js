// rubbishDiscriminate/picDiscriminate/page_char.js
const app = getApp()
var urls=app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        key:'',
        jieguo:'',
        responseToArr:[]
    },
    name: function(res){
        var that=this;
        console.log("输入的值为："+res.detail.value);//打印输入的值
        this.setData({
          name_value: res.detail.value,//赋值给name_value
          key:res.detail.value
        })
        console.log(res)
        that.wenzishgibie()
      },
    wenzishgibie: function(res){
        var that=this;
        wx.request({//请求后台，获取该城市详细政策
            url:urls+'char_find',
            header:{
                "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            data:{  
                key:that.data.key
            },
            method:'POST',   
            success(res){//接收后端分配url
                // console.log(res);
                let resArr = res.data.split(/[\n,]/g)
                let resArrObj = []
                for(let i in resArr){
                  resArr[i] = resArr[i].split(" ")
                  let arrObj = {rubbishName:resArr[i][0],rubbishType:resArr[i][1]}
                  resArrObj.push(arrObj)
                }
                //删除末尾没有数据的元素
                resArrObj.pop()
                that.setData({
                    jieguo:res.data,
                    responseToArr:resArrObj
                })
                console.log(resArrObj)
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
        this.wenzishgibie();
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