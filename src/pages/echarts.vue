<template>
  <div class="echarts-demo-page">
    <div class="left">
      <button @click="close" :style="{ width: width }">textStyle</button>
    </div>
    <Echarts :echarts="charts" />
  </div>
</template>

<script>
import Echarts from "@/components/Echarts";
export default {
  components: { Echarts },
  methods: {
    close() {
      this.width = this.width == "200px" ? "0px" : "200px";
    },
  },
  data() {
    return {
      width: "200px",
      charts: {
        title: "图表名称",
        theme: "#110C2A",
        list: [
          {
            id: "1",
            title: "柱形图",
            widget: "bar",
            borderType: "1",
            px: { x: 0, y: 0, width: 890, height: 337, z: 999 },
            "%": {
              x: 0,
              y: 0,
              width: 0.5614161849710982,
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
                text: "IPQC白班良率统计",
                left: "left", // center/right
                textStyle: {
                  fontStyle: "normal",
                  color: "#f00",
                },
                subtext: "",
              },
              legend: {
                orient: "horizontal", // vertical/horizontal
                // left: 0,
                right: 10,
                top: 0,
                bottom: 0,
              },
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
              // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
              xAxis: {
                type: "category",
                axisLabel: {
                  formatter: "{value}",
                  align: "center",
                },
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
            title: "折线图",
            widget: "line",
            borderType: "8reverse",
            px: { x: 0, y: 0, width: 890, height: 337, z: 999 },
            "%": {
              x: 0,
              y: 0.45,
              width: 0.5614161849710982,
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
                text: "Referer of a Website",
                subtext: "Fake Data",
                left: "center",
              },
              xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: [150, 230, 224, 218, 135, 147, 260],
                  type: "line",
                },
              ],
            },
          },
          {
            id: "3",
            title: "饼图",
            widget: "bar",
            borderType: "8",
            px: { x: 0, y: 0, width: 350, height: 337, z: 999 },
            "%": {
              x: 0.6,
              y: 0,
              width: 0.3614161849710982,
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
                text: "Referer of a Website",
                subtext: "Fake Data",
                left: "center",
              },
              tooltip: {
                trigger: "item",
              },
              legend: {
                orient: "vertical",
                left: "left",
              },
              series: [
                {
                  name: "Access From",
                  type: "pie",
                  radius: "50%",
                  data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" },
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                    },
                  },
                },
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
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    background: #f00;
  }
  .right {
    width: 100%;
    height: 100%;
    background: #0f0;
  }
}
</style>


