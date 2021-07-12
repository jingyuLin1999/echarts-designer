<!--
名称：图表组件
数据：
  charts: {
    background: "#f00",
    lists:   [
        {
              title: "图表名称",
              widget: "bar", // 组件名称
              width: 250,    // 图标宽
              height: 180,   // 图标高
              wp: null, // 百分比，单位%默认可不写,p是percentage的简写
              hp: null,
              x: 0, // px
              y: 0, // px
              xp: 10,
              yp: 10,
              chart: {}，    // 图标数据
        },
        ....
    ]
  },

说明：
1、子组件请在widget拓展
            <icon class="el-icon-edit" />
-->
<template>
  <div class="echar-wrapper">
    <split-layout
      first-panel-size="220px"
      last-panel-size="220px"
      :hasLastPanel="hasLastPanel"
    >
      <template slot="first">
        <!-- 左侧报表组件 -->
        <tabs v-model="activeLeftTab" @tab-click="onSwitchTab">
          <tab-pane label="图表组件" name="component" class="tab-pane">
            <tree :data="chartWidgets" default-expand-all>
              <span
                class="tree-node"
                :data="onString(data)"
                slot-scope="{ node, data }"
              >
                <icon
                  v-if="node.childNodes.length > 0"
                  :class="[data.icon]"
                ></icon>
                <span class="node-label">
                  {{ data.title || data.label }}
                </span>
              </span>
            </tree>
            <!-- <ul class="widget-list-wrapper">
              <li
                v-for="(item, index) in echart"
                class="chart-widget"
                :key="index"
                :data="onString(item)"
              >
                {{ item.title }}
              </li>
            </ul> -->
          </tab-pane>
          <tab-pane label="报表设计" name="chartDesign"></tab-pane>
        </tabs>
      </template>
      <template slot="center">
        <!-- 画布 -->
        <template v-for="(item, index) in echart">
          <vue-draggable-resizable
            :key="index"
            :x="item.x"
            :y="item.y"
            :z="item.z"
            :w="item.width"
            :h="item.height"
            :active="false"
            :parent="true"
            :draggable="design"
            :resizable="design"
            @dragging="onDrag"
            @resizing="onResize"
            @activated="onActivated(item)"
            class-name-dragging="dragging-class"
          >
            <div class="tools-wrapper" v-if="design">
              <span class="delete-echart" @click="deleteChart(index)"
                >删除</span
              >
            </div>
            <Field :chartItem="item" />
          </vue-draggable-resizable>
        </template>
        <!-- DND接受容器 -->
        <div class="dnd-drop-wrapper" id="dnd-drop-wrapper"></div>
      </template>
      <template slot="last"></template>
    </split-layout>
  </div>
</template>
<script>
import Field from "./field";
import { chartApi } from "./utils";
import SplitLayout from "../SplitLayout";
import DnDMixin from "./utils/dnd.mixin.js";
import "element-ui/lib/theme-chalk/index.css";
import { Tabs, TabPane, Icon, Tree } from "element-ui";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { chartWidgets } from "./meta";
export default {
  name: "echart",
  mixins: [DnDMixin],
  components: {
    Tabs,
    Icon,
    Tree,
    TabPane,
    Field,
    SplitLayout,
    VueDraggableResizable,
  },
  provide() {
    return {
      unit: this.unit,
    };
  },
  props: {
    design: { type: Boolean, default: true }, // 是否是设计模式
    echarts: { type: Array, default: () => [] },
    unit: { type: String, default: "px" }, // 单位分为px和%
  },
  data() {
    return {
      activeLeftTab: "component", // 左侧标签页
      hasLastPanel: true,
      dragOptions: {
        selector: ".tree-node",
      },
      dropOptions: {
        enabled: true,
        effect: "move",
        preventDefault: true,
        selector: [".dnd-drop-wrapper"],
      },
      currentChart: {}, // 目前点击的图表
      echart: [],
      canvas: {
        // 画布大小
        width: 0,
        height: 0,
      },
      beforeActive: {},
      chartWidgets,
    };
  },
  mounted() {
    this.canvasWH();
    this.echart = JSON.parse(JSON.stringify(this.echarts));
    let echart = {
      http: chartApi,
      code: `let bbb=await http();`,
    };
    this.evalCode(echart);
  },
  methods: {
    async evalCode({ http, code } = {}) {
      let result = eval("(async () => {" + code + "})()");
      console.log(result);
    },
    onSwitchTab(tab, event) {
      this.hasLastPanel = !this.hasLastPanel;
    },
    onString(item) {
      return JSON.stringify(item);
    },
    async canvasWH() {
      await this.$nextTick();
      const canvas = document.getElementById("dnd-drop-wrapper");
      this.canvas.width = canvas.offsetWidth;
      this.canvas.height = canvas.offsetHeight;
    },
    onDragstart(source, event) {
      console.log(123);
      return `${$(source).attr("data")}`;
    },
    onString(item) {
      return JSON.stringify(item);
    },
    onDrop(target, data, event) {
      if (!this.design) return;
      let chart = JSON.parse(data);
      let { offsetX, offsetY } = event;
      this.currentChart = chart;
      chart.x = offsetX;
      chart.y = offsetY;
      this.calcuFlex();
      this.echart.push(chart);
    },
    calcuFlex() {
      let { width, height } = this.canvas;
      this.currentChart.xp = parseInt((this.currentChart.x / width) * 100);
      this.currentChart.yp = parseInt((this.currentChart.y / height) * 100);
    },
    onActivated(item) {
      if (Object.keys(this.beforeActive).length) this.beforeActive.z = 1;
      item.z = 999;
      this.beforeActive = item;
      this.currentChart = item;
    },
    onResize(x, y, width, height) {
      this.currentChart.x = x;
      this.currentChart.y = y;
      this.currentChart.width = width;
      this.currentChart.height = height;
      this.calcuFlex();
    },
    onDrag(x, y) {
      this.currentChart.x = x;
      this.currentChart.y = y;
      this.calcuFlex();
    },
    deleteChart(chartIndex) {
      this.echart.splice(chartIndex, 1);
    },
    $_resizeHandler() {
      this.canvasWH();
      this.calcuFlex();
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
};
</script>

<style lang="scss" >
.echar-wrapper {
  // 修复element ui tab的样式
  .el-tabs__item {
    width: 110px;
    text-align: center;
  }
  .el-tabs__header {
    height: 28px;
  }
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .tab-pane {
    width: "120px";
    height: "100%";
    .tree-node {
      font-size: 13px;
    }
  }
  .dnd-drop-wrapper {
    width: 100%;
    height: 100%;
  }
  .dragging-class {
    background-color: red;
    border: 1px solid black;
  }
  .tools-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    .delete-echart {
      cursor: pointer;
    }
  }
}
</style>