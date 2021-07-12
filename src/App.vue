<template>
  <div id="app">
    <header class="app-header">报表设计器</header>
    <Echarts :echarts="chartList" :design="true" />
  </div>
</template>

<script>
import DnDMixin from "./mixins/dnd.mixin";
import Echarts from "./components/Echarts";

export default {
  name: "App",
  mixins: [DnDMixin],
  components: {
    Echarts,
    // "cs-ruler": ruler.CsingRuler
  },
  data() {
    return {
      //允许拖动
      charts: {
        background: "#f00",
        lists: [],
      },
      chartList: [
        {
          title: "柱形图",
          widget: "bar",
          width: 250,
          height: 180,
          wp: null,
          hp: null,
          x: 0,
          y: 0,
          xp: null,
          yp: null,
          chart: {
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
          },
        },
        {
          title: "基础折线图",
          widget: "basicline",
          width: 250,
          height: 180,
          x: 260,
          y: 0,
          chart: {
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
          title: "平滑折线图",
          widget: "smootchedline",
          width: 250,
          height: 180,
          x: 520,
          y: 0,
          chart: {
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
                smooth: true,
                areaStyle: {
                  background: "#f00",
                },
              },
            ],
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
$headerBg: red;
@import url("./assets/css/base.scss");
#app {
  display: flex;
  flex-direction: column;
  .app-header {
    height: 55px;
    line-height: 55px;
    font-size: 20px;
    color: #fff;
    background: linear-gradient(90deg, #1179f4 45%, #079dc8, #01b3ac);
    box-shadow: 0 8px 10px #ccc;
    padding: 0 5px;
    font-weight: 600;
  }
  .app-main {
    display: flex;
    height: 100%;
    .ecahrts-nav {
      width: 280px;
      height: 100%;
      background: #fff;
      display: inline-block;
      box-shadow: 2px 0 10px #ccc;
      background: #0f0;
    }
    .ecahrts-wrapper {
      width: 100%;
      height: 100%;
      background: #f3f4fa;
      display: inline-block;
    }
    .attribute {
      width: 300px;
      background: yellow;
    }
  }
}
</style>
