<!-- 
    bar chart
-->
<template>
  <div class="bar-wrapper">
    <Base :chartData="chartData" :hooks="hooks" :design="design" />
  </div>
</template>
<script>
import Base from "./base.vue";
import BaseMixin from "./base.mixin";
export default {
  name: "bar",
  mixins: [BaseMixin],
  components: { Base },
  data() {
    return {
      defaultSchema: {},
    };
  }
};
</script>
<style lang="scss">
</style>