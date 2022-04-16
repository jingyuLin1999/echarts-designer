<template>
  <div class="richform-widget">
    <div :ref="ref">
      <RichForm
        :form="chartData.data.form"
        :schema="chartData.data.schema"
        :values="echarts.filter"
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
</style>