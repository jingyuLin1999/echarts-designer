<!-- 
    bar chart
-->
<template>
  <div class="bar-wrapper">
    <Base :chartData="chartData" />
  </div>
</template>
<script>
import Base from "./base.vue";
import BaseMixin from "./base.mixin";
export default {
  name: "bar",
  mixins: [BaseMixin],
  data() {
    return {
      defaultSchema: {}
    };
  },
  mounted() {
  },
  methods: {}
};
</script>
<style lang="scss">
.bar-wrapper {
}
</style>