<!-- 3d图 -->
<template>
  <div class="d3-pie-widget">
    <Base ref="baseRef" :chartData="chartData" :hooks="hooks" :design="design" :echarts="echarts"
      :chartsHandle="chartsHandle" />
  </div>
</template>
<script>
import { clone } from "ramda";
import BaseMixin from "./base.mixin";
import { defaultChartConfig } from "../utils/defaultData";
export default {
  name: "d3Chart",
  mixins: [BaseMixin],
  data() {
    return {};
  },
  mounted() {
    const seriesData = this.chartData.data.series;
    const series = this.getSeries(seriesData);
    this.chartData.data.series = series;
  },
  watch: {
    "chartData.px.width"() {
      const { px, data } = this.chartData
      const { grid3D } = data;
      grid3D.boxWidth = parseInt(px.width / 2.8);
      this.$refs.baseRef.resize();
    },
    "chartData.px.height"() {
      this.$refs.baseRef.resize();
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        ...clone(defaultChartConfig),
      };
    },
    getSeries(optionsData = []) {
      const series = this.getPie3D(optionsData.map(item => {
        if (item.value < 5) {
          item.value = 5
        }
        return item
      }), 0, 240, 28, 26, 0.5)
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐
      series.push({
        name: 'pie2d',
        type: 'pie',
        label: {
          opacity: 1,
          position: 'outside',
          fontSize: 12,
          lineHeight: 20,
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        labelLine: {
          length: 10,
          length2: 20,
        },
        minAngle: 10,
        startAngle: -53, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['0', '60%'],
        center: ['50%', '50%'],
        data: optionsData.map(item => {
          item.itemStyle.opacity = 0
          return item
        })
      })
      return series;
    },
    // 获取3D饼图的配置对象
    getPie3D(pieData, internalDiameterRatio) {
      // internalDiameterRatio:透明的空心占比
      const series = []
      let sumValue = 0
      let startValue = 0
      let endValue = 0
      const legendData = []
      const k =
        typeof internalDiameterRatio !== 'undefined'
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3
      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value
        const seriesItem = {
          name:
            typeof pieData[i].name === 'undefined'
              ? `series${i}`
              : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k
          }
        }
        if (typeof pieData[i].itemStyle !== 'undefined') {
          const itemStyle = {}
          typeof pieData[i].itemStyle.color !== 'undefined'
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null
          typeof pieData[i].itemStyle.opacity !== 'undefined'
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null
          seriesItem.itemStyle = itemStyle
        }
        series.push(seriesItem)
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value
        series[i].pieData.startRatio = startValue / sumValue
        series[i].pieData.endRatio = endValue / sumValue
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          2000
        )
        startValue = endValue
        legendData.push(series[i].name)
      }
      return series
    },
    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      // 计算
      const midRatio = (startRatio + endRatio) / 2

      const startRadian = startRatio * Math.PI * 2
      const endRadian = endRatio * Math.PI * 2
      const midRadian = midRatio * Math.PI * 2

      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      const hoverRate = isHovered ? 1.05 : 1
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },

        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          if (u > endRadian) {
            return (
              offsetX +
              Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          if (u > endRadian) {
            return (
              offsetY +
              Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u)
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u)
          }
          return Math.sin(v) > 0 ? 1 * height : -1
        }
      }
    },
  },
};
</script>
<style lang="scss"></style>