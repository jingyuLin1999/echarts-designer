<template>
  <div class="design-wrapper">
    <EchartsDesign
      :echarts="charts"
      :design="true"
      :authority="{
        value: 'Vaf16dcf98O7c280d3287448f60o8abb5x28TVZV05179fd16edd177NXT6R',
      }"
    />
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
            px: { x: 0, y: 0, width: 792, height: 337, z: 999 },
            "%": {
              x: 0,
              y: 0,
              width: 0.7880597014925373,
              height: 0.35965848452508004,
            },
            dataSource: [
              // 数据源
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "", // 逻辑
            responseData: [], // 响应数据
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