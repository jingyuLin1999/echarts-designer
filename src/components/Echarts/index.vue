<!--
图表组件
数据：
  charts: {
    title: "图表名称",
    background: "#F9F6F6", // 背景颜色
    theme: "#fff", // 面板主题颜色
    height: 1200, // 设计模式画布高度可调
    filter: null, // 全局过滤条件
    list: [
        { // 报表数据
              title: "图表名称",
              widget: "bar", // 组件名称
              listenKey: ["aaa","bbb"], // 当selfField下的字段改变时，带着selfField到后端获取新数据
              border: { // 边框选项
               type: "1",
              }, 
              source: [ // 数据源
                {key:"",value: ""}, // 数据源
                ....
              ],
              attribute: {
                name: "", // 自定义，在点击事件中可根据该名称区分点击的是哪个图表
                padding: 0, // 距离边距是多少 单位px
              }, // 自定义属性
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
              data: {}, [] // data 有两种格式，array和obj。 图标数据
        },
        ....
    ]
  },

1、子组件请在widget拓展
-->
<template>
  <div
    :id="chartId"
    :class="[
      'echar-wrapper',
      'dnd-drop-wrapper',
      design ? 'echarts--grid' : 'echarts--background',
    ]"
    :style="{
      '--gridW': `10px`,
      '--gridH': `10px`,
      '--background': echarts.background,
    }"
  >
    <div class="scrollbar" :style="{ height: cH + 'px' }">
      <!-- 移动端 只显示，不做设计 -->
      <div class="mobile-wrapper" v-if="isMobile && !design">
        <Field
          class="chart-unit"
          v-for="item in echartsList"
          :key="item.id"
          :chartData="item"
          :hooks="hooks"
          :design="design"
          :echarts="echarts"
          :isMobile="isMobile"
          :chartsHandle="chartsHandle"
          :style="{
            width: item.px.width + 'px',
            height: item.px.height + 'px',
          }"
        >
        </Field>
      </div>
      <!-- PC端布局 可拖动放大图表 -->
      <div
        class="personal-computer"
        v-else
        :style="{ height: design ? echarts.height + 'px' : '100%' }"
      >
        <vue-draggable-resizable
          :class="['draggable-wrapper', design ? '' : 'clear-design-border']"
          v-for="(item, index) in echartsList"
          :key="item.id"
          :parent="false"
          :active="false"
          :draggable="design"
          :resizable="design"
          :x="item.px.x"
          :y="item.px.y"
          :z="item.px.z"
          :w="item.px.width"
          :h="item.px.height"
          :snap="true"
          :grid="[2, 2]"
          :isConflictCheck="false"
          @refLineParams="getRefLineParams"
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
          <Field
            :chartData="item"
            :hooks="hooks"
            :design="design"
            :echarts="echarts"
            :isMobile="isMobile"
            :chartsHandle="chartsHandle"
          />
        </vue-draggable-resizable>
        <!--辅助线-->
        <span
          class="ref-line v-line"
          v-for="item in vLine"
          :key="item.id"
          v-show="item.display"
          :style="{
            left: item.position,
            top: item.origin,
            height: item.lineLength,
          }"
        />
        <span
          class="ref-line h-line"
          v-for="item in hLine"
          :key="item.id"
          v-show="item.display"
          :style="{
            top: item.position,
            left: item.origin,
            width: item.lineLength,
          }"
        />
        <!-- 画布点击事件 -->
        <div
          class="click-canvas"
          @click="clickCanvas"
          :style="{
            zIndex: design ? 0 : -2,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Field from "./field";
