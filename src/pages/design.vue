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
        title: "图表名称",
        bgColor: "#fff",
        list: [
          {
            id: "1",
            title: "柱形图",
            widget: "bar",
            borderType: "1",
            px: { x: 0, y: 3, width: 552, height: 337, z: 2 },
            "%": {
              x: 0,
              y: 0.0032017075773745998,
              width: 0.4546952224052718,
              height: 0.35965848452508004,
            },
            data: {
              title: {
                text: "ECharts 入门示例",
                subtext: "Living Expenses in Shenzhen",
              },
              legend: {
                orient: "horizontal", // vertical/horizontal
                left: 0,
                // top: 0,
                bottom: 0,
              },
              tooltip: {},
              dataset: {
                source: [
                  ["product", "2015", "2016", "2017"],
                  ["Matcha Latte", 43.3, 85.8, 93.7],
                  ["Milk Tea", 83.1, 73.4, 55.1],
                  ["Cheese Cocoa", 86.4, 65.2, 82.5],
                  ["Walnut Brownie", 72.4, 53.9, 39.1],
                ],
              },
              // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
              xAxis: {
                type: "category",
                axisLabel: {
                  formatter: "{value} kg",
                  align: "center",
                },
              },
              yAxis: {
                axisLabel: {
                  formatter: "{value} 元",
                  align: "center",
                  position: "right",
                },
              },
              series: [
                { type: "bar", seriesLayoutBy: "column" },
                { type: "bar", seriesLayoutBy: "column" },
                { type: "bar", seriesLayoutBy: "column" },
              ],
            },
          },
          // {
          //   id: "3",
          //   title: "图表名称",
          //   widget: "bar",
          //   borderType: "1",
          //   px: { x: 604, y: 2.5, width: 492, height: 338, z: 999 },
          //   "%": {
          //     x: 0.4975288303130148,
          //     y: 0.0026680896478121665,
          //     width: 0.4052718286655684,
          //     height: 0.3607257203842049,
          //   },
          //   data: {
          //     title: { text: "ECharts 入门示例" },
          //     tooltip: {},
          //     xAxis: {
          //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          //     },
          //     yAxis: {},
          //     series: [
          //       {
          //         name: "销量",
          //         type: "bar",
          //         data: [5, 20, 36, 10, 10, 20],
          //       },
          //     ],
          //   },
          // },
        ],
      },
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