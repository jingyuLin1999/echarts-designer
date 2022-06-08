<template>
  <RichForm
    ref="filterForm"
    class="richform-widget"
    :form="friendlyForm"
    :schema="chartData.data.schema"
    :values="echarts.filter"
    :authorization="authorization"
    @action="formAction"
  />
</template>
<script>
import { RichForm } from "richform";
import BaseMixin from "./base.mixin";
export default {
  name: "filterForm",
  mixins: [BaseMixin],
  components: { RichForm },
  computed: {
    authorization() {
      return {
        key: sessionStorage.getItem("report-key"),
        value: sessionStorage.getItem("report-value"),
      };
    },
    friendlyForm() {
      let colors = this.echarts.attribute.colors;
      if (colors) this.chartData.data.form.colors = colors;
      return this.chartData.data.form;
    },
  },
  watch: {
    "echarts.filter": {
      handler() {
        if (this.hasEmit) return;
        this.hasEmit = true;
        // 有全局需要派发
        if (this.isGlobalHttp) this.emit("event", "searchAction", {});
      },
      deep: true,
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        listenKey: [],
        attribute: { name: "" },
        dataSource: [],
        codding: "",
        data: {
          form: {
            border: false,
            grid: false,
            labelSuffix: ":",
            labelWidth: "80px",
            validator: "input",
            labelAlign: "right",
            labelInline: true,
            colors: {},
            actions: [],
            layout: [],
          },
          schema: {},
        },
      };
    },
    formAction(event) {
      if (event.widget != "button") return;
      this.emit("event", "searchAction", event);
    },
    clientSizeChanged() {
      if (this.design) return;
      this.$nextTick(() => {
        let dom = this.$refs.filterForm;
        if (!dom) return;
        dom = this.$refs.filterForm.$el;
        dom = document.querySelector(".ps");
        this.setOtherWidgetH(dom.offsetHeight);
      });
    },
  },
  data() {
    return {
      hasEmit: false,
    };
  },
};
</script>
<style lang="scss">
.richform-widget {
  padding-bottom: 4px;
  box-sizing: border-box;
}
</style>