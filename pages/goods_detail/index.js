import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     goodsObj:{},
     //商品是否被收藏
     isCollect:false
  },
//商品对象
GoodsInfo:{},

  onShow: function () {
    let pages=getCurrentPages();
    let currentPages=pages[pages.length-1];
    let options=currentPages.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

    
  },
  async getGoodsDetail(goods_id){
     const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
     this.GoodsInfo=goodsObj;
     let collect=wx.getStorageSync("collect")||[];
    //判断是否被收藏
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
     this.setData({
       goodsObj:{
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,
      goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:goodsObj.pics
     
    },
    isCollect
     })
  },
  /**
   * 方法预览
   */
  handlePrevewImage(e){
    // console.log("fangfa")
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current=e.currentTarget.dataset.url;
    wx-wx.previewImage({
      urls,
      current
    })
  }
  ,
  handleCartAdd(){
   // console.log("购物车")
   //获取缓存中的数组
   let cart=wx.getStorageSync('cart')||[];
   //判断商品对象是否存在数组中
   let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
   if(index===-1){
       //不存在 第一次添加
       this.GoodsInfo.num=1;
       this.GoodsInfo.checked=true;
       cart.push(this.GoodsInfo);
   }else{
       //已经存在购物车数据 执行num++
       cart[index].num++;
   }
   //把购物车重新添加会缓存中
   wx.setStorageSync('cart', cart);
   //弹窗提示
   wx.showToast({
     title: '加入成功',
     icon:'success',
     //防止用户手抖 疯狂点击
     mask:'true'
   });
  },

  handleCollect(){
    //1缓存中的商品收藏数组
    let isCollect=false;
    let collect=wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      //能找到 在数组中删除商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true
      });
    }else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:true
      });
    }
    //把数组存入带缓存中
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })


  }
  


})