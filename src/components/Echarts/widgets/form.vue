<!-- 表单 todo richform 主题颜色 -->
<template>
  <div class="form-wrapper" :style="{ background: echarts.theme }">
    <RichForm
      :form="formAtt.form"
      :schema="formAtt.schema"
      :values="echarts.filter"
    />
  </div>
</template>
<script>
import { RichForm } from "richform";
import BaseMixin from "../utils/base.mixin";
export default {
  name: "richform",
  mixins: [BaseMixin],
  components: { RichForm },
  computed: {
    formAtt() {
      let rich = { form: {}, schema: {} };
      rich.form = { ...this.chartData.attribute };
      rich.form.layout = this.chartData.data.layout;
      rich.schema = this.defaultSchema.properties = this.chartData.data.schema;
      return rich;
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        layout: [],
        schema: {},
      };
    },
  },
  data() {
    return {
      defaultSchema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "",
        description: "",
        type: "object",
        properties: {},
      },
    };
  },
};
</script>
<style lang="scss">
</style>