# Echarts Designer

## 说明
* echarts渲染组件
  * 基于百度echarts的图表渲染器，widgets下可自定义图表子组件    
  * 自适应不同屏宽 
  * 提供多种图表边框 
* 基于echarts的图表设计器。旨在让开发者只管报表数据逻辑
  * 动态设计图表，放大、缩小
  * 配置异步数据，并配有代码编辑器，可对异步数据进行简单的逻辑处理 
  * 图表自由组合生成报表
* 设计思路
  * echarts渲染组件以数据为驱动，设计器设计结果以数据形式将图表保存起来 
  * 再根据保存的图表简单排序组合生成报表，并将结果保存  
  * 报表渲染，直接将报表数据丢给echarts渲染组件

## 预览

### 本地预览
```
npm install

npm run serve
```
[报表设计器](http://localhost:8080/#/)  
http://localhost:8080/#/

[设计结果](http://localhost:8080/#/echarts)  
http://localhost:8080/#/echarts

## 文档
* 若对echarts基础概念不了解，请先阅读[echarts概念篇](https://echarts.apache.org/handbook/zh/concepts/visual-map)

## 用法
```
npm i echarts-designer -S
```

```html
<template>
  <EchartsDesign
      class="design-wrapper"
      :echarts="charts"
      :authority="{ // token
          value: 'Vaf16dcf98O7c280d3287448f60o8abb5x28TVZV05179fd16edd177NXT6R',
      }"
      @chartNode="onChartNode"
      @reportNode="onReportNode"
      @delete="onDelete"
      @submitValues="onSubmit"
      @clickedChart="onClickedChart"
  />
</template>
```

```js
import { Echarts, EchartsDesign, CoolNavigation, PerfectBorder } from "echarts-designer";
export default {
  components: { Echarts, EchartsDesign, CoolNavigation, PerfectBorder },
  methods: {
    onClickedChart(data) {
      console.log("clickedChart", data);
    },
    onSubmit({ type, data }) {
      console.log(type, data);
    },
    onChartNode(){},
    onReportNode(){},
    onDelete({ data, type }){
      console.log(type, data);
    },
  },
  data() {
    return {
      charts: {
        id: -1,
        title: "图表名称",
        theme: "", // dark|light
        background: "#fff",
        height: 1200,
        filter: { aaa: 123 },
        dataSource: {
          method: "get",
          url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
        },
        listenKey: [],
        widget: "canvas",
        list: [
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
              ]
            },
          },
        ],
      },
    };
  },
};
```
