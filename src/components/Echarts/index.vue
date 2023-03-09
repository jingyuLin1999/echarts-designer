<!--
图表组件
数据：
  charts: {
    title: "图表名称",
    background: "#F9F6F6", // 背景颜色
    theme: "#fff", // 面板主题颜色
    height: 1200, // 设计模式画布高度可调
    filter: {}, // 全局过滤条件
    dataSource: [ // 全局数据源，一次性获取所有图表的数据源
      {
        method: "get",
        url: "http://",
        respProp: "", // 响应映射字段，用.隔开
      },
    ],
    attribute: { // 全局属性
      reqType: "action", // 或auto，请求类型
    },
    listenKey: [], // 监听filter中的字段，当reqType为auto时有效
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
    :style="injectStyles"
  >
    <div class="scrollbar">
      <!-- 移动端 只显示，不做设计 -->
      <div class="mobile-wrapper" v-if="isMobile && !design">
        <Field
          class="chart-unit"
          v-for="item in echartsList"
          :key="item.id"
          :chartData="item"
          :hooks="hooks"
          :design="design"
          :echarts="friendEchart"
          :isMobile="isMobile"
          :chartsHandle="chartsHandle"
          :context="context"
          :style="{
            width: item.px.width + 'px',
            height: ['form', 'card'].includes(item.widget)
              ? '100%'
              : item.px.height + 'px',
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
            <span class="tool" @click="copyPosition(item)"
              ><icon class="el-icon-location-outline"
            /></span>
            <span class="delete-echart tool" @click="deleteChart(index)"
              ><icon class="el-icon-delete"
            /></span>
          </div>
          <Field
            :chartData="item"
            :hooks="hooks"
            :design="design"
            :echarts="friendEchart"
            :isMobile="isMobile"
            :chartsHandle="chartsHandle"
            :context="context"
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
import ClipboardJS from "clipboard";
import { Icon, Message } from "element-ui";
import eventbus from "./utils/eventbus";
import SplitLayout from "../SplitLayout";
import { mergeDeepRight, clone } from "ramda";
import "element-ui/lib/theme-chalk/index.css";
import hotkeyMixin from "./utils/hotkey.mixin";
import { chartApi, isUrl } from "./utils";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import elementResizeDetectorMaker from "element-resize-detector";
import {
  defaultAuthorization,
  defaultContainer,
  defaultHooks,
} from "./utils/defaultData";

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
    sortRules: { type: String, default: "x@y" },
  },
  provide() {
    return {
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
      return this.friendEchart.list;
    },
    friendEchart() {
      let mergeEcharts = mergeDeepRight(defaultContainer, this.echarts);
      Object.assign(this.echarts, mergeEcharts);
      return this.echarts;
    },
    injectStyles() {
      let injectStyles = {};
      let colors = this.friendEchart.attribute.colors;
      for (let key in colors) {
        injectStyles[`--${key}`] = colors[key];
      }
      Object.assign(injectStyles, {
        "--gridW": `10px`,
        "--gridH": `10px`,
        "--canvasH": this.cH + "px",
        "--background": this.friendEchart.background,
      });
      return injectStyles;
    },
  },
  watch: {
    "echarts.filter": {
      handler() {
        let reqType = this.friendEchart.attribute.reqType;
        if (reqType == "auto" && this.context.loadCompleted)
          this.reloadGlobalData();
      },
      deep: true,
    },
    "echarts.dataSource": {
      handler() {
        let reqType = this.friendEchart.attribute.reqType;
        if (reqType == "auto" && this.context.loadCompleted)
          this.reloadGlobalData();
      },
      deep: true,
    },
  },
  data() {
    return {
      cW: 1, // 画布宽
      cH: 1, // 画布高
      vLine: [], // x辅助线
      hLine: [], // y辅助线
      activeChart: {}, // 目前点击的图表
      beforeActive: {},
      isMobile: true, // 是否是移动端
      id: "A" + Math.random().toString(16).slice(2, 12), // id
      erd: elementResizeDetectorMaker(), // 监听dom变化
      chartsHandle: {}, // 所有图表的句柄，用于注册事件
      forceCloseLoading: null, // 强制关闭加载状态
      context: {
        // 组件内部上下文
        clientWidth: 0,
        childrenHttpNum: 0,
        responseHttpNum: 0,
        loadCompleted: false, // 是否加载完成
        loadCompletedTimeout: null,
      },
    };
  },
  created() {
    this.calcuMobileWidth();
    Object.assign(this.hooks, clone(defaultHooks));
    this.hooks.reloadGlobalData = this.reloadGlobalData;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.onAuthorize();
      this.pickChildrenHttpNum();
      this._registerEvents();
      this.watchCanvasDom();
      // auto初始化就要加载，子项base.mixin.js也做了判断
      if (this.friendEchart.attribute.reqType == "init") {
        this.$emit("loading", true);
        this.loadGlobalData();
      }
    },
    deepPick(keys = [], obj) {
      if (keys.length == 0) return obj;
      let pickObj = null;
      keys.map((key, index) => {
        pickObj = obj[key];
        if (pickObj && keys.length != index + 1) obj = pickObj;
      });
      return pickObj;
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
        this.emit("canvasResize");
      });
    },
    calcuMobileWh() {
      let baseWidth = 350;
      this.friendEchart.list.map((chartItem) => {
        let px = chartItem["px"];
        let takeUpNum = Math.floor((this.cW - 5) / (baseWidth + 5)) || 1;
        let unitWidth = (this.cW - 5 * takeUpNum - 5) / takeUpNum;
        px.width = unitWidth;
      });
      // 根据坐标进行排序，因为可能是乱序的
      let [sort1, sort2] = this.sortRules.split("@");
      this.sortByPx(this.friendEchart.list, sort1);
      this.sortByPx(this.friendEchart.list, sort2);
    },
    // 排序
    sortByPx(toSortArr, key) {
      toSortArr.sort((a, b) => {
        if (a.px[key] > b.px[key]) return 1;
        else if (a.px[key] < b.px[key]) return -1;
        else return 0;
      });
    },
    // 根据屏宽判断是否移动端
    async calcuMobileWidth() {
      this.getCanvasWh();
      this.isMobile = document.body.clientWidth < 500;
    },
    // 画布全局参数
    clickCanvas() {
      this.friendEchart.widget = "canvas";
      this.$emit("designItem", this.friendEchart);
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
        item.id = Math.random().toString(16).slice(2, 12);
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
    calcuPct(data) {
      if (!Object.keys(data).length) return;
      this.getCanvasWh();
      let px = data["px"];
      let pct = data["pct"];
      pct.x = Math.round((px.x * 10000) / this.cW) / 10000;
      pct.y = Math.round((px.y * 10000) / this.cH) / 10000;
      pct.width = Math.round((px.width * 10000) / this.cW) / 10000;
      pct.height = Math.round((px.height * 10000) / this.cH) / 10000;
    },
    // 报表选中
    onActivated(item) {
      if (Object.keys(this.beforeActive).length) this.beforeActive.px.z = 1;
      item.px.z = 999;
      this.beforeActive = item;
      this.activeChart = item;
      this.initHotKey(item, this.friendEchart.list);
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
      this.friendEchart.list.splice(chartIndex, 1);
    },
    // 拷贝位置
    copyPosition(item) {
      let { pct, px } = item;
      if (!pct || !px) return;
      let str = "pct:" + JSON.stringify(pct) + ",px:" + JSON.stringify(px);
      let fakerBtn = document.createElement("button");
      new ClipboardJS(fakerBtn, { text: () => str });
      fakerBtn.click();
      Message({ type: "success", message: "复制成功" });
    },
    // 根据百分比和画布大小重新计算px
    calcuPctToPx() {
      this.getCanvasWh();
      this.friendEchart.list.map((chartItem) => {
        let px = chartItem["px"];
        let pct = chartItem["pct"];
        px.x = pct.x * this.cW;
        px.width = pct.width * this.cW;
        // form和card影响
        if (this.echarts.autoY == true) {
          px.y = pct.y * this.cH;
          px.height = pct.height * this.cH;
        }
      });
    },
    // 收集http请求响应数目
    responseHttpNum() {
      this.context.responseHttpNum += 1;
      let { responseHttpNum, childrenHttpNum } = this.context;
      if (childrenHttpNum == responseHttpNum) {
        this.$emit("loading", false);
        this.context.responseHttpNum = 0;
      }
      // http加载错误时，强制关闭加载状态
      if (this.forceCloseLoading) clearTimeout(this.forceCloseLoading);
      if (childrenHttpNum == responseHttpNum) return;
      this.forceCloseLoading = setTimeout(() => {
        this.$emit("loading", false);
        this.context.responseHttpNum = 0;
        console.warn(
          "http加载数量不对或某个http加载时间超过十秒",
          `共请求数:${childrenHttpNum},只有请求数:${responseHttpNum}`
        );
      }, 10000);
    },
    // 重新加载全局数据，新写方法是因为chartEventParams不支持异步
    async reloadGlobalData() {
      this.$emit("loading", true);
      this.context.responseHttpNum = 0;
      // 子项可能要用到全局的数据，必须等全局加载完再派发
      await this.loadGlobalData(); // 重新加载全局
      this.emit("dispacthToSearch"); // 派发让子项去搜索
    },
    // 加载全局数据
    async loadGlobalData() {
      let { listenKey, dataSource, filter, ignoreFilter } = this.friendEchart;
      if (!dataSource.url) return; // 无全局数据，不需要请求
      try {
        // 排除不需要的字段
        let cloneFilter = JSON.parse(JSON.stringify(filter));
        ignoreFilter.map((key) => {
          this.$delete(cloneFilter, key);
        });
        // 请求前校验
        let reqParamsErr = listenKey.find(
          (key) => !cloneFilter[key] || cloneFilter[key].length == 0
        );
        if (!dataSource || !dataSource.url || reqParamsErr) return;
        // 请求数据
        let { method, url, respProp } = dataSource;
        if (!isUrl(url))
          url = sessionStorage.getItem("report-baseUrl") + "/" + url;
        let payload = await chartApi({ method, url, filter: cloneFilter });
        if (payload) {
          this.hooks.responseData.globalData = this.deepPick(
            respProp ? respProp.split(".") : [],
            payload
          );
        }
      } catch (e) {
        // Message({ type: "error", message: "加载全局数据失败" });
        console.error("加载全局数据失败", e);
      } finally {
        this.emit("responseHttpNum", 1);
      }
    },
    chartEventParams(type, params) {
      // form触发过滤
      const reqType = this.friendEchart.attribute.reqType;
      if (type == "searchAction") {
        this.reloadGlobalData();
      }
      this.$emit("event", { type, params });
    },
    // 注册全局总线
    _registerEvents() {
      eventbus.$on(`${this.chartId}:event`, this.chartEventParams);
      eventbus.$on(`${this.chartId}:responseHttpNum`, this.responseHttpNum);
    },
    // 发送全局总线
    emit() {
      if (arguments.length > 0) {
        arguments[0] = `${this.chartId}:${arguments[0]}`;
        eventbus.$emit(...arguments);
      }
    },
    // 注销eventbus
    _unregisterEvents() {
      eventbus.$off(`${this.chartId}:event`);
      eventbus.$off(`${this.chartId}:responseHttpNum`, this.responseHttpNum);
    },
    // 获取子请求数量
    pickChildrenHttpNum() {
      let childrenHttpNum = 0;
      // 列表http数
      let { dataSource, list } = this.friendEchart;
      list.map((item) => {
        item.dataSource.map((httpItem) => {
          if (httpItem.url) childrenHttpNum++;
        });
      });
      if (dataSource.url) childrenHttpNum++; // 全局http数
      this.context.childrenHttpNum = childrenHttpNum;
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
    scrollbar-width: thin;
    height: var(--canvasH);
    &::-webkit-scrollbar {
      width: 0px;
      height: 14px;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      background: var(--theme);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--btnBgColor);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--tableBorderColor);
    }
    &::-webkit-scrollbar-corner {
      background: #179a16;
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
        > .tool {
          cursor: pointer;
          display: block;
          width: 20px;
          text-align: center;
        }
        > .tool:hover {
          color: #f0696d;
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