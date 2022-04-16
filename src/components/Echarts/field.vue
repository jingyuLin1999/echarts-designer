<template>
  <PerfectBorder
    class="perfect-border"
    :border="chartData.border"
    :style="{
      background: echarts.theme,
      padding: chartData.attribute.padding + 'px' || 0,
    }"
  >
    <component
      class="async-component"
      :hooks="hooks"
      :design="design"
      :is="asyncComponent"
      :chartData="chartData"
      :echarts="echarts"
      :chartsHandle="chartsHandle"
      :isMobile="isMobile"
    />
  </PerfectBorder>
</template>

<script>
import PerfectBorder from "../PerfectBorder";
export default {
  name: "field",
  components: { PerfectBorder },
  props: {
    design: { type: Boolean, default: false },
    hooks: { type: Object, default: () => ({}) },
    chartData: { type: Object, default: () => ({}) },
    echarts: { type: Object, default: () => ({}) },
    chartsHandle: { type: Object, default: () => ({}) },
    isMobile: { type: Boolean, default: false },
  },
  computed: {
    asyncComponent() {
      let widget = this.chartData.widget.toLowerCase();
      if (widget == undefined) widget = "bar";
      return () => ({
        component: new Promise(async (resolve) => {
          resolve(await require(`./widgets/${widget}`));
        }),
        delay: 2000,
        timeout: 3000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.perfect-border {
  box-sizing: border-box;
}
.async-component {
  width: 100%;
  height: 100%;
}
</style>