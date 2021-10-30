<!--
图表设计器
数据格式请见echarts组件
-->
<template>
  <div class="echar-design-wrapper">
    <header class="design-header" v-if="showHeader">
      <div class="header-left">
        <a
          target="_blank"
          href="https://github.com/jingyuLin1999/echarts-designer"
        >
          <span class="iconfont header-github-image">&#xe628;</span>
        </a>
        <h1 class="report-disigner-title">报表设计器</h1>
      </div>
      <div class="tools-right">
        <div><i class="el-icon-document-add">生成JSON</i></div>
        <div class="tool" @click="preview">
          <i class="el-icon-view" v-if="design">预览</i>
          <i class="el-icon-setting" v-else>设计</i>
        </div>
        <div
          :class="[
            clickTab == 'chartTree' || clickTab == 'reportTree'
              ? ''
              : 'disabled-submit',
          ]"
        >
          <i class="el-icon-s-promotion" @click="openSubmitModal"
            >保存<span class="save-type">{{
              clickTab == "reportTree" ? "报表" : "图表"
            }}</span></i
          >
        </div>
      </div>
      <modal
        v-model="isOpenSubmit"
        width="45%"
        height="45%"
        showFooter
        resize
        title="新增&更新"
        :style="{ zIndex: 1000 }"
      >
        <RichForm
          class="submit-form"
          :schema="submitLayout.schema"
          :values="submitLayout.values"
          :form="submitLayout.form"
          :hooks="submitLayout.hooks"
        />
        <template #footer>
          <Button
            size="small"
            type="primary"
            @click="isOpenSubmit = !isOpenSubmit"
            >取消</Button
          >
          <Button size="small" type="success" @click="onSubmit">确定</Button>
        </template>
      </modal>
    </header>
    <div class="split-layout">
      <split-layout
        first-panel-size="220px"
        last-panel-size="300px"
        :firstPanelCanResize="false"
      >
        <template slot="first">
          <!-- 左侧报表组件 -->
          <tabs v-model="activeLeftTab" @tab-click="onTabClick">
            <tab-pane
              label="图表组件"
              name="component"
              class="tab-pane"
              :disabled="
                activeLeftTab == 'chartTree' && activeRightTab == 'reportTree'
              "
            >
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
            <tab-pane label="图表列表" name="chartTree">
              <tree
                :data="chartsTree"
                default-expand-all
                @node-click="onEidtChart"
              >
                <span
                  class="tree-node"
                  :data="onString(data)"
                  slot-scope="{ node, data }"
                >
                  <icon :class="[data.icon]"></icon>
                  <span class="node-label">
                    {{ data.title || data.label }}
                  </span>
                </span>
              </tree>
            </tab-pane>
          </tabs>
        </template>
        <template slot="center">
          <Echarts
            :echarts="echarts"
            :design="design"
            :hooks="hooks"
            :echartsId="id"
            :authorization="authorization"
            @designItem="onClickedChart"
          />
        </template>
        <!-- 报表属性 -->
        <template slot="last">
          <tabs v-model="activeRightTab" @tab-click="onTabClick">
            <tab-pane label="属性配置" name="attribute" class="tab-pane">
              <RichForm
                deepValues
                :schema="attrForm.schema"
                :values="attrForm.values"
                :form="attrForm.form"
                @action="attrActions"
              />
              <modal
                v-model="coddingModal"
                width="95%"
                height="95%"
                showFooter
                resize
                title="数据源编辑"
                @close="onCodeEdited"
              >
                <div id="monaco-codding" class="codding-echart"></div>
                <template #footer>
                  <Button size="small" type="primary" @click="onRunCode"
                    >运行</Button
                  >
                  <Button size="small" type="success" @click="onCodeEdited"
                    >确定</Button
                  >
                </template>
              </modal>
            </tab-pane>
            <tab-pane label="报表设计" name="reportTree">
              <tree
                :data="reportTree"
                default-expand-all
                @node-click="clickReportNode"
              >
                <span slot-scope="{ node, data }">
                  <icon :class="[data.icon]"></icon>
                  <span class="node-label">
                    {{ data.title || data.label }}
                  </span>
                </span></tree
              >
            </tab-pane>
          </tabs>
        </template>
      </split-layout>
    </div>
  </div>
