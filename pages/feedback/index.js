// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品\商家投诉",
        isActive: false
      }
    ],
    //被选中的图片路径
    chooseImage:[],
    textValue:""

  },
  uploadImgs:[],

  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  /**
   * 
   * @param {选择图片事件} e 
   */
  handleChooseImg(){
    wx.chooseImage({
      count: 0,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(result)=>{
        console.log(result);
        this.setData({
          //吧图片数组进行
          chooseImage:[...this.data.chooseImage,...result.tempFilePaths]
        })
      }
    })

  },

  handleRemoveImg(e){
    const {index} =e.currentTarget.dataset;
    console.log(index);
    let {chooseImage}=this.data;
    chooseImage.splice(index,1);
    this.setData({
      chooseImage
    })
  },
  handleTextInput(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  handleFormSubmit(){
    const {textValue,chooseImage}=this.data;
    
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        mask:true
      })
      return;
    }
    //准备上传到服务器  图片是数组 遍历数组 挨个上传
    chooseImage.forEach((v,i)=>{
      wx.uploadFile({
        filePath: 'filePath',
        name: 'name',
        url: 'http://www.qz777.com/xq/tuchuang.html',
        success:(result)=>{
          console.log(result);
        }
      })
    })
   
  }
})
