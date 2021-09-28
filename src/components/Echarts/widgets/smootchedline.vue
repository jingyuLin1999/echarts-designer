<!-- 
    bar chart
-->
<template>
  <div class="line-wrapper">
    <Base :chartData="chartData" />
  </div>
</template>
<script>
import BaseMixin from "./base.mixin";
export default {
  name: "basicline",
  mixins: [BaseMixin],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
.line-wrapper {
}
</style>