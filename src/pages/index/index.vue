<template>
  <view class="index">
    <Counter />
    <van-button type="primary" size="large" @click="toChartPage">进入图表页面</van-button>
  </view>
</template>

<script>
import './index.scss'
import Counter from '../../components/Counter.vue'
import Taro from "@tarojs/taro";

export default {
  name: 'index-page',
  components: {
    Counter
  },
  setup() {
    return {
      toChartPage() {
        Taro.navigateTo({
          url: '/pages/chart/index',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            },
            someEvent: function(data) {
              console.log(data)
            }
          },
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
          }
        })
      }
    }
  }
}
</script>
