<!--
图表组件
数据：
  charts: {
    title: "图表名称",
    background: "#f00", // 背景颜色
    list: [
        { // 报表数据
              title: "图表名称",
              widget: "bar", // 组件名称
              border: { // 边框选项
               type: "1",
              }, 
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
-->
<template>
  <div
    class="echar-wrapper dnd-drop-wrapper"
    id="dnd-drop-wrapper"
    :style="{ background: echarts.bgColor }"
  >
    <!-- 可拖动放大图表 -->
    <vue-draggable-resizable
      :class="['draggable-wrapper', design ? '' : 'clear-design-border']"
      v-for="(item, index) in echarts.list"
      :key="item.id"
      :parent="true"
      :active="false"
      :draggable="design"
      :resizable="design"
      :x="item.px.x"
      :y="item.px.y"
      :z="item.px.z"
      :w="item.px.width"
      :h="item.px.height"
      :snap="true"
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
      <Border
        :chartData="item"
        :hooks="hooks"
        :design="design"
        :echarts="echarts"
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
    <div class="click-canvas" @click="clickCanvas"></div>
  </div>
</template>
<script>
import Border from "./border";
import short from "short-uuid";
import { Icon } from "element-ui";
import SplitLayout from "../SplitLayout";
import "element-ui/lib/theme-chalk/index.css";
import hotkeyMixin from "./utils/hotkey.mixin";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import { defaultAuthority } from "./utils/defaultData";

export default {
  name: "echart",
  mixins: [hotkeyMixin],
  components: { Icon, Border, SplitLayout, VueDraggableResizable },
  props: {
    design: { type: Boolean, default: false }, // 是否是设计模式
    echarts: { type: Object, default: () => ({}) }, // 设计数据
    hooks: { type: Object, default: () => ({}) }, // 钩子
    authority: { type: Object, default: () => ({}) }, // 令牌,服务器交互权限认证
  },
  data() {
    return {
      vLine: [],
      hLine: [],
      activeChart: {}, // 目前点击的图表
      beforeActive: {},
    };
  },
  mounted() {
    // 初始化适配不同屏宽
    this.calcuPctToPx();
    this.onAuthorize();
  },
  methods: {
    // 权限
    onAuthorize() {
      const { key, value } = Object.assign(defaultAuthority, this.authority);
      sessionStorage.setItem("auth-key", key);
      sessionStorage.setItem("auth-value", value);
    },
    // 画布全局参数
    clickCanvas() {
      this.echarts.widget = "canvas";
      this.$emit("designItem", this.echarts);
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
      const canvas = document.getElementById("dnd-drop-wrapper");
      if (!canvas) return;
      const cW = canvas.offsetWidth || 1;
      const cH = canvas.offsetHeight || 1;
      return { cW, cH };
    },
    // 计算百分比 percentage：pct
    async calcuPct(data) {
      if (!Object.keys(data).length) return;
      const { cW, cH } = await this.getCanvasWh();
      let px = data["px"];
      let pct = data["%"];
      pct.x = px.x / cW;
      pct.y = px.y / cH;
      pct.width = px.width / cW;
      pct.height = px.height / cH;
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
      const { cW, cH } = await this.getCanvasWh();
      this.echarts.list.map((chartItem) => {
        let px = chartItem["px"];
        let pct = chartItem["%"];
        px.x = pct.x * cW;
        px.y = pct.y * cH;
        px.width = pct.width * cW;
        px.height = pct.height * cH;
      });
    },
    // 响应式适配不同屏宽
    $_resizeHandler() {
      this.calcuPctToPx();
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
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .click-canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .dragging-class {
    // background-color: #fff;
    border: 1px solid black;
  }
  .clear-design-border {
    border: 0;
  }
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
</style>