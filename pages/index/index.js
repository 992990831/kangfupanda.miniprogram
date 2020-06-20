//index.js
//获取应用实例
const app = getApp()

function getQueryString(url, name) {
  url = url.split('?')[1];
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = url.match(reg);
  if (r != null) {
      return decodeURI(r[2]);
  }
  return null;
}

Page({
  onShareAppMessage: (res) => {
    debugger;
    //let videos = localStorage.getItem("videos");
    // if(res.webViewUrl)
    // {
    //   wx.showToast({
    //     title: res.webViewUrl.substring(30),
    //     icon: 'success',
    //     duration: 4000
    //   })
    // }
    let webViewUrl = res.webViewUrl;//web-view当前的网址
    let title= getQueryString(webViewUrl, 'title');

    return {
      title: title,
      path: `/pages/index/index?url=${res.webViewUrl.substring(30)}`,
      //imageUrl: "../images/logo.png",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    //debugger;
    // if(options.url)
    // {
    //   wx.showToast({
    //     title: JSON.stringify(options.url),
    //     icon: 'success',
    //     duration: 4000
    //   })
    // }
    
    //获取H5页面url
    let webUrl = '';
    if (options.url) {//获取转发过来的参数
      webUrl = `https://app.kangfupanda.com/#/${options.url}`;
    } else {
      webUrl = "https://app.kangfupanda.com/"
    }
    this.setData({
      webUrl: webUrl
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
