<!--
图表组件
数据：
  charts: {
    unit: 'px', // 单位 px | %
    background: "#f00", // 背景颜色
    list: [
        { // 报表数据
              title: "图表名称",
              widget: "bar", // 组件名称
              source: [ // 数据源
                {key:"",value: ""}, // 数据源
                ....
              ],
              codding: {}, // 自定义逻辑
              px: { // 保存两种坐标，为了适配
                x: '', // x坐标
                y: '', // y坐标
                width: '',  // 图标宽
                height: '', // 图标高
              },
              '%': {
                x: '',
                y: '',
                width: '',
                height: '',
              },
              data: {}, // 图标数据
        },
        ....
    ]
  },


1、子组件请在widget拓展
    <icon class="el-icon-edit" />
-->
<template>
  <div class="echar-wrapper dnd-drop-wrapper" id="dnd-drop-wrapper">
    {{ drawEchart[0] }}
    <template v-for="(item, index) in drawEchart">
      <Field
        v-if="unit == '%'"
        :key="item.id"
        :chartData="item"
        :hooks="hooks"
        :style="{
          position: 'absolute',
          left: item['%'].x + '%',
          top: item['%'].y + '%',
          width: item['%'].width + '%',
          height: item['%'].height + '%',
        }"
      />
      <vue-draggable-resizable
        v-else
        :key="item.id"
        :parent="true"
        :active="false"
        :grid="[10, 10]"
        :draggable="design"
        :resizable="design"
        :x="item.px.x"
        :y="item.px.y"
        :z="item.px.z"
        :w="item.px.width"
        :h="item.px.height"
        @dragging="onDragging"
        @resizing="onResize"
        @activated="onActivated(item)"
        class-name-dragging="dragging-class"
      >
        <div class="tools-wrapper" v-if="design">
          <span class="delete-echart tool" @click="deleteChart(index)"
            ><icon class="el-icon-delete"
          /></span>
        </div>
        <Field :chartData="item" :hooks="hooks" :design="design" />
      </vue-draggable-resizable>
    </template>
  </div>
</template>
<script>
import Field from "./field";
import SplitLayout from "../SplitLayout";
import "element-ui/lib/theme-chalk/index.css";
import { Icon } from "element-ui";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import "virtual-ruler/dist/virtual-ruler.css";
import VirtualRuler from "virtual-ruler";
import { chartWidgets } from "./meta";
export default {
  name: "echart",
  components: { Icon, Field, SplitLayout, VirtualRuler, VueDraggableResizable },
  provide() {
    return {
      unit: this.echarts.unit || "px",
    };
  },
  props: {
    design: { type: Boolean, default: true }, // 是否是设计模式
    echarts: { type: Object, default: () => ({}) }, // 设计数据
    hooks: { type: Object, default: () => ({}) }, // 钩子
  },
  data() {
    return {
      dropOptions: {
        enabled: true,
        effect: "move",
        preventDefault: true,
        selector: [".dnd-drop-wrapper"],
      },
      activeLeftTab: "component", // 左侧标签页
      activeChart: {}, // 目前点击的图表
      drawEchart: [], // 画图表的容器
      canvas: {
        // 画布大小
        width: 0,
        height: 0,
        change: false, // 画布大小是否改变
      },
      beforeActive: {},
      chartWidgets, // 左侧子组件元数据
    };
  },
  computed: {
    unit() {
      return this.echarts.unit;
    },
  },
  mounted() {
    this.canvasWH();
    this.drawEchart = JSON.parse(JSON.stringify(this.echarts.list));
  },
  methods: {
    async canvasWH() {
      await this.$nextTick();
      const canvas = document.getElementById("dnd-drop-wrapper");
      if (!canvas) return;
      this.canvas.width = canvas.offsetWidth;
      this.canvas.height = canvas.offsetHeight;
    },
    onDragstart(source, event) {
      return `${$(source).attr("data")}`;
    },
    onString(item) {
      return JSON.stringify(item);
    },
    onDrop(target, data, event) {
      if (!this.design) return;
      let chart = JSON.parse(data);
      let unit = this.echarts.unit;
      let { offsetX, offsetY } = event;
      chart.id = Math.random().toString(16).slice(3, 12);
      this.activeChart = chart;
      chart[unit].x = offsetX;
      chart[unit].y = offsetY;
      this.calcuFlex();
      this.drawEchart.push(chart);
    },
    // 计算百分比
    calcuFlex() {
      if (!Object.keys(this.activeChart).length) return;
      let { width: canvasWidth, height: canvasHeight } = this.canvas;
      let px = this.activeChart["px"];
      let percentage = this.activeChart["%"];
      percentage.x = parseInt((px.x / canvasWidth) * 100);
      percentage.y = parseInt((px.y / canvasHeight) * 100);
      percentage.width = parseInt((px.width / canvasWidth) * 100);
      percentage.height = parseInt((px.height / canvasHeight) * 100);
    },
    onActivated(item) {
      if (Object.keys(this.beforeActive).length)
        this.beforeActive[this.unit].z = 1;
      item[this.unit].z = 999;
      this.beforeActive = item;
      this.activeChart = item;
    },
    onDragging(x, y) {
      if (!Object.keys(this.activeChart).length) return;
      this.activeChart[this.unit].x = x;
      this.activeChart[this.unit].y = y;
      this.calcuFlex();
    },
    onResize(x, y, width, height) {
      this.activeChart[this.unit].x = x;
      this.activeChart[this.unit].y = y;
      this.activeChart[this.unit].width = width;
      this.activeChart[this.unit].height = height;
      this.calcuFlex();
    },
    deleteChart(chartIndex) {
      this.drawEchart.splice(chartIndex, 1);
    },
    $_resizeHandler() {
      this.canvasWH();
      this.calcuFlex();
      this.hooks.redraw();
    },
  },
};
</script>

<style lang="scss" >
.echar-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .dragging-class {
    background-color: red;
    border: 1px solid black;
  }
  .first {
    // 修复element ui tab的样式
    .el-tabs__item {
      width: 110px;
      text-align: center;
    }
    .el-tabs__header {
      height: 28px;
    }
    .tab-pane {
      width: "120px";
      height: "100%";
      .tree-node {
        font-size: 13px;
      }
    }
  }
  .center-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    .canvas-header {
      width: 100%;
      height: 45px;
    }
    .canvas-aside {
      width: 45px;
      height: calc(100% - 45px);
      background: #f00;
      overflow: hidden;
      > .column-ruler {
        // width: 100%;
        // transform: rotate(90deg);
        // background: #00f;
      }
    }
    .canvas-body {
      width: calc(100% - 45px);
      height: calc(100% - 45px);
      position: relative;
      > .dnd-drop-wrapper {
        width: 100%;
        height: 100%;
        background: #0f0;
      }
      .tools-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9999;
        .tool {
          font-size: 16px;
        }
        .delete-echart {
          cursor: pointer;
        }
      }
    }
  }
}
</style>