<template>
  <component
    :is="asyncComponent"
    :color="border.color"
    :reverse="border.reverse"
    :border="border"
  >
    <slot> </slot>
  </component>
</template>

<script>
export default {
  props: {
    border: { type: Object, default: () => ({}) },
  },
  computed: {
    asyncComponent() {
      let type = this.border.type;
      return () => ({
        component: new Promise(async (resolve) => {
          resolve(await require(`./components/border${type}`));
        }),
        delay: 2000,
        timeout: 3000,
      });
    },
  },
};
</script>

<style>
</style>