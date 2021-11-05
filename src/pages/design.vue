<template>
  <div class="design-wrapper">
    <EchartsDesign
      :echarts="charts"
      :chartTree="chartTree"
      :reportTree="reportTree"
      :hooks="hooks"
      :authorization="{
        value: 'GZf16dcf98T2q670d3256448f9678abb8ydHLaBtca179fd16edd17Lp1571',
        baseUrl: 'http://127.0.0.1:8080',
      }"
      :chartDelConfig="{
        url: '/manage/report/deleteCharts.do',
      }"
      :reportDelConfig="{
        url: '/manage/report/deleteReport.do',
      }"
      @reportNode="onReportNode"
      @actions="designActions"
    />
  </div>
</template>

<script>
import {
  getChartTree,
  getReportTree,
  submitCharts,
  submitReport,
  getReportList,
} from "../api/echarts-designer";
import EchartsDesign from "../components/EchartsDesign";
export default {
  components: { EchartsDesign },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      // 加载图表和报表树
      const [chartTree, reportTree] = await Promise.all([
        getChartTree(),
        getReportTree(),
      ]);
      this.chartTree = chartTree.payload;
      this.reportTree = reportTree.payload;
    },
    // 根据报表节点去加载该报表
    async onReportNode(data, node) {
      const reportId = data.id;
      if (!reportId) return;
      const {
        payload: { attribute, chartList },
      } = await getReportList({ reportId });
      if (attribute) Object.assign(this.charts, JSON.parse(attribute) || {});
      this.charts.list = [];
      chartList.map((chartItem) => {
        const Meta = JSON.parse(chartItem.meta);
        Meta["px"] = JSON.parse(chartItem.pxunit);
        Meta["%"] = JSON.parse(chartItem.flexunit);
        this.charts.list.push(Meta);
      });
    },
    designActions(action, value) {
      if (!value.parentid) value.parentid = "0";
      switch (action) {
        case "chartTree":
          this.submitCharts(value);
          break;
        case "reportTree":
          this.submitReport(value);
          break;
      }
    },
    async submitCharts(data) {
      try {
        const { payload } = await submitCharts(data.form);
        this.charts.list = [];
        this.chartTree = payload;
      } catch (e) {
        console.warn(`表单提交失败`, e);
      }
    },
    async submitReport(data) {
      try {
        const { payload } = await submitReport(data);
        this.reportTree = payload;
      } catch (e) {
        console.warn(`报表提交失败`, e);
      }
    },
  },
  data() {
    return {
      hooks: {},
      chartTree: [], // http请求列表
      reportTree: [],
      charts: {
        id: "",
        title: "图表名称",
        background: "#F9F6F6",
        theme: "#fff",
        height: 1200,
        filter: { global: "global" },
        list: [
          // {
          //   id: "card",
          //   title: "卡片",
          //   widget: "card",
          //   borderType: "",
          //   titleColor: "#8c8c8c",
          //   valueColor: "#333",
          //   distance: 10,
          //   titleSize: "15px",
          //   valueSize: "23px",
          //   px: { x: 0, y: 0, width: 380, height: 113, z: 999 },
          //   "%": {
          //     x: 0,
          //     y: 0,
          //     width: 1,
          //     height: 0.12,
          //   },
          //   dataSource: [
          //     // 数据源
          //     {
          //       method: "get",
          //       url: "http://127.0.0.1:8080/manage/report/getDashboard.do",
          //     },
          //   ],
          //   codding: "", // 逻辑
          //   responseData: [], // 响应数据
          //   data: [
          //     {
          //       title: "登入次数",
          //       icon: "el-icon-s-check",
          //       iconColor: "#4FCAC6",
          //       value: 65621,
          //     },
          //     {
          //       title: "用户数",
          //       icon: "el-icon-user-solid",
          //       iconColor: "#4FCAC6",
          //       value: 555,
          //     },
          //     {
          //       title: "设备数",
          //       icon: "el-icon-user-solid",
          //       iconColor: "#4FCAC6",
          //       value: 85621,
          //     },
          //     {
          //       title: "刀具数",
          //       icon: "el-icon-knife-fork",
          //       iconColor: "#4FCAC6",
          //       value: 955,
          //     },
          //   ],
          // },
          // {
          //   id: "1",
          //   title: "柱形图",
          //   widget: "bar",
          //   borderType: "1",
          //   px: { x: 0, y: 0, width: 890, height: 337, z: 999 },
          //   "%": {
          //     x: 0,
          //     y: 0,
          //     width: 0.5614161849710982,
          //     height: 0.35965848452508004,
          //   },
          //   dataSource: [
          //     // 数据源
          //     {
          //       method: "get",
          //       url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
          //     },
          //   ],
          //   codding: "", // 逻辑
          //   responseData: [], // 响应数据
          //   data: {
          //     title: {
          //       text: "IPQC白班良率统计",
          //       left: "left", // center/right
          //       textStyle: {
          //         fontStyle: "normal",
          //         color: "#f00",
          //       },
          //       subtext: "",
          //     },
          //     legend: {
          //       orient: "horizontal", // vertical/horizontal
          //       // left: 0,
          //       right: 10,
          //       top: 0,
          //       bottom: 0,
          //     },
          //     tooltip: {},
          //     dataset: {
          //       dimensions: ["product", "2015", "2016", "2017"],
          //       source: [
          //         ["Matcha Latte", 43.3, 85.8, 93.7],
          //         ["Milk Tea", 83.1, 73.4, 55.1],
          //         ["Cheese Cocoa", 86.4, 65.2, 82.5],
          //         ["Walnut Brownie", 72.4, 53.9, 39.1],
          //       ],
          //     },
          //     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
          //     xAxis: {
          //       type: "category",
          //       axisLabel: {
          //         formatter: "{value}",
          //         align: "center",
          //       },
          //     },
          //     yAxis: {
          //       name: "数量",
          //       axisLabel: {
          //         formatter: "{value} 件",
          //         align: "center",
          //         position: "left",
          //         margin: 28,
          //       },
          //     },
          //     series: [
          //       { type: "bar", seriesLayoutBy: "column" },
          //       { type: "bar", seriesLayoutBy: "column" },
          //       { type: "line", seriesLayoutBy: "column" },
          //     ],
          //   },
          // },
          // {
          //   id: "2",
          //   title: "折线图",
          //   widget: "line",
          //   borderType: "8",
          //   px: { x: 0, y: 0, width: 890, height: 337, z: 999 },
          //   "%": {
          //     x: 0,
          //     y: 0.45,
          //     width: 0.5614161849710982,
          //     height: 0.35965848452508004,
          //   },
          //   dataSource: [
          //     // 数据源
          //     {
          //       method: "get",
          //       url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
          //     },
          //   ],
          //   codding: "", // 逻辑
          //   responseData: [], // 响应数据
          //   data: {
          //     title: {
          //       text: "Referer of a Website",
          //       subtext: "Fake Data",
          //       left: "center",
          //     },
          //     xAxis: {
          //       type: "category",
          //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          //     },
          //     yAxis: {
          //       type: "value",
          //     },
          //     series: [
          //       {
          //         data: [150, 230, 224, 218, 135, 147, 260],
          //         type: "line",
          //       },
          //     ],
          //   },
          // },
          // {
          //   id: "3",
          //   title: "饼图",
          //   widget: "bar",
          //   borderType: "8",
          //   px: { x: 0, y: 0, width: 350, height: 337, z: 999 },
          //   "%": {
          //     x: 0.6,
          //     y: 0,
          //     width: 0.3614161849710982,
          //     height: 0.35965848452508004,
          //   },
          //   dataSource: [
          //     // 数据源
          //     {
          //       method: "get",
          //       url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
          //     },
          //   ],
          //   codding: "", // 逻辑
          //   responseData: [], // 响应数据
          //   data: {
          //     title: {
          //       text: "Referer of a Website",
          //       subtext: "Fake Data",
          //       left: "center",
          //     },
          //     tooltip: {
          //       trigger: "item",
          //     },
          //     legend: {
          //       orient: "vertical",
          //       left: "left",
          //     },
          //     series: [
          //       {
          //         name: "Access From",
          //         type: "pie",
          //         radius: "50%",
          //         data: [
          //           { value: 1048, name: "Search Engine" },
          //           { value: 735, name: "Direct" },
          //           { value: 580, name: "Email" },
          //           { value: 484, name: "Union Ads" },
          //           { value: 300, name: "Video Ads" },
          //         ],
          //         emphasis: {
          //           itemStyle: {
          //             shadowBlur: 10,
          //             shadowOffsetX: 0,
          //           },
          //         },
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