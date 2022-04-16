<template>
  <component
    :is="asyncComponent"
    :menu="menu"
    :menuSize="menuSize"
    :navTitle="navTitle"
    :colors="colors"
    :bgColor="bgColor"
    :defaultActiveMenu="defaultActiveMenu"
  >
  </component>
</template>

<script>
export default {
  props: {
    widget: { type: String, default: "nav1" }, // 组件名
    navTitle: { type: String, default: "" }, // 标题
    colors: { type: Array, default: () => [] }, // 导航颜色
    menu: { type: Array, default: () => [] },
    menuSize: { type: Array, default: () => [120, 34] },
    bgColor: { type: String, default: "#061f57" },
    defaultActiveMenu: { type: String, default: "" },
  },
  computed: {
    asyncComponent() {
      return () => ({
        component: new Promise(async (resolve) => {
          resolve(await require(`./components/${this.widget}/index.vue`));
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