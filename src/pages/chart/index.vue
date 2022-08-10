<template>
  <view class="chart">
    <view class="container">
      <f2 :renderChart="lineChart" />
    </view>
    <van-button type="primary" size="large" @click="randomData">超级变变变</van-button>
  </view>
</template>

<script>
import {Axis, Chart, createElement, Interval} from "@antv/f2";
import './index.scss'
import {computed, reactive, toRaw} from "vue";

export default {
  name: "chart-example",
  setup() {
    const state = reactive({
      chartData: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ]
    })

    let lineChart = computed(() => createElement(Chart, {
      data: toRaw(state.chartData)
    }, [
      createElement(Axis, { field: 'genre' }),
      createElement(Axis, { field: 'sold' }),
      createElement(Interval, { x: 'genre', y: 'sold', color: 'genre' }),
    ]))

    function randomNumber() {
      return Math.round(Math.random()*100)
    }

    return {
      lineChart,
      randomData() {
        state.chartData = [
          { genre: 'Sports', sold: randomNumber() },
          { genre: 'Strategy', sold: randomNumber() },
          { genre: 'Action', sold: randomNumber() },
          { genre: 'Shooter', sold: randomNumber() },
          { genre: 'Other', sold: randomNumber() },
        ]
      }
    }
  }
}
</script>
