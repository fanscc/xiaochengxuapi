<template>
  <div class="counter-warp">
    <p>api调用</p>
    <p @click="chooseImage">选择照片</p>
    <P @click="startRecord">开始录音</P>
    <p @click="stopRecord">停止录音</p>
    <p @click="playVoice">语音播放</p>
    <p @click="getBackgroundAudioManager">带背景音乐播放</p>
    <audio :poster="poster" :name="name" :author="author" :src="srcurl" id="myAudio" controls loop></audio>
    <button type="primary" size="mini" @click="audioCtx.play()">播放</button>
    <button type="primary" size="mini" @click="audioCtx.pause()">暂停</button>
    <button type="primary" size="mini" @click="audioCtx.seek(14)">设置当前播放时间为14秒</button>
    <button type="primary" size="mini" @click="audioCtx.seek(0)">回到开头</button>
    <p style="margin-top:20px;">录制视频然后播放视频</p>
    <div>
      <video :src="src" controls></video>
      <button @click="chooseVideoAndplay">获取视频</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="cameraContexttakePhoto">调出相机</button>
      <img :src="tempImagePath" alt="" style="height：50px;" aspectFit>
      <button type="primary" size="mini" @click="cameraContextstartRecord">调出录像</button>
    </div>
    <div>
      <p>调用地图</p>
      <map id="map" :longitude="longitude" :latitude="latitude" scale="14" :controls="controls" bindcontroltap="controltap" :markers="markers" bindmarkertap="markertap" :polyline="polyline"  show-location style="width: 100%; height: 300px;"></map>
      <button type="primary" size="mini" @click="getLocation">切换到当前位置</button>
      <button type="primary" size="mini" @click="moveToLocation">移动位置</button>
      <button type="primary" size="mini" @click="translateMarker">移动标注</button>
      <button type="primary" size="mini" @click="includePoints">缩放视野展示所有经纬度</button>
      <button type="primary" size="mini" @click="chooseLocation">选择地址</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="getSystemInfo">获取设备信息</button>
      <p>{{brand}}</p>
      <p>{{model}}</p>
      <p>{{pixelRatio}}</p>
    </div>
    <div>
      <button type="primary" size="mini" @click="getNetworkType">获取网络类型</button>
      <p>{{networkType}}</p>
    </div>
    <div>
      <button type="primary" size="mini" @click="startAccelerometer">开始监听手机加速</button>
      <button type="primary" size="mini" @click="stopAccelerometer">停止监听手机加速</button>
      <p>
        <label>X轴</label>
        <span>{{xNumber}}</span>
      </p>
      <p>
        <label>Y轴</label>
        <span>{{yNumber}}</span>
      </p>
    </div>
    <div>
      <button type="primary" size="mini" @click="makePhoneCall">拨打电话</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="scanCode">调用扫码</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="switchTab">页面跳转</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="startPullDownRefresh">开启下拉刷新</button>
    </div>
    <div>
      <button type="primary" size="mini" @click="toauthorize">去授权登陆页</button>
    </div>
    <div>
      <p>发送模板消息</p>
      <from @submit="formSubmit" report-submit>
        <lable>slider</lable>
        <slider name="slider" show-value ></slider>
        <input name="keyword1" placeholder="please input here" />
        <input name="keyword2" placeholder="please input here" />
        <input name="keyword3" placeholder="please input here" />
        <input name="keyword4" placeholder="please input here" />
        <input name="keyword5" placeholder="please input here" />
        <button form-type="submit">发送消息模板</button>
      </from>
    </div>
    <div>
      <button open-type="share" type="primary">分享</button>
    </div>
  </div>
</template>

<script>

