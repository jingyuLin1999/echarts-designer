<!--
图表设计器
数据格式请见echarts组件
-->
<template>
  <div class="echar-design-wrapper">
    <modal
      v-model="viewJson"
      width="45%"
      height="40%"
      resize
      title="查看JSON"
      :showFooter="false"
      :style="{position: 'absolute',zIndex: 9999}"
    >
      {{ echarts.list }}
    </modal>
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
        <div>
          <i class="el-icon-delete" @click="onClearCanvas">清空画布</i>
        </div>
        <div>
          <i class="el-icon-document-add" @click="viewJson = true">生成JSON</i>
        </div>
        <div class="tool" @click="preview">
          <i class="el-icon-view" v-if="design">预览</i>
          <i class="el-icon-setting" v-else>设计</i>
        </div>
        <div>
          <i class="el-icon-pie-chart" @click="onOpenSubmitModal('chart')">
            {{ Object.keys(clickedChart).length == 0 ? "新建" : "保存" }}图表
          </i>
        </div>
        <div>
          <i class="el-icon-s-promotion" @click="onOpenSubmitModal('report')">
            {{ echarts.list.length == 0 ? "新建" : "保存" }}报表
          </i>
        </div>
      </div>
      <modal
        v-model="openSubmitModal"
        width="45%"
        height="40%"
        resize
        showFooter
        :title="modalType == 'chart' ? '保存图表' : '保存报表'"
        :style="{ zIndex: 1000 }"
      >
        <RichForm
          class="submit-form"
          :form="submitForm"
          :hooks="submitHooks"
          :schema="submitSchema"
          :values="submitValues"
        />
        <template #footer>
          <Button size="small" type="success" @click="sureSubmit">确定</Button>
          <Button size="small" @click="openSubmitModal = !openSubmitModal"
            >取消</Button
          >
        </template>
      </modal>
    </header>
    <div class="split-layout">
      <split-layout
        first-panel-size="220px"
        last-panel-size="300px"
        :lastPanelCanResize="false"
        :firstPanelCanResize="false"
      >
        <template slot="first">
          <!-- 左侧报表组件 -->
          <tabs v-model="activeLeftTab">
            <tab-pane label="图表组件" name="component" class="tab-pane">
              <tree :data="chartWidgets" default-expand-all>
                <span
                  class="tree-node"
                  :data="onString(data)"
                  slot-scope="{ node, data }"
                  :style="{ fontSize: '13px' }"
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
            <tab-pane label="图表设计" name="chartTree">
              <tree :data="chartsTree" default-expand-all>
                <div
                  class="tree-node designer-tree-node"
                  slot-scope="{ node, data }"
                  :data="onString(data)"
                >
                  <div class="node-title" @click="clickChartNode(data)">
                    <icon :class="[data.icon]"></icon>
                    <span class="node-label">
                      {{ data.title || data.label }}
                    </span>
                  </div>
                  <div class="node-tools">
                    <i
                      class="tool el-icon-delete"
                      @click="onDelete(data, 'chart')"
                    ></i>
                  </div>
                </div>
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
          <tabs v-model="activeRightTab">
            <tab-pane label="属性配置" name="attribute" class="tab-pane">
              <RichForm
                deepValues
                :form="attrForm"
                :schema="attrSchema"
                :values="attrValues"
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
                <textarea id="code-textarea" v-model="code"></textarea>
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
            <tab-pane label="报表排版" name="reportTree">
              <tree :data="reportTree" default-expand-all>
                <div slot-scope="{ node, data }" class="designer-tree-node">
                  <div class="node-title" @click="onClickReportNode(data)">
                    <icon :class="[data.icon]"></icon>
                    <span class="node-label">
                      {{ data.title || data.label }}
                    </span>
                  </div>
                  <div class="node-tools">
                    <span @click="copyReportId(data.id)"> 复制id </span>
                    <i
                      class="tool el-icon-delete"
                      @click="onDelete(data, 'report')"
                    ></i>
                  </div>
                </div>
              </tree>
            </tab-pane>
          </tabs>
        </template>
      </split-layout>
    </div>
  </div>
