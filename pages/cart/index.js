
import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
//获取缓存中的收获地址
const address=wx.getStorageSync('address');
const cart=wx.getStorageSync('cart')||[];

// const allChecked=cart.length?cart.every(v=>v.checked):false;
this.setData({
  address
})
this.setCart(cart);
// let allChecked=true;
// let totalPrice=0;
// let totalNum=0;

// cart.forEach(v=>{
//   if(v.checked){
//     totalPrice+=v.num*v.goods_price;
//     totalNum+=v.num;
//   }else{
//     allChecked=false;
//   }
// })
// allChecked=cart.length!=0?allChecked:false;
// this.setData({
//   address,
//   cart,
//   allChecked,
//   totalPrice,
//   totalNum
// })
  },

  async handleChooseAddress(){
//   wx-wx.getSetting({
//   success: (result) => {
//     const scopeAddress=result.authSetting["scope.address"];
//     if(scopeAddress===true||scopeAddress===undefined){
//       wx.chooseAddress({
//         success: (result1) => {
//           console.log(result1);
//         },
//       });
//     }else{
//       //拒绝授予权限 诱导打开权限
//       wx.openSetting({
//         success: (result2) => {
//           //console.log(result2);
//           wx.chooseAddress({
//             success: (result3) => {
//               console.log(result3);
//             },
//           });
//         },
//       })
//     }
//   },
//   fail: (res) => {},
//   complete: (res) => {},
// })

try {
  const res1=await getSetting();
  const scopeAddress=res1.authSetting["scope.address"];
  if(scopeAddress===false){
    await openSetting();
  }
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
    wx.setStorageSync('address', address)
} catch (error) {
  console.log(error)
}


   //console.log("干一行 行一行")
  //  wx.chooseAddress({
  //    success: (result) => {
  //      console.log(result)
  //    },  
  //  });
  //authSetting scope.address
  // wx.getSetting({
  //      success: (result) => {
  //        console.log(result)
  //      },
  //    });
  },
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    //console.log(goods_id);
  //  获取购物车数组
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);

//     wx.setStorageSync('cart', cart);
//     let allChecked=true;
// let totalPrice=0;
// let totalNum=0;

// cart.forEach(v=>{
//   if(v.checked){
//     totalPrice+=v.num*v.goods_price;
//     totalNum+=v.num;
//   }else{
//     allChecked=false;
//   }
// })
// allChecked=cart.length!=0?allChecked:false;
// this.setData({
//   cart,
//   allChecked,
//   totalPrice,
//   totalNum
// });
  },
  
  //设置购物车状态 重新计算 数据 全选 等等
  setCart(cart){
   
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;

cart.forEach(v=>{
  if(v.checked){
    totalPrice+=v.num*v.goods_price;
    totalNum+=v.num;
  }else{
    allChecked=false;
  }
  wx.setStorageSync('cart', cart);
})
allChecked=cart.length!=0?allChecked:false;
this.setData({
  cart,
  allChecked,
  totalPrice,
  totalNum
});
  },
  handleItemAll(){
    //获取data中的数据
    let {cart,allChecked}=this.data;
    //修改值
    allChecked=!allChecked;
    //循环修改check的状态
    cart.forEach(v=>v.checked=allChecked);
    //把修改后的值 填充回去
    this.setCart(cart);

  },
   async bandItemNumEdit(e){
    const {operation,id}=e.currentTarget.dataset;
    //获取购物车数据
    console.log(operation,id)
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '你是否要删除',
      //   success: (res)=> {
      //     if (res.confirm) {
      //      cart.splice(index,1);
      //      this.setCart(cart);
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      const res=await showModal({ content: '你是否要删除?'});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
       } 

    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },
  async handlePay(){
    const {address,totalNum}=this.data;
    if(!address.userName){
     await showToast({title:"你还没有选择收获地址"});
      return ;
    }
    //用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"你还没有选购商品"});
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }

})