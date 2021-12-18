<template>
  <perfectBorder :item="chartData">
    <component
      class="async-component"
      :hooks="hooks"
      :design="design"
      :is="asyncComponent"
      :chartData="chartData"
      :echarts="echarts"
    />
  </perfectBorder>
</template>

<script>
import perfectBorder from "./pefectBorder.vue";
export default {
  name: "field",
  components: { perfectBorder },
  props: {
    design: { type: Boolean, default: false },
    hooks: { type: Object, default: () => ({}) },
    chartData: { type: Object, default: () => ({}) },
    echarts: { type: Object, default: () => ({}) },
  },
  computed: {
    asyncComponent() {
      let widget = this.chartData.widget.toLowerCase();
      if (widget == undefined) widget = "bar";
      return () => ({
        // to handle bug of after build.
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
.async-component {
  width: 100%;
  height: 100%;
}
</style>