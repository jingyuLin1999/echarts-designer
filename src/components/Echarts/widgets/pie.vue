<!-- 
    饼图
-->
<template>
  <div class="pie-wrapper">
    <Base
      :chartData="chartData"
      :hooks="hooks"
      :design="design"
      :echarts="echarts"
    />
  </div>
</template>
<script>
import BaseMixin from "../utils/base.mixin";
export default {
  name: "basicline",
  mixins: [BaseMixin],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    defaultFieldAttr() {
      return {
        title: {
          // 标题
          text: "", // 主标题
          subtext: "", // 副标题
        },
      };
    },
  },
};
</script>
<style lang="scss">
.pie-wrapper {
}
</style>