</template>
<script>
import { pick } from "ramda";
import short from "short-uuid";
import { Modal } from "vxe-table";
import "vxe-table/lib/style.css";
import { RichForm } from "richform";
import MonacoMixin from "./monaco.mixin";
import Echarts from "@/components/Echarts";
import DnDMixin from "../Echarts/utils/dnd.mixin.js";
import { chartWidgets } from "./meta/widgets";
import SplitLayout from "@/components/SplitLayout";
import "element-ui/lib/theme-chalk/index.css";
import { Tabs, TabPane, Icon, Tree, Button } from "element-ui";
import { defaultContainer } from "../Echarts/utils/defaultData";
import {
  formTemplate,
  schemaTemplate,
  defaultChartSchema,
  defaultChartLayout,
  defaultReportSchema,
  defaultReportLayout,
} from "./defaultData";

export default {
  name: "echart",
  mixins: [DnDMixin, MonacoMixin],
  components: {
    Tabs,
    Icon,
    Tree,
    TabPane,
    Modal,
    Button,
    Echarts,
    RichForm,
    SplitLayout,
  },
  props: {
    showHeader: { type: Boolean, default: true },
    echarts: { type: Object, default: () => ({}) }, // 设计数据
    chartTree: { type: Array, default: () => [] }, // 图表列表
    reportTree: { type: Array, default: () => [] }, // 报表列表
    chartLayout: { type: Array, default: () => [] },
    chartSchema: { type: Object, default: () => ({}) },
    reportLayout: { type: Array, default: () => [] },
    reportSchema: { type: Object, default: () => ({}) },
    hooks: { type: Object, default: () => ({}) }, // 钩子
    authorization: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      id: short.generate(),
      design: true,
      dragOptions: {
        selector: ".tree-node",
      },
      dropOptions: {
        enabled: true,
        effect: "move",
        preventDefault: true,
        selector: [".dnd-drop-wrapper"],
      },
      clickTab: "component", // 当前点击的tab
      activeLeftTab: "component", // 左侧标签页
      activeRightTab: "attribute", // 右侧标签页
      canvas: {
        // 画布大小
        width: 0,
        height: 0,
      },
      chartWidgets, // 左侧子组件元数据
      attrForm: {
        // 属性表单
        schema: {},
        values: {},
        form: {},
      },
      coddingModal: false, // 打开代码弹窗
      isOpenSubmit: false, // 打开提交窗口
      clickedChart: {}, // 点击的图表数据
      submitForm: {
        // 提交的表单
        values: {},
        schema: {},
        form: {},
        hooks: {},
      },
    };
  },
  computed: {
    drawEchart() {
      return Object.assign(defaultContainer, this.echarts);
    },
    submitLayout() {
      let cloneForm = this.colenJson(formTemplate);
      let cloneSchema = this.colenJson(schemaTemplate);
      if (this.clickTab == "reportTree") {
        let treeWidget = defaultReportLayout.find(
          (item) => item.widget == "tree"
        );
        if (treeWidget) treeWidget.options = [...this.reportTree];
        cloneForm.layout =
          this.reportLayout.length > 0
            ? this.reportLayout
            : defaultReportLayout;
        cloneSchema.properties =
          Object.keys(this.reportSchema).length > 0
            ? this.reportSchema
            : defaultReportSchema;
      } else {
        let treeWidget = defaultChartLayout.find(
          (item) => item.widget == "tree"
        );
        if (treeWidget) treeWidget.options = [...this.chartTree];
        cloneForm.layout =
          this.chartLayout.length > 0 ? this.chartLayout : defaultChartLayout;
        cloneSchema.properties =
          Object.keys(this.chartSchema).length > 0
            ? this.chartSchema
            : defaultChartSchema;
      }
      this.$set(this.submitForm, "schema", cloneSchema);
      this.$set(this.submitForm, "form", cloneForm);
      return this.submitForm;
    },
    chartsTree() {
      setTimeout(() => {
        this.dndEnabled();
      }, 1000);
      return this.chartTree;
    },
  },
  created() {
    this.initHook();
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.getCanvasWh();
    },
    initHook() {
      this.hooks.preview = this.preview;
      this.hooks.openSubmit = this.openSubmitModal;
      this.hooks.onSubmit = this.onSubmit;
    },
    preview() {
      this.design = !this.design;
    },
    openSubmitModal() {
      this.isOpenSubmit = !this.isOpenSubmit;
    },
    onCodeEdited() {
      this.onRunCode();
      this.clickedChart.codding = this.monacoEditor.getValue();
      this.destroyEditor();
      this.coddingModal = false;
    },
    async getCanvasWh() {
      await this.$nextTick();
      const canvas = document.getElementById(this.id);
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
    colenJson(obj) {
      return JSON.parse(this.onString(obj));
    },
    onDrop(target, data, event) {
      if (!this.design) return;
      let chart = JSON.parse(data);
      // 当tab为图表时不允许拖拽
      if (
        (this.activeLeftTab == "chartTree" &&
          this.activeRightTab != "reportTree") ||
        (this.echarts.list.length > 0 && this.activeRightTab != "reportTree")
      )
        return;
      // 兼容
      if (chart.meta) {
        let meta = JSON.parse(chart.meta);
        meta.id = chart.id;
        chart = meta;
      } else chart.id = short.generate();
      let { offsetX, offsetY } = event;
      chart.px.x = offsetX - chart.px.width / 2;
      chart.px.y = offsetY - chart.px.height / 2;
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
    onClickedChart(item) {
      try {
        if (!this.design) return;
        this.clickedChart = item;
        const { form, schema, values } = require(`./meta/${item.widget}`);
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
    attrActions(evt) {
      if (evt.name != "codding") return;
      this.coddingModal = !this.coddingModal;
      this.initMonaco();
      let showTemplate = "";
      let { data } = this.clickedChart;
      let tips =
        "// http请求响应数据在responseData中，试试打印：console.log(responseData);并运行看看。\n// 当前图表模板，可根据responseData做数据组装逻辑，并将最终结果return，该编辑器只能有一个返回结果，多个return以最后一个为准\n";
      let strData = JSON.stringify(data);
      strData = strData.replace(/,/g, ",\n");
      let example = `let defaultData = ${strData};\nreturn defaultData;`;
      showTemplate = tips + example;
      this.setValue(showTemplate);
    },
    $_resizeHandler() {
      this.getCanvasWh();
    },
    clickReportNode(data, node) {
      this.pickFormValues(data);
      this.$emit("reportNode", data, node);
    },
    onTabClick(data) {
      if (data.name == "reportTree") {
        this.activeLeftTab = "chartTree";
        this.submitForm.values = {};
      }
      if (data.name == "component") this.echarts.list = [];
      this.clickTab = data.name;
    },
    onEidtChart(data) {
      if (!data.meta || this.clickTab == "reportTree") return;
      this.echarts.list = [];
      let meta = JSON.parse(data.meta);
      this.echarts.list.push(meta);
      this.pickFormValues(data);
    },
    pickFormValues(data) {
      let pickValue = pick(
        ["id", "icon", "description", "parentid", "title"],
        data
      );
      this.$set(this.submitForm, "values", pickValue);
    },
    async onSubmit() {
      if (!this.submitForm.hooks.validate()) return;
      this.isOpenSubmit = !this.isOpenSubmit;
      if (!this.submitLayout.values.parentid)
        this.submitLayout.values.parentid = null;
      this.$emit("actions", this.clickTab, { ...this.submitLayout.values });
      this.submitLayout.values = {};
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    this.destroyEditor();
    window.removeEventListener("resize", this.$_resizeHandler);
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "iconfont"; /* Project id 2900933 */
  src: url("./iconfont/iconfont.woff2?t=1635472525124") format("woff2"),
    url("./iconfont/iconfont.woff?t=1635472525124") format("woff"),
    url("./iconfont/iconfont.ttf?t=1635472525124") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .disabled-submit {
      position: relative;
    }
    .disabled-submit::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      cursor: not-allowed;
    }
    .report-disigner-title {
      margin: 0;
      padding: 0;
      font-size: 19px;
      height: 55px;
      line-height: 55px;
    }
    .submit-form {
      font-weight: 500;
      font-size: 13px;
      .title {
        font-size: 12px;
      }
    }
    .header-left {
      .header-github-image {
        color: #000;
        font-size: 28px;
        margin-right: 12px;
      }
    }
    .tools-right,
    .header-left {
      display: flex;
      font-size: 14px;
      align-items: center;
      > div {
        cursor: pointer;
        margin-left: 10px;
      }
    }
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
          font-size: 14px;
        }
      }
    }
    .last {
      .codding-echart {
        width: 100%;
        height: 98%;
        border: 1px solid #cccccc;
      }
      // 修复element ui tab的样式
      .el-tabs__item {
        width: 150px;
        text-align: center;
      }
      .el-tabs__header {
        height: 28px;
      }
      .tab-pane {
        width: 100%;
        height: "100%";
        .tree-node {
          font-size: 13px;
        }
      }
    }
  }
}
</style>