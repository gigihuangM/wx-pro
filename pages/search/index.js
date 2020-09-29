import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:"",
  },
  TimeId:-1,
  handleInput(e){
    //console.log(e);
    //获取输入框的值
    const {value}=e.detail;
    if(!value.trim()){
      //不合法的
      this.setData({
        goods:[],
        isFocus:false
      })
      return ;
    }
    //准备发送数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000)
  

  },

  //发送请求的函数 数据
  async qsearch (query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      isFocus:false,
      inputValue:"",
      goods:[],
    })
  }

  
})