<template>
  <div class="container">
    <form bindsubmit="bindSave">
      <div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的微信头像；</div>
      <div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的微信昵称等其他信息；</div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="save-btn">授权登录</button>
    </form>
  </div>
</template>

<script>
export default {
  onLoad: function (option) {
    console.log(option.id)
  },
  onShow: function () {
    debugger
    wx.login({
      success: function (res) {
        var code = res.code // 返回code
        console.log(code)
        var appId = 'wx054815ec8ec35cc5'
        var secret = '334367e13f035cc984cf5c725b7f38bb'
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid // 返回openid
            wx.setStorageSync('opendId', openid)
          }
        })
      }
    })
  },
  data: {

  },
  methods: {
    bindGetUserInfo: function (e) {
      debugger
      wx.setStorageSync('userInfo', e.target.userInfo)
    }
  }

}
</script>
