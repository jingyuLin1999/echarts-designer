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
import { Echarts, EchartsDesign, CoolNavigation } from "echarts-designer";
export default {
  components: { Echarts, EchartsDesign, CoolNavigation },
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
        title: "图表名称",
        theme: "", // dark|light
        background: "#110C2A",
        widget: "canvas",
        list: [
          {
            id: "3",
            title: "饼图",
            widget: "bar",
            listenKey: [],
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
        ],
      },
    };
  },
};
```
