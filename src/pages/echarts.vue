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
      width: "200px",
      charts: {
        title: "图表名称",
        theme: "#110C2A",
        background: "#110C2A",
        widget: "canvas",
        list: [
          {
            id: "0",
            title: "卡片图",
            widget: "card",
            listenKey: [],
            attribute: {
              // 自定义属性
              name: "",
              distance: 10,
              titleColor: "#8c8c8c",
              valueColor: "#333",
              titleSize: "15px",
              valueSize: "23px",
            },
            border: {
              type: "7",
              reverse: true,
              color: [],
            },
            px: {
              x: 0,
              width: 1380,
              y: 11,
              z: 1,
              height: 114,
            },
            pct: {
              x: 0,
              width: 0.9971098265895953,
              y: 0.011739594450373533,
              height: 0.12166488794023479,
            },
            dataSource: [
              {
                method: "get",
                url: "http://",
                params: "",
                id: "2",
              },
            ],
            codding: "",
            data: [
              {
                title: "登入次数",
                icon: "el-icon-video-camera-solid",
                iconColor: "#4FCAC6",
                value: 6521,
              },
              {
                title: "用户数",
                icon: "el-icon-user-solid",
                iconColor: "#48A4F6",
                value: 555,
              },
              {
                title: "设备数",
                icon: "el-icon-s-platform",
                iconColor: "#EF4C6D",
                value: 8521,
              },
              {
                title: "刀具数",
                icon: "el-icon-knife-fork",
                iconColor: "#43C0A3",
                value: 955,
              },
            ],
          },
          {
            id: "1",
            title: "柱形图",
            widget: "bar",
            listenKey: [],
            attribute: {
              name: "",
            },
            border: {
              type: "12",
              reverse: false,
              color: [],
            },
            px: {
              x: 0,
              y: 143,
              width: 429,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0,
              y: 0.1526147278548559,
              width: 0.309971098265896,
              height: 0.35965848452508004,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
            data: {
              title: {
                text: "IPQC白班良率统计",
                left: "left",
                textStyle: {
                  fontStyle: "normal",
                  color: "#f00",
                },
                subtext: "",
              },
              legend: {
                orient: "horizontal",
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
                {
                  type: "bar",
                  seriesLayoutBy: "column",
                },
                {
                  type: "bar",
                  seriesLayoutBy: "column",
                },
                {
                  type: "line",
                  seriesLayoutBy: "column",
                },
              ],
            },
          },
          {
            id: "2",
            title: "折线图",
            widget: "line",
            listenKey: [],
            attribute: {
              name: "",
            },
            border: {
              type: "8",
              reverse: true,
              color: [],
            },
            px: {
              x: 451,
              y: 143,
              width: 539,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0.3258670520231214,
              y: 0.1526147278548559,
              width: 0.38945086705202314,
              height: 0.35965848452508004,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
            data: {
              title: {
                text: "一周出勤人数",
                subtext: "",
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
            listenKey: [],
            attribute: {
              name: "",
            },
            border: {
              type: "8",
              reverse: false,
              color: [],
            },
            px: {
              x: 1008,
              y: 143,
              width: 372,
              height: 337,
              z: 999,
            },
            pct: {
              x: 0.7283236994219653,
              y: 0.1526147278548559,
              width: 0.26878612716763006,
              height: 0.35965848452508004,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
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
                    {
                      value: 1048,
                      name: "Search Engine",
                    },
                    {
                      value: 735,
                      name: "Direct",
                    },
                    {
                      value: 580,
                      name: "Email",
                    },
                    {
                      value: 484,
                      name: "Union Ads",
                    },
                    {
                      value: 300,
                      name: "Video Ads",
                    },
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
          {
            id: "echarts-designer4Da3zEQ9VmjjuhLGGncnma",
            title: "饼状图",
            widget: "pie",
            listenKey: [],
            attribute: {
              name: "",
            },
            border: {
              type: "8",
              reverse: true,
              color: [],
            },
            px: {
              x: 0,
              y: 503.50000000000006,
              width: 429,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0,
              y: 0.5373532550693704,
              width: 0.309971098265896,
              height: 0.35965848452508004,
            },
            dataSource: [
              {
                method: "get",
                url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
              },
            ],
            codding: "",
            responseData: [],
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
                    {
                      value: 1048,
                      name: "Search Engine",
                    },
                    {
                      value: 735,
                      name: "Direct",
                    },
                    {
                      value: 580,
                      name: "Email",
                    },
                    {
                      value: 484,
                      name: "Union Ads",
                    },
                    {
                      value: 300,
                      name: "Video Ads",
                    },
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
  .right {
    width: 100%;
    height: 100%;
    background: #0f0;
  }
}
</style>


