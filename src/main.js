import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', 'pages/index/main', '^pages/api/main', 'pages/authorize/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      'color': '#6e6d6b',
      'selectedColor': '#e64340',
      'borderStyle': 'black',
      'backgroundColor': '#fff',
      'box-shadow': '0 0 6px 0',
      'list': [{
        'pagePath': 'pages/api/main',
        'iconPath': './static/images/nav/home-off.png',
        'selectedIconPath': './static/images/nav/home-on.png',
        'text': '首页'
      }, {
        'pagePath': 'pages/index/main',
        'iconPath': './static/images/nav/cart-off.png',
        'selectedIconPath': './static/images/nav/cart-on.png',
        'text': '购物车'
      }, {
        'pagePath': 'pages/logs/main',
        'iconPath': './static/images/nav/my-off.png',
        'selectedIconPath': './static/images/nav/my-on.png',
        'text': '我的'
      }]
    }
  }
}
