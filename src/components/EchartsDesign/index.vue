<!--
图表设计器
数据格式请见echarts组件
-->
<template>
  <div class="echar-design-wrapper">
    <header class="design-header">报表设计器</header>
    <div class="split-layout">
      <split-layout first-panel-size="220px" last-panel-size="230px">
        <template slot="first">
          <!-- 左侧报表组件 -->
          <tabs v-model="activeLeftTab">
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
            </tab-pane>
            <tab-pane label="报表设计" name="chartDesign"></tab-pane>
          </tabs>
        </template>
        <template slot="center">
          <Echarts
            :echarts="echarts"
            :design="design"
            :hooks="hooks"
            @designItem="clickedChart"
          />
        </template>
        <!-- 报表属性 -->
        <template slot="last">
          <!-- {{ echarts }} -->
          <RichForm
            :schema="attrForm.schema"
            :values="attrForm.values"
            :form="attrForm.form"
          />
        </template>
      </split-layout>
    </div>
  </div>
</template>
<script>
import short from "short-uuid";
import { RichForm } from "richform";
import { chartWidgets } from "./meta/widgets";
import Echarts from "@/components/Echarts";
import DnDMixin from "@/utils/dnd.mixin.js";
import SplitLayout from "@/components/SplitLayout";
import "element-ui/lib/theme-chalk/index.css";
import { Tabs, TabPane, Icon, Tree } from "element-ui";
import { defaultContainer } from "./defaultData";

export default {
  name: "echart",
  mixins: [DnDMixin],
  components: {
    Tabs,
    Icon,
    Tree,
    TabPane,
    Echarts,
    RichForm,
    SplitLayout,
  },
  props: {
    design: { type: Boolean, default: true }, // 是否是设计模式
    echarts: { type: Object, default: () => ({}) }, // 设计数据
  },
  data() {
    return {
      dragOptions: {
        selector: ".tree-node",
      },
      dropOptions: {
        enabled: true,
        effect: "move",
        preventDefault: true,
        selector: [".dnd-drop-wrapper"],
      },
      activeLeftTab: "component", // 左侧标签页
      canvas: {
        // 画布大小
        width: 0,
        height: 0,
      },
      chartWidgets, // 左侧子组件元数据
      hooks: {}, // 钩子
      attrForm: {
        // 属性表单
        schema: {},
        values: {},
        form: {},
      },
    };
  },
  computed: {
    drawEchart() {
      return Object.keys(this.echarts).length
        ? this.echarts
        : Object.assign(this.echarts, defaultContainer);
    },
  },
  mounted() {
    this.getCanvasWh();
    // let echart = {
    //   http: chartApi,
    //   code: `let bbb=await http();`,
    // };
    // this.evalCode(echart);
  },
  methods: {
    // async evalCode({ http, code } = {}) {
    //   let result = eval("(async () => {" + code + "})()");
    //   console.log(result);
    // },
    async getCanvasWh() {
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
      let { offsetX, offsetY } = event;
      chart.px.x = offsetX - chart.px.width / 2;
      chart.px.y = offsetY - chart.px.height / 2;
      chart.id = short.generate();
      this.calcuPct(chart);
      this.drawEchart.list.push(chart);
    },
    calcuPct(chart) {
      let { width: cW, height: cH } = this.canvas;
      let px = chart["px"];
      let pct = chart["%"];
      px.z = 2;
      pct.x = px.x / cW;
      pct.y = px.y / cH;
      pct.width = px.width / cW;
      pct.height = px.height / cH;
    },
    clickedChart(item) {
      try {
        const { form, schema, values } = require(`./meta/${item.widget}`);
        Object.assign(item, values);
        this.$set(this.attrForm, "values", item);
        this.$set(this.attrForm, "form", JSON.parse(JSON.stringify(form)));
        this.$set(this.attrForm, "schema", JSON.parse(JSON.stringify(schema)));
      } catch (e) {
        this.$set(this.attrForm, "values", {});
        this.$set(this.attrForm, "form", {});
        this.$set(this.attrForm, "schema", {});
        console.warn("获取元数据失败：" + e);
      }
    },
    $_resizeHandler() {
      this.getCanvasWh();
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
.echar-design-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .design-header {
    height: 55px;
    line-height: 55px;
    position: relative;
    font-size: 20px;
    color: #fff;
    background: linear-gradient(90deg, #1179f4 45%, #079dc8, #01b3ac);
    padding: 0 5px;
    font-weight: 600;
  }
  .split-layout {
    position: relative;
    height: 100%;
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
  }
}
</style>