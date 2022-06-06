<template>
  <PerfectBorder
    class="perfect-border"
    :border="chartData.border"
    :style="{
      background: echarts.theme,
      padding: chartData.attribute.padding + 'px' || 0,
    }"
  >
    <div
      class="field-title"
      v-if="chartData.showTitle"
      :style="{ color: echarts.theme == 'dark' ? fontColor : '#333' }"
    >
      {{ chartData.title }}
    </div>
    <component
      class="async-component"
      :hooks="hooks"
      :design="design"
      :is="asyncComponent"
      :chartData="chartData"
      :echarts="echarts"
      :chartsHandle="chartsHandle"
      :isMobile="isMobile"
      :context="context"
      :style="{ height: chartData.showTitle ? `calc(100% - 22px)` : '100%' }"
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
    context: { type: Object, default: () => ({}) },
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
    fontColor() {
      let { fontColor } = this.echarts.attribute.colors;
      return fontColor || "#fff";
    },
  },
};
</script>

<style lang="scss" scoped>
.perfect-border {
  box-sizing: border-box;
  .field-title {
    height: 22px;
    line-height: 22px;
    font-size: 14px;
  }
  .async-component {
    width: 100%;
    height: 100%;
  }
}
</style>