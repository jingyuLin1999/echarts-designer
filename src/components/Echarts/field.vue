<template>
  <div class="field-wrapper">
    <component :is="asyncComponent" :chartData="chartItem" />
  </div>
</template>

<script>
export default {
  name: "field",
  props: { chartItem: { type: Object, default: () => ({}) } },
  computed: {
    asyncComponent() {
      const delay = 20;
      const timeout = 2000;
      let widget = this.chartItem.widget;
      if (widget == undefined) widget = "bar";
      widget = widget.toLowerCase();
      return function () {
        return {
          component: import(`./widgets/${widget}`),
          delay,
          timeout,
        };
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.field-wrapper {
  background: #fff;
}
</style>