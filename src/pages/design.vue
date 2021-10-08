<template>
  <div class="design-wrapper">
    <EchartsDesign
      :echarts="charts"
      :chartList="chartList"
      :reportList="reportList"
      :authority="{
        value: 'Vaf16dcf98O7c280d3287448f60o8abb5x28TVZV05179fd16edd177NXT6R',
      }"
      @reportNode="onReportNode"
      @actions="designActions"
    />
  </div>
</template>

<script>
import EchartsDesign from "../components/EchartsDesign";
export default {
  components: { EchartsDesign },
  methods: {
    async onReportNode(data, node) {
      console.log(data, node);
    },
    designActions(action, value) {
      console.log(action, value);
    },
  },
  data() {
    return {
      charts: {
        title: "图表名称",
        theme: "#fff",
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
            borderType: "8",
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
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      chartList: [
        // http请求列表
        {
          id: "1",
          title: "富士康工厂图表",
          icon: "el-icon-pie-chart",
          children: [
            {
              // 报表数据
              title: "IPQC良率柱形图",
              widget: "bar", // 组件名称
              borderType: "1",
              px: { x: 255, y: 389, width: 379, height: 231, z: 999 },
              "%": {
                x: 0.1842485549132948,
                y: 0.4151547491995731,
                width: 0.2738439306358382,
                height: 0.24653148345784417,
              },
              dataSource: [],
              codding: "", // 逻辑
              responseData: [], // 响应数据
              data: {
                title: {
                  text: "ECharts 入门示例",
                },
                tooltip: {},
                xAxis: {
                  data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                },
                yAxis: {},
                series: [
                  {
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20],
                  },
                ],
              }, // 图标数据
            },
            {
              id: "2",
              title: "不良缺陷折线图",
              widget: "bar",
              borderType: "8",
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
              title: "机台不良项饼图",
              widget: "pie",
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
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
      reportList: [
        // http请求列表
        {
          id: "1",
          title: "展厅报表",
          icon: "el-icon-pie-chart",
          children: [
            {
              // 报表数据
              title: "IPQC良率柱形图",
              widget: "bar", // 组件名称
              borderType: "1",
              px: { x: 255, y: 389, width: 379, height: 231, z: 999 },
              "%": {
                x: 0.1842485549132948,
                y: 0.4151547491995731,
                width: 0.2738439306358382,
                height: 0.24653148345784417,
              },
              dataSource: [],
              codding: "", // 逻辑
              responseData: [], // 响应数据
              data: {
                title: {
                  text: "ECharts 入门示例",
                },
                tooltip: {},
                xAxis: {
                  data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                },
                yAxis: {},
                series: [
                  {
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20],
                  },
                ],
              }, // 图标数据
            },
          ],
        },
      ],
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