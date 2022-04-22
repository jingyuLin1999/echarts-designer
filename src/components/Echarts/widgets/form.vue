<template>
  <div class="richform-widget">
    <div :ref="ref" class="form">
      <RichForm
        :form="friendForm"
        :schema="chartData.data.schema"
        :values="echarts.filter"
        :authorization="authorization"
      />
    </div>
  </div>
</template>
<script>
import { RichForm } from "richform";
import BaseMixin from "./base.mixin";
import autoResize from "@/mixins/autoResize";
export default {
  name: "richform",
  mixins: [BaseMixin, autoResize],
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
    onResize() {
      let { height, disHeight } = this;
      if (disHeight == 0 || height == 0) return;
      this.moveWidgetY(height);
    },
  },
  data() {
    return {
      ref: "formWidget",
      debounceTime: 50,
    };
  },
};
</script>
<style lang="scss">
.richform-widget {
  .form {
    padding-bottom: 4px;
    box-sizing: border-box;
  }
}
</style>