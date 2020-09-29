import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
     {
       id:0,
       value:"综合",
       isActive:true
     },
     {
      id:1,
      value:"销量",
      isActive:false
    },
    {
      id:2,
      value:"价格",
      isActive:false
    }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options);
   this.QueryParams.cid=options.cid;
   this.getGoodslist();
   
  },
 async getGoodslist(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    console.log(this.totalPages);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  handletabsItemChange(e){
   // console.log(e);
   const {index}=e.detail;
   let {tabs}=this.data;
   tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
   this.setData({
    tabs
  })
  },
  onReachBottom(){
   // console.log("页面触底");
   //判断还有没有下一页数据
   if(this.QueryParams.pagenum>=this.totalPages){
     //没有下一页数据
   //  console.log("没有下一页数据");
   wx.showToast({
     title: '没有下一页数据了',
   })
   }else{
     //还要下一页数据
     console.log("有下一页数据");
     this.QueryParams.pagenum++;
     this.getGoodslist();
   }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    console.log("shuxin");
    //重置数组 重置页码
    this.setData({
      goodsList:[],
    })
    this.QueryParams.pagenum=1;
    //发送请求
    this.getGoodslist();
  }
})