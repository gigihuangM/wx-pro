/**
 * Promise形式的getSetting
 */
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result) => {
       resolve(result);
      },
      fail: (err) => {
        reject(reject);
      },
    })
  })
}

export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result) => {
       resolve(result);
      },
      fail: (err) => {
        reject(reject);
      },
    })
  })
}

export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result) => {
       resolve(result);
      },
      fail: (err) => {
        reject(reject);
      },
    })
  })
}

export const showModal=(content)=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: '你是否要删除',
      success: (res)=> {
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}


export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res)=> {
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success: (result)=> {
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}