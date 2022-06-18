<template>
  <component
    :is="asyncComponent"
    :menu="menu"
    :menuSize="menuSize"
    :navTitle="navTitle"
    :bgColor="bgColor"
    :menuBgColor="menuBgColor"
    :activeMenu="activeMenu"
    :defaultProp="friendlyProps"
    :defaultActiveMenu="defaultActiveMenu"
    :textColor="textColor"
    :activeTextColor="activeTextColor"
    :hoverTextColor="hoverTextColor"
    @activeMenu="onActiveMenu"
  >
  </component>
</template>

<script>
export default {
  props: {
    widget: { type: String, default: "nav1" }, // 组件名
    navTitle: { type: String, default: "" }, // 标题
    menu: { type: Array, default: () => [] }, // 菜单，数组
    menuSize: { type: Array, default: () => [120, 34] },
    bgColor: { type: String, default: "#061f57" }, // 背景颜色
    menuBgColor: { type: String, default: "" }, // 菜单颜色，移动端的菜单改变bgColor的颜色
    defaultActiveMenu: { type: String, default: "" }, // 默认激活的菜单
    mobileWidth: { type: Number, default: 700 }, // 移动端宽度
    textColor: { type: String, default: "#C0CBD9" }, // 文本颜色
    activeTextColor: { type: String, default: "#67F4F5" }, // 激活的文本颜色
    hoverTextColor: { type: String, default: "#1bcbf5" }, // 聚焦文本颜色
    defaultProp: { type: Object, default: () => ({}) },
  },
  computed: {
    asyncComponent() {
      let widget = this.isMobile ? "mobile" : this.widget;
      return () => ({
        component: new Promise(async (resolve) => {
          resolve(await require(`./components/${widget}/index.vue`));
        }),
        delay: 2000,
        timeout: 3000,
      });
    },
    friendlyProps() {
      const props = {
        title: "meta.title",
        path: "path",
        children: "children",
        hidden: "meta.hidden",
        icon: "meta.icon",
      };
      return Object.assign(props, this.defaultProp);
    },
  },
  beforeMount() {
    this.$_resizeHandler();
    window.addEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    this.activeMenu = this.defaultActiveMenu;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  methods: {
    onActiveMenu(path) {
      this.activeMenu = path;
    },
    $_resizeHandler() {
      const rect = document.body.getBoundingClientRect();
      this.isMobile = rect.width - 1 < this.mobileWidth;
    },
  },
  data() {
    return {
      isMobile: false,
      activeMenu: "",
    };
  },
};
</script>

<style>
</style>