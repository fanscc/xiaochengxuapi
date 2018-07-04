import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTextStyle': 'black',
    'navigationBarTitleText': 'api接口测试',
    'backgroundColor': '#3385ff',
    'backgroundTextStyle': 'light'
  }
}
