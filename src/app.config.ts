export default {
  usingComponents: {
    "f2": "./components/f2-wx/index",
    // 'van-button': './components/vant-weapp/dist/button/index',
    'van-card': './components/vant-weapp/dist/card/index',
  },
  pages: [
    'pages/index/index',
    'pages/chart/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
