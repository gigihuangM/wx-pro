// pages/category/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     /**
      * 左侧的菜单数据
      */
     leftMenuList:[],
     rightContent:[],
     currentIndex:0,
     scrollTop:0
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //this.getCates();
  const Cates=wx-wx.getStorageSync('cates');
  if(!Cates){
    //不存在 发送数据
    this.getCates();
  }else{
    if(Date.now()-Cates.time>1000*10){
      this.getCates();
    }else{
    //   console.log("使用旧的数据");
    this.Cates=Cates.data;
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
    }
  }
  },
  /**
   * 获取分类数据
   */
 async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    // //  console.log(res);
    // this.Cates=res.data.message;
    // wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    // let leftMenuList=this.Cates.map(v=>v.cat_name);
    // let rightContent=this.Cates[0].children;
    // this.setData({
    //   leftMenuList,
    //   rightContent
    // })
    // })
  const res=await request({url:"/categories"});
    this.Cates=res;
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e){
     
      const {index}=e.currentTarget.dataset;
      let rightContent=this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightContent,
        scrollTop:0
      })

  },

 
})