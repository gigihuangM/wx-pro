
import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
//获取缓存中的收获地址
const address=wx.getStorageSync('address');
let cart=wx.getStorageSync('cart')||[];
cart=cart.filter(v=>v.checked);
this.setData({address});
let totalPrice=0;
let totalNum=0;
cart.forEach(v=>{
totalPrice+=v.num*v.goods_price;
totalNum+=v.num;
})
this.setData({
cart,totalPrice,totalNum,address
});

  },
  handleOrderPay(){
    const token =wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return ;
    }
    console.log("已经存在")
  }


})