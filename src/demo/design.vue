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
      @clickedChart="onClickedChart"
      @submitValues="onSubmit"
    />
  </div>
</template>

<script>
import EchartsDesign from "@/components/EchartsDesign";
export default {
  components: { EchartsDesign },
  methods: {
    onClickedChart(data) {
      console.log("clickedChart", data);
    },
    onSubmit({ type, data }) {
      console.log(type, data);
    },
  },
  data() {
    return {
      hooks: {},
      chartTree: [
        {
          id: "as0",
          title: "一楼展厅",
          icon: "el-icon-pie-chart",
          children: [
            {
              id: "as1",
              title: "柱形图",
              widget: "bar",
              listenKey: [""],
              attribute: {
                name: "",
                padding: 0,
              },
              border: {
                type: "12",
                reverse: false,
                color: [],
              },
              px: {
                x: 0,
                y: 238,
                width: 349.9573699421966,
                height: 337,
                z: 1,
              },
              pct: {
                x: 0,
                y: 0.25400213447171827,
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
                  text: "工厂良率统计",
                  left: "left",
                  textStyle: {
                    fontStyle: "normal",
                    color: "#f00",
                  },
                  subtext: "",
                },
                grid: {
                  x: 50,
                  y: 50,
                  x2: 50,
                  y2: 50,
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
                    align: "right",
                    rotate: "20",
                    interval: 0,
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
                backgroundColor: "#fff",
              },
            },
          ],
        },
      ], // http请求列表
      reportTree: [
        {
          id: "as1",
          title: "一楼展厅",
          icon: "el-icon-pie-chart",
          children: [
            {
              id: "as2",
              title: "产量",
              icon: "",
            },
          ],
        },
      ],
      charts: {
        id: "-1",
        title: "图表名称",
        background: "#fff",
        theme: "",
        height: 1200,
        filter: { aaa: 123 },
        dataSource: {
          method: "get",
          url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
        },
        list: [
          {
            id: "-1",
            title: "表单",
            widget: "form",
            listenKey: [],
            attribute: {},
            border: {
              type: "8",
              reverse: true,
              color: [],
            },
            px: {
              x: 0,
              width: 1125.4974146845916,
              y: 11,
              z: 999,
              height: 72,
            },
            pct: {
              x: 0,
              width: 0.9968976215098242,
              y: 0.011739594450373533,
              height: 0.07257203842049093,
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
            data: {
              form: {
                border: false,
                grid: false,
                labelSuffix: ":",
                labelWidth: "80px",
                validator: "input",
                labelAlign: "right",
                labelInline: true,
                actions: [],
                colors: {
                  // theme: "#120C2A",
                  // fontColor: "#37d0fa",
                  // btnColor: "#f8f4f4",
                  // btnBgColor: "#040c19",
                  // activeColor: "#4F9FFE",
                  // dateRangeBgColor: "#999",
                  // multiOptionBgColor: "#ddd",
                },
                layout: [
                  {
                    widget: "grid",
                    title: "文件上传",
                    showTitle: false,
                    isClicked: false,
                    flexWrap: true,
                    ratio: "1:2:1:1",
                    fields: [
                      [
                        {
                          title: "选择工厂",
                          name: "group_code1",
                          widget: "select",
                          options: [
                            {
                              label: "工厂一",
                              value: "工厂一",
                            },
                            {
                              label: "工厂二",
                              value: "工厂二",
                            },
                          ],
                          isGroup: false,
                          placeholder: "请选择",
                          size: "",
                          disabled: false,
                          clearable: false,
                          multiple: false,
                          collapseTags: false,
                          filterable: false,
                          allowCreate: false,
                          defaultProp: {
                            label: "label",
                            value: "value",
                          },
                          filter: {
                            key: null,
                            value: null,
                          },
                        },
                      ],
                      [
                        {
                          title: "选择工序",
                          name: "group_code1",
                          widget: "select",
                          options: [],
                          isGroup: false,
                          placeholder: "请选择",
                          size: "",
                          disabled: false,
                          clearable: false,
                          multiple: false,
                          collapseTags: false,
                          filterable: false,
                          allowCreate: false,
                          defaultProp: {
                            label: "label",
                            value: "value",
                          },
                          filter: {
                            key: null,
                            value: null,
                          },
                        },
                      ],
                      [
                        {
                          title: "选择工厂",
                          name: "group_code1",
                          widget: "select",
                          options: [
                            {
                              label: "工厂一",
                              value: "工厂一",
                            },
                            {
                              label: "工厂二",
                              value: "工厂二",
                            },
                          ],
                          isGroup: false,
                          placeholder: "请选择",
                          size: "",
                          disabled: false,
                          clearable: false,
                          multiple: false,
                          collapseTags: false,
                          filterable: false,
                          allowCreate: false,
                          defaultProp: {
                            label: "label",
                            value: "value",
                          },
                          filter: {
                            key: null,
                            value: null,
                          },
                        },
                      ],
                      [
                        {
                          title: "选择工序",
                          name: "group_code1",
                          widget: "select",
                          options: [],
                          isGroup: false,
                          placeholder: "请选择",
                          size: "",
                          disabled: false,
                          clearable: false,
                          multiple: false,
                          collapseTags: false,
                          filterable: false,
                          allowCreate: false,
                          defaultProp: {
                            label: "label",
                            value: "value",
                          },
                          filter: {
                            key: null,
                            value: null,
                          },
                        },
                      ],
                    ],
                  },
                ],
              },
              schema: {},
            },
            layout: [],
            schema: {},
          },
          {
            id: "0",
            title: "卡片图",
            widget: "card",
            listenKey: ["aaa", "bbb"],
            attribute: {
              bgColor: "#fff",
              titleColor: "#8c8c8c",
              valueColor: "#333",
              titleSize: "15px",
              valueSize: "23px",
              distance: 8,
            },
            border: {
              type: "7",
              reverse: true,
              color: [],
            },
            px: {
              x: 0,
              width: 1125.736994219653,
              y: 100,
              z: 1,
              height: 114,
            },
            pct: {
              x: 0,
              width: 0.9971098265895952,
              y: 0.10672358591248667,
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
                value: 65621,
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
                value: 85621,
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
            listenKey: [""],
            attribute: {
              name: "",
              padding: 0,
            },
            border: {
              type: "12",
              reverse: false,
              color: [],
            },
            px: {
              x: 0,
              y: 238,
              width: 349.9573699421966,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0,
              y: 0.25400213447171827,
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
              grid: {
                x: 50,
                y: 50,
                x2: 50,
                y2: 50,
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
                  align: "right",
                  rotate: "20",
                  interval: 0,
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
              backgroundColor: "#fff",
            },
          },
          {
            id: "2",
            title: "折线图",
            widget: "line",
            listenKey: [""],
            attribute: {
              name: "",
              padding: 0,
            },
            border: {
              type: "8",
              reverse: true,
              color: [],
            },
            px: {
              x: 366,
              y: 238,
              width: 439.69002890173414,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0.32418069087688217,
              y: 0.25400213447171827,
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
              backgroundColor: "#fff",
            },
          },
          {
            id: "3",
            title: "饼图",
            widget: "pie",
            listenKey: [""],
            attribute: {
              name: "",
              padding: 0,
            },
            border: {
              type: "8",
              reverse: false,
              color: [],
            },
            px: {
              x: 822,
              y: 238,
              width: 303.45953757225436,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0.7280779450841453,
              y: 0.25400213447171827,
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
              backgroundColor: "#fff",
            },
          },
          {
            id: "echarts-designer4Da3zEQ9VmjjuhLGGncnma",
            title: "饼状图",
            widget: "pie",
            listenKey: [""],
            attribute: {
              name: "",
              padding: 0,
            },
            border: {
              type: "8",
              reverse: true,
              color: [],
            },
            px: {
              x: 0,
              y: 596,
              width: 349.9573699421966,
              height: 337,
              z: 1,
            },
            pct: {
              x: 0,
              y: 0.6360725720384205,
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
              backgroundColor: "#fff",
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