</template>
<script>
import short from "short-uuid";
// import ClipboardJS from "clipboard";
import { Modal } from "vxe-table";
import "vxe-table/lib/style.css";
import { RichForm } from "richform";
import MonacoMixin from "./codeMirror.mixin";
import Echarts from "@/components/Echarts";
import { chartWidgets } from "./meta/widgets";
import DnDMixin from "../Echarts/utils/dnd.mixin.js";
import SplitLayout from "@/components/SplitLayout";

import { defaultContainer } from "../Echarts/utils/defaultData";
import {
  chartSchema,
  chartForm,
  reportSchema,
  reportForm,
} from "./defaultData";
import "element-ui/lib/theme-chalk/index.css";
import {
  Tabs,
  TabPane,
  Icon,
  Tree,
  Button,
  MessageBox,
  Message,
} from "element-ui";

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
    Message,
    MessageBox,
    Echarts,
    RichForm,
    SplitLayout,
  },
  props: {
    showHeader: { type: Boolean, default: true },
    echarts: { type: Object, default: () => ({}) }, // 设计数据
    chartTree: { type: Array, default: () => [] }, // 图表列表
    reportTree: { type: Array, default: () => [] }, // 报表列表
    hooks: { type: Object, default: () => ({}) }, // 钩子
    authorization: { type: Object, default: () => ({}) }, // 权限
  },
  data() {
    return {
      id: short.generate(),
      design: true,
      coddingModal: false, // 打开代码弹窗
      viewJson: false, // 查看json
      dragOptions: {
        selector: ".tree-node",
      },
      dropOptions: {
        enabled: true,
        effect: "move",
        preventDefault: true,
        selector: [".dnd-drop-wrapper"],
      },
      // 标签
      activeLeftTab: "component", // 左侧标签页
      activeRightTab: "attribute", // 右侧标签页
      canvas: {
        // 画布大小
        width: 0,
        height: 0,
      },
      chartWidgets, // 左侧子组件元数据
      // 属性表单
      attrSchema: {},
      attrValues: {},
      attrForm: {},
      // 弹窗表单
      submitValues: {},
      submitSchema: {},
      submitForm: {},
      submitHooks: {},
      // 弹窗
      modalType: "", // 弹窗类型
      openSubmitModal: false, // 打开提交窗口
      clickedChart: {}, // 点击的图表数据
      clickReportNode: {}, // 点击报表节点
      // 代码编辑器提示语
      codeTips:
        "// http请求响应数据在responseData中，试试打印：console.log(responseData);并运行看看。\n// 当前图表模板，可根据responseData做数据组装逻辑，并将最终结果return，该编辑器只能有一个返回结果，多个return以最后一个为准\n",
    };
  },
  computed: {
    drawEchart() {
      return Object.assign(defaultContainer, this.echarts);
    },
    chartsTree() {
      setTimeout(() => {
        this.dndEnabled();
      }, 800);
      return this.chartTree;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.initHook();
      this.getCanvasWh();
    },
    initHook() {
      this.hooks.preview = this.preview;
      this.hooks.sureSubmit = this.sureSubmit;
    },
    preview() {
      this.design = !this.design;
    },
    onString(item) {
      return JSON.stringify(item);
    },
    cloneJson(obj) {
      return JSON.parse(this.onString(obj));
    },
    onDragstart(source, event) {
      return source.getAttribute("data");
    },
    onDrop(target, data, event) {
      let chart = JSON.parse(data);
      if (!this.design || chart.parentid == "0") return;
      let hasExit = this.echarts.list.find((item) => item.id == chart.id);
      if (hasExit) {
        Message({ type: "error", message: "该图表已存在画布中，不允许重复" });
        return;
      }
      if (chart.id.indexOf("echarts-designer") > -1)
        chart.id = "echarts-designer" + short.generate();
      let { offsetX, offsetY } = event;
      chart.px.x = offsetX - chart.px.width / 2;
      chart.px.y = offsetY - chart.px.height / 2;
      this.calcuPct(chart);
      this.drawEchart.list.push(chart);
    },
    calcuPct(chart) {
      let { width: cW, height: cH } = this.canvas;
      let px = chart["px"];
      let pct = chart["pct"];
      px.z = 2;
      pct.x = px.x / cW;
      pct.y = px.y / cH;
      pct.width = px.width / cW;
      pct.height = px.height / cH;
    },
    // 初始化编辑器
    attrActions(evt) {
      if (evt.name != "codding") return;
      this.coddingModal = !this.coddingModal;
      let showTemplate = "";
      let { data, codding } = this.clickedChart;
      let strData = JSON.stringify(data);
      let example = `let defaultData = ${strData};\nreturn defaultData;`;
      showTemplate = this.codeTips + (codding ? codding : example);
      this.code = showTemplate;
      this.initCodemirror();
    },
    // 关闭编辑器
    onCodeEdited() {
      let codding = this.editorInstance.getValue();
      codding = codding.replace(this.codeTips, "");
      this.clickedChart.codding = codding;
      this.onRunCode();
      this.coddingModal = false;
    },
    // 监听DOM是否变化
    $_resizeHandler() {
      this.getCanvasWh();
    },
    async getCanvasWh() {
      await this.$nextTick();
      const canvas = document.getElementById(this.id);
      if (!canvas) return;
      this.canvas.width = canvas.offsetWidth;
      this.canvas.height = canvas.offsetHeight;
    },
    // 加载元数据
    onClickedChart(item) {
      try {
        if (!this.design) return;
        this.clickedChart = item;
        const { form, schema, values } = require(`./meta/${item.widget}`);
        this.attrValues = item;
        this.attrForm = this.cloneJson(form);
        this.attrSchema = this.cloneJson(schema);
      } catch (e) {
        this.attrSchema = {};
        this.attrForm = {};
        this.attrValues = {};
        console.warn("获取元数据失败：" + e);
      }
      this.$emit("clickedChart", item);
      if (this.activeRightTab != "attribute") this.activeRightTab = "attribute";
    },
    // 清空画布
    onClearCanvas() {
      this.echarts.list = [];
      this.clickedChart = {};
      this.clickReportNode = {};
    },
    onClickReportNode(data) {
      this.clickReportNode = data;
      this.$emit("reportNode", data);
    },
    clickChartNode(data) {
      this.$emit("chartNode", data);
    },
    onDelete(data, type) {
      this.$emit("delete", { data, type });
    },
    onOpenSubmitModal(type) {
      this.modalType = type;
      this.submitSchema = type == "chart" ? chartSchema : reportSchema;
      if (type == "chart") {
        let chartParent = chartForm.layout.find(
          (item) => item.name == "parentid"
        );
        if (chartParent) chartParent.options = this.chartTree;
        this.submitForm = chartForm;
        this.submitValues = this.clickedChart;
      } else if (type == "report") {
        let reportParent = reportForm.layout.find(
          (item) => item.name == "parentid"
        );
        if (reportParent) reportParent.options = this.reportTree;
        this.submitForm = reportForm;
        this.submitValues = this.clickReportNode;
      }
      this.openSubmitModal = !this.openSubmitModal;
    },
    sureSubmit() {
      if (!this.submitHooks.validate()) return; // 校验
      if (!this.submitValues.parentid) this.submitValues.parentid = "0";
      this.$emit("submitValues", {
        type: this.modalType,
        data: this.cloneJson(this.submitValues),
      });
      this.openSubmitModal = false;
      this.submitValues = {};
    },
    copyReportId(id) {
      // const textCopied = ClipboardJS.copy("1qwe23");
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

<style lang="scss">
@font-face {
  font-family: "iconfont";
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
    height: 100%;
    position: relative;
    .designer-tree-node {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .node-title {
        width: 100%;
        font-size: 13px;
      }
      .node-tools {
        display: none;
        margin-right: 10px;
        > * {
          margin-left: 10px;
        }
      }
    }
    .designer-tree-node:hover > .node-tools {
      display: block;
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
      }
    }
    .center {
      position: relative;
    }
    .last {
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
      }
      .cm-s-default {
        width: 100%;
        height: 99%;
      }
    }
  }
}
</style>