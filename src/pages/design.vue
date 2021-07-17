<template>
  <div class="design-wrapper">
    <EchartsDesign :echarts="charts" :design="true" />
  </div>
</template>

<script>
import EchartsDesign from "../components/EchartsDesign";
export default {
  components: { EchartsDesign },
  data() {
    return {
      charts: {
        unit: "px", // 单位 px(默认) | %
        background: "#f00", // 背景颜色
        list: [
          {
            id: "2",
            title: "图表名称",
            widget: "bar",
            px: { x: 0, y: 0, width: 480, height: 330, z: 1 },
            "%": { x: 0, y: 0, width: 33, height: 37 },
            data: {
              title: { text: "ECharts 入门示例" },
              tooltip: {},
              xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
              },
              yAxis: {},
              series: [
                { name: "销量", type: "bar", data: [5, 20, 36, 10, 10, 20] },
              ],
            },
          },
        ],
      },
      // chartList: [
      //   {
      //     title: "柱形图",
      //     widget: "bar",
      //     width: 250,
      //     height: 180,
      //     wp: null,
      //     hp: null,
      //     x: 0,
      //     y: 0,
      //     xp: null,
      //     yp: null,
      //     chart: {
      //       title: {
      //         text: "ECharts 入门示例",
      //       },
      //       tooltip: {},
      //       xAxis: {
      //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      //       },
      //       yAxis: {},
      //       series: [
      //         {
      //           name: "销量",
      //           type: "bar",
      //           data: [5, 20, 36, 10, 10, 20],
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     title: "基础折线图",
      //     widget: "basicline",
      //     width: 250,
      //     height: 180,
      //     x: 260,
      //     y: 0,
      //     chart: {
      //       xAxis: {
      //         type: "category",
      //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           data: [150, 230, 224, 218, 135, 147, 260],
      //           type: "line",
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     title: "平滑折线图",
      //     widget: "smootchedline",
      //     width: 250,
      //     height: 180,
      //     x: 520,
      //     y: 0,
      //     chart: {
      //       xAxis: {
      //         type: "category",
      //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           data: [150, 230, 224, 218, 135, 147, 260],
      //           type: "line",
      //           smooth: true,
      //           areaStyle: {
      //             background: "#f00",
      //           },
      //         },
      //       ],
      //     },
      //   },
      // ],
    };
  },
};
</script>

<style lang ="scss">
.design-wrapper {
  height: 100%;
  position: relative;
}
</style>