export default {
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.Camera = wx.createCameraContext()
    this.mapCtx = wx.createMapContext('map')
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 4000,
        timingFunc: 'easeIn'
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {
    debugger
    // wx.showTabBarRedDot({
    //   index: 1
    // })
  },
  onHide: function () {
    wx.setTopBarText({
      text: 'cky的小程序'
    })
  },
  data: {
    src: '',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    srcurl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    longitude: '113.324520',
    latitude: '23.099994',
    controls: [{
      id: 1,
      iconPath: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
    markers: [{
      iconPath: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      id: 0,
      callout: {
        content: 'cky',
        color: 'black',
        fontSize: '18px',
        bgColor: '#ccc',
        display: 'ALWAYS'
      },
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    tempImagePath: '',
    brand: '',
    model: '',
    pixelRatio: '',
    networkType: '',
    xNumber: 0,
    yNumber: 0
  },
  computed: {

  },
  methods: {
    chooseImage () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          debugger
          wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: tempFilePaths // 需要预览的图片http链接列表
          })
        }
      })
    },
    startRecord () {
      wx.startRecord({
        success: function (res) {
          var tempFilePath = res.tempFilePath
          console.log(tempFilePath)
        },
        fail: function (res) {
          // 录音失败
        }
      })
    },
    stopRecord () {
      wx.stopRecord()
    },
    playVoice () {
      wx.startRecord({
        success: function (res) {
          var tempFilePath = res.tempFilePath
          wx.playVoice({
            filePath: tempFilePath,
            complete: function () {
            }
          })
        }
      })
    },
    getBackgroundAudioManager () {
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      backgroundAudioManager.title = '此时此刻'
      backgroundAudioManager.epname = '此时此刻'
      backgroundAudioManager.singer = '许巍'
      backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
    },
    chooseVideoAndplay () {
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          that.src = res.tempFilePath
        }
      })
    },
    cameraContexttakePhoto () {
      debugger
      var _this = this
      this.Camera.takePhoto({
        quality: 'normal',
        success: (res) => {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          _this.tempImagePath = res.tempImagePath
        },
        fail: (err) => {
          console.log(err)
        },
        complete: () => {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    cameraContextstartRecord () {
      var _this = this
      this.Camera.startRecord({
        timeoutCallback: function (res) {
          var tempVideoPath = res.tempVideoPath
          _this.src = tempVideoPath
        }
      })
    },
    markertap (e) {
      debugger
      console.log(e.markerId)
    },
    getLocation () {
      debugger
      var _this = this
      // _this.latitude = 23.00229
      // _this.longitude = 113.3345211
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          _this.latitude = res.latitude
          _this.longitude = res.longitude
        },
        fail: function (res) {
          wx.openSetting({
            success: (res) => {
              console.log(res)
            }
          })
        }
      })
    },
    moveToLocation () {
      this.mapCtx.moveToLocation()
    },
    translateMarker () {
      this.mapCtx.translateMarker({
        markerId: 0,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude: 23.00229,
          longitude: 113.3345211
        },
        animationEnd () {
          console.log('animation end')
        }
      })
    },
    includePoints: function () {
      this.mapCtx.includePoints({
        padding: [10],
        points: [{
          latitude: 23.10229,
          longitude: 113.3345211
        }, {
          latitude: 23.00229,
          longitude: 113.3345211
        }]
      })
    },
    chooseLocation: function () {
      var _this = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res.name)
          console.log(res.address)
          // 地图移到选择的位置
          _this.latitude = res.latitude
          _this.longitude = res.longitude
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    getSystemInfo: function () {
      debugger
      var _this = this
      wx.getSystemInfo({
        success: function (res) {
          _this.brand = res.brand
          _this.model = res.model
          _this.pixelRatio = res.pixelRatio
        },
        fail: function (err) {
          console.log(err)
        },
        complete: function () {
          console.log('ckydsadsadsa')
        }
      })
    },
    startAccelerometer: function () {
      var _this = this
      wx.startAccelerometer({
        interval: 'game'
      })
      wx.onAccelerometerChange((res) => {
        _this.xNumber = res.x
        _this.yNumber = res.y
      })
    },
    stopAccelerometer: function () {
      wx.stopAccelerometer()
    },
    makePhoneCall: function () {
      wx.makePhoneCall({
        phoneNumber: '15007305227'
      })
    },
    scanCode: function () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    },
    getNetworkType: function (res) {
      var _this = this
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          _this.networkType = res.networkType
        }
      })
    },
    switchTab: function () {
      wx.switchTab({
        url: '../index/main'
      })
    },
    startPullDownRefresh: function () {
      wx.startPullDownRefresh()
    },
    onPullDownRefresh: function () {
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    },
    toauthorize: function () {
      wx.navigateTo({
        url: '../authorize/main?id=333'
      })
    },
    formSubmit: function (e) {
      console.log(12121212121)
      debugger
      if (!wx.getStorageSync('opendId')) {
        wx.showModal({
          title: '提示',
          content: '您为授权,去授权吗',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../authorize/main?id=333'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      }
      var formId = e.detail.formId
      var touser = wx.getStorageSync('opendId')
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN',
        data: {
          touser: touser,
          template_id: '4lW4MskwSHrBUnEuJyU8G6mJCbg-pf7mmO0es5ABB7A',
          page: '../logs/main',
          form_id: formId,
          data: {
            'keyword1': {
              'value': '龙之谷手游'
            },
            'keyword2': {
              'value': 'fanscc'
            },
            'keyword3': {
              'value': '2018年7月4日'
            },
            'keyword4': {
              'value': '2000'
            },
            'keyword5': {
              'value': '4003182001201611291d140743105'
            }
          }
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '去授权登陆页',
        path: '/pages/api/main'
      }
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  width:100%;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
p {
  height: 30px;
  margin-bottom: 15px;
}
p:nth-of-type(odd) {
  background: #ccc;
}
p:nth-of-type(even) {
  background: #aaa;
}
</style>
