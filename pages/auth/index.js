import {getSetting,openSetting,chooseAddress,showModal,showToast,login} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
   async handleGetUserInfo(e){
    console.log(e);
   const  {encryptedData ,rawData, iv, signature}=e.detail;
   const {code}=await login();
   const loginParams={encryptedData ,rawData, iv, signature,code}
   //console.log(code);
   const res =await request({url:"/users/wxlogin",data:loginParams,method:"post"})
   console.log(res);
   
  }

})