# Echarts Designer

## 说明
* echarts渲染组件
  * 基于百度echarts的图表渲染器，widgets下可自定义图表子组件    
  * 自适应不同屏宽 
  * 提供多种图表边框 
* 基于echarts的图表设计器
  * 动态设计图表，放大、缩小
  * 配置异步数据，并配有代码编辑器，可对异步数据进行简单的逻辑处理 
  * 图表自由组合生成报表
* 设计思路
  * echarts渲染组件以数据为驱动，设计器设计结果以数据形式将图表保存起来 
  * 再根据保存的图表简单排序组合生成报表，并将结果保存  
  * 报表渲染，直接将报表数据丢给echarts渲染组件

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
        :design="true"
        :authority="{ // 用于获取异步数据
            value: 'Vaf16dcf98O7c280d3287448f60o8abb5x28TVZV05179fd16edd177NXT6R',
        }"
    />
</template>
```

```js
import { Echarts, EchartsDesign } from "echarts-designer";
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
                  formatter: "{value}",
                  align: "center",
                },
              },
              yAxis: {
                axisLabel: {
                  formatter: "{value}",
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
```