import short from "short-uuid";
import { Icon } from "element-ui";
import eventbus from "./utils/eventbus";
import SplitLayout from "../SplitLayout";
import "element-ui/lib/theme-chalk/index.css";
import hotkeyMixin from "./utils/hotkey.mixin";
import { defaultAuthorization } from "./utils/defaultData";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "echart",
  mixins: [hotkeyMixin],
  components: {
    Icon,
    Field,
    SplitLayout,
    VueDraggableResizable,
  },
  props: {
    design: { type: Boolean, default: false }, // 是否是设计模式
    echarts: { type: Object, default: () => ({}) }, // 设计数据
    hooks: { type: Object, default: () => ({}) }, // 钩子
    echartsId: { type: String, default: "" },
    authorization: { type: Object, default: () => ({}) },
    responseData: { type: Object, default: () => ({}) }, // 响应数据
  },
  provide() {
    return {
      responseData: this.responseData,
      chartId: this.chartId,
    };
  },
  computed: {
    chartId() {
      return this.echartsId.length ? this.echartsId : this.id;
    },
    echartsList() {
      // 适配不同屏宽
      // 异步加载数据延迟需要监听并重新计算
      this.isMobile && !this.design
        ? this.calcuMobileWh()
        : this.calcuPctToPx();
      return this.echarts.list;
    },
  },
  data() {
    return {
      cW: 1, // client宽
      cH: 1, // client高
      vLine: [], // x辅助线
      hLine: [], // y辅助线
      activeChart: {}, // 目前点击的图表
      beforeActive: {},
      isMobile: true, // 是否是移动端
      id: short.generate(), // id
      erd: elementResizeDetectorMaker(), // 监听dom变化
      chartsHandle: {}, // 所有图表的句柄，用于注册事件
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.onAuthorize();
      this._registerEvents();
      this.watchCanvasDom();
      this.hooks.responseData = this.responseData;
    },
    // 监听图表dom的变化
    watchCanvasDom() {
      const canvasDom = document.getElementById(this.chartId);
      this.erd.listenTo(canvasDom, () => {
        this.calcuMobileWidth();
        if (this.isMobile && !this.design) this.calcuMobileWh();
        else {
          this.calcuPctToPx();
          // https://github.com/mauricius/vue-draggable-resizable/issues/133#issuecomment-446781986
          window.dispatchEvent(new Event("resize"));
        }
      });
    },
    calcuMobileWh() {
      let baseWidth = 350;
      this.echarts.list.map((chartItem) => {
        let px = chartItem["px"];
        let takeUpNum = Math.floor((this.cW - 5) / (baseWidth + 5)) || 1;
        let unitWidth = (this.cW - 5 * takeUpNum - 5) / takeUpNum;
        px.width = unitWidth;
      });
      // 根据坐标进行排序，因为可能是乱序的
      let sorted = this.sortByPx(this.echarts.list, "x");
      this.sortByPx(sorted, "y");
    },
    sortByPx(toSortArr, key) {
      let sorted = toSortArr.sort((a, b) => {
        if (a.px[key] > b.px[key]) return 1;
        else if (a.px[key] < b.px[key]) return -1;
        else return 0;
      });
      return sorted;
    },
    // 根据屏宽判断是否移动端
    async calcuMobileWidth() {
      await this.getCanvasWh();
      this.isMobile = this.cW < 500;
    },
    // 画布全局参数
    clickCanvas() {
      this.echarts.widget = "canvas";
      this.$emit("designItem", this.echarts);
    },
    // 设置请求权限
    onAuthorize() {
      if (Object.keys(this.authorization).length == 0) return;
      const { key, value, baseUrl } = Object.assign(
        defaultAuthorization,
        this.authorization
      );
      sessionStorage.setItem("report-key", key);
      sessionStorage.setItem("report-value", value);
      sessionStorage.setItem("report-baseUrl", baseUrl);
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      if (!this.design) return;
      const { vLine, hLine } = params;
      this.uniKey(vLine);
      this.vLine = vLine;
      this.uniKey(hLine);
      this.hLine = hLine;
    },
    uniKey(arr) {
      if (!Array.isArray(arr)) return;
      arr.map((item) => {
        item.id = short.generate();
      });
    },
    // 获取画布的宽高
    async getCanvasWh() {
      await this.$nextTick();
      const canvas = document.getElementById(this.chartId);
      if (!canvas) return;
      this.cW = canvas.offsetWidth || 1;
      this.cH = canvas.offsetHeight || 1;
    },
    // 计算百分比 percentage：pct
    async calcuPct(data) {
      if (!Object.keys(data).length) return;
      await this.getCanvasWh();
      let px = data["px"];
      let pct = data["pct"];
      pct.x = px.x / this.cW;
      pct.y = px.y / this.cH;
      pct.width = px.width / this.cW;
      pct.height = px.height / this.cH;
    },
    // 报表选中
    onActivated(item) {
      if (Object.keys(this.beforeActive).length) this.beforeActive.px.z = 1;
      item.px.z = 999;
      this.beforeActive = item;
      this.activeChart = item;
      this.initHotKey(item, this.echarts.list);
      this.$emit("designItem", item);
    },
    // 拖拽
    onDragging(x, y) {
      if (!Object.keys(this.activeChart).length) return;
      this.activeChart.px.x = x;
      this.activeChart.px.y = y;
      this.calcuPct(this.activeChart);
    },
    onResize(x, y, width, height) {
      this.activeChart.px.x = x;
      this.activeChart.px.y = y;
      this.activeChart.px.width = width;
      this.activeChart.px.height = height;
      this.calcuPct(this.activeChart);
    },
    // 删除图表
    deleteChart(chartIndex) {
      this.echarts.list.splice(chartIndex, 1);
    },
    // 根据百分比和画布大小重新计算px
    async calcuPctToPx() {
      await this.getCanvasWh();
      this.echarts.list.map((chartItem) => {
        let px = chartItem["px"];
        let pct = chartItem["pct"];
        px.x = pct.x * this.cW;
        px.width = pct.width * this.cW;
        // form和card影响
        // px.y = pct.y * this.cH;
        // px.height = pct.height * this.cH;
      });
    },
    _registerEvents() {
      eventbus.$on(`${this.chartId}:event`, this.chartEventParams);
    },
    chartEventParams(type, params) {
      this.$emit("event", { type, params });
    },
    // 注销eventbus
    _unregisterEvents() {
      eventbus.$off(`${this.chartId}:event`);
    },
  },
  beforeDestroy() {
    this._unregisterEvents();
    const canvasDom = document.getElementById(this.chartId);
    if (this.erd && canvasDom) this.erd.uninstall(canvasDom);
  },
};
</script>

<style lang="scss" >
.echar-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &.echarts--grid {
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
        0% 0% / var(--gridW) var(--gridH),
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% /
        var(--gridW) var(--gridH),
      var(--background);
  }
  &.echarts--background {
    background: var(--background);
  }
  .scrollbar {
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0px;
      height: 10px;
    }
    &::-moz-scrollbar {
      width: 0px;
      height: 10px;
    }
    &::-ms-scrollbar {
      width: 0px;
      height: 10px;
    }
  }
  .click-canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .dragging-class {
    border: 1px solid black;
  }
  .clear-design-border {
    border: 0;
  }
  // PC端
  .personal-computer {
    width: 100%;
    height: 100%;
    position: relative;
    .draggable-wrapper {
      .tools-wrapper {
        width: 95%;
        height: 20px;
        padding: 0 5px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 9999;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > span {
          cursor: pointer;
        }
      }
    }
  }
  // 移动端
  .mobile-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-left: 5px;
    .chart-unit {
      margin-right: 5px;
      margin-top: 5px;
    }
  }
}
</style>