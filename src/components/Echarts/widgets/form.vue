<template>
  <RichForm
    ref="filterForm"
    class="richform-widget"
    :form="friendForm"
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
    friendForm() {
      let colors = this.echarts.attribute.colors;
      if (colors) this.chartData.data.form.colors = colors;
      return this.chartData.data.form;
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        listenKey: [""],
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
      this.emit("event", "form", event);
    },
    clientSizeChanged() {
      if (this.design) return;
      this.$nextTick(() => {
        let dom = this.$refs.filterForm.$el;
        dom = document.querySelector(".ps");
        if (!dom) return;
        this.setOtherWidgetH(dom.offsetHeight);
      });
    },
  },
  data() {
    return {
      ref: "formWidget",
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