// guide/thisRubbishInformation/thisRubbishInformation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type:String,
      value:"default value"
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  
  lifetimes:{

    created:function(){
    
    },
    attached:function(){
      console.log(this.properties.innerText)
    }
    
  }

})
