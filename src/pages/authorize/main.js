import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTextStyle': 'black',
    'navigationBarTitleText': '授权登陆页',
    'backgroundColor': '#3385ff',
    'backgroundTextStyle': 'light'
  }
}
