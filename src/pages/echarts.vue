<template>
  <div class="echarts-demo-page">
    <Echarts :echarts="charts" />
  </div>
</template>

<script>
import Echarts from "@/components/Echarts";
export default {
  components: { Echarts },
  data() {
    return {
      charts: {
        title: "图表名称",
        theme: "#110C2A",
        list: [
          {
            id: "1",
            title: "柱形图",
            widget: "bar",
            borderType: "1",
            px: {
              x: 600,
              y: 98,
              width: 767.4559248554913,
              height: 308.2273212379936,
              z: 999,
            },
            "%": {
              x: 0.4389173372348208,
              y: 0,
              width: 0.5614161849710982,
              height: 0.36650097650177593,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
            responseData: [{ a: "helloA", b: "helloB", field_3: "13" }],
            data: {
              title: {
                text: "IPQC白班良率统计",
                left: "left",
                textStyle: { fontStyle: "normal", color: "#f00" },
                subtext: "",
              },
              legend: { orient: "horizontal", right: 10, top: 0, bottom: 0 },
              tooltip: {},
              dataset: {
                dimensions: ["product", "2015", "2016", "2017"],
                source: [
                  ["Matcha Latte", 43.3, 85.8, 93.7],
                  ["Milk Tea", 83.1, 73.4, 55.1],
                  ["Cheese Cocoa", 86.4, 65.2, 82.5],
                  ["Walnut Brownie", 72.4, 53.9, 39.1],
                ],
              },
              xAxis: {
                type: "category",
                axisLabel: { formatter: "{value}", align: "center" },
              },
              yAxis: {
                name: "数量",
                axisLabel: {
                  formatter: "{value} 件",
                  align: "center",
                  position: "left",
                  margin: 28,
                },
              },
              series: [
                { type: "bar", seriesLayoutBy: "column" },
                { type: "bar", seriesLayoutBy: "column" },
                { type: "line", seriesLayoutBy: "column" },
              ],
            },
          },
          {
            id: "2",
            title: "柱形图",
            widget: "bar",
            borderType: "8",
            px: {
              x: 599,
              y: 447,
              width: 767.4559248554913,
              height: 273.7001067235859,
              z: 999,
            },
            "%": {
              x: 0.4381858083394294,
              y: 0.5873850197109067,
              width: 0.5614161849710982,
              height: 0.35965848452508004,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
            responseData: [{ a: "helloA", b: "helloB", field_3: "13" }],
            data: {
              title: {
                text: "IPQC白班良率统计",
                left: "left",
                textStyle: { fontStyle: "normal", color: "#f00" },
                subtext: "",
              },
              legend: { orient: "horizontal", right: 10, top: 0, bottom: 0 },
              tooltip: {},
              dataset: {
                dimensions: ["product", "2015", "2016", "2017"],
                source: [
                  ["Matcha Latte", 43.3, 85.8, 93.7],
                  ["Milk Tea", 83.1, 73.4, 55.1],
                  ["Cheese Cocoa", 86.4, 65.2, 82.5],
                  ["Walnut Brownie", 72.4, 53.9, 39.1],
                ],
              },
              xAxis: {
                type: "category",
                axisLabel: { formatter: "{value}", align: "center" },
              },
              yAxis: {
                name: "数量",
                axisLabel: {
                  formatter: "{value} 件",
                  align: "center",
                  position: "left",
                  margin: 28,
                },
              },
              series: [
                { type: "bar", seriesLayoutBy: "column" },
                { type: "bar", seriesLayoutBy: "column" },
                { type: "line", seriesLayoutBy: "column" },
              ],
            },
          },
        ],
        widget: "canvas",
      },
    };
  },
};
</script>

<style lang="scss">
.echarts-demo-page {
  width: 100%;
  height: 100%;
}
</style>


