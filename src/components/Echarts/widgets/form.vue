<template>
  <div class="richform-widget">
    <div :ref="ref" class="form">
      <RichForm
        :form="chartData.data.form"
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
  },
  methods: {
    defaultFieldAttr() {
      return {};
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