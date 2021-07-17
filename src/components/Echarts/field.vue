<template>
  <div class="field-wrapper">
    <component
      class="async-component"
      :hooks="hooks"
      :design="design"
      :is="asyncComponent"
      :chartData="chartData"
    />
  </div>
</template>

<script>
export default {
  name: "field",
  props: {
    design: { type: Boolean, default: true }, // 是否是设计模式
    hooks: { type: Object, default: () => ({}) },
    chartData: { type: Object, default: () => ({}) },
  },
  computed: {
    asyncComponent() {
      let widget = this.chartData.widget.toLowerCase();
      if (widget == undefined) widget = "bar";
      return () => ({
        component: import(`./widgets/${widget}`),
        delay: 200,
        timeout: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.field-wrapper {
  width: 100%;
  height: 100%;
  .async-component {
    width: 100%;
    height: 100%;
  }
}
</style>