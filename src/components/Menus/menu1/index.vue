<template>
  <ul class="menu-wrapper" :style="injectStyles">
    <menuItem
      v-for="(menuItem, index) in menu"
      :key="index"
      :item="menuItem"
      :menuSize="menuSize"
      @activeMenu="onActiveMenu"
    />
  </ul>
</template>

<script>
import "./iconfont/iconfont.css"
import menuItem from "./menuItem"
export default {
  name: "button1",
  mixins: [],
  components: { menuItem },
  props: {
    menu: { type: Array, default: () => [] },
    menuSize: { type: Array, default: () => [120, 34] },
    navTitle: { type: String, default: "我的标题" },
    defaultActiveMenu: { type: String, default: "" },
    bgColor: { type: String, default: "" },
    textColor: { type: String, default: "#fff" }, // 文本颜色
    hoverTextColor: { type: String, default: "#1bcbf5" }, // 聚焦文本颜色
    activeTextColor: { type: String, default: "#0EB3B3" }, // 激活的文本颜色
    defaultProp: { type: Object, default: () => ({}) },
    navHeight: { type: String, default: "40px" },
    flatMenuSearchPool: { type: Object, default: () => ({}) },
  },
  computed: {
    injectStyles() {
      return {
        "--bgColor": this.bgColor,
        "--textColor": this.textColor,
        "--hoverTextColor": this.hoverTextColor,
        "--activeTextColor": this.activeTextColor,
        "--navHeight": this.navHeight,
        "--menuWidth": this.menuSize[0] + "px",
        "--menuHeight": this.menuSize[1] + "px",
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      let paths = this.defaultActiveMenu.split("/");
      let lastPath = paths[paths.length - 1];
      let menu = this.flatMenuSearchPool[lastPath] || this.flatMenuSearchPool[`/${lastPath}`];
      if (menu) this.onActiveMenu(menu);
    })
  },
  methods: {
    onActiveMenu(menu) {
      // 清空之前的
      for (let key in this.flatMenuSearchPool) {
        this.$set(this.flatMenuSearchPool[key], "activeMenu", false);
      }
      // 向上爬，设置activeMenu
      this.$set(menu, "activeMenu", true);
      let itPath = menu;
      while (itPath) {
        let parentMenu = this.flatMenuSearchPool[itPath.parentPath];
        if (parentMenu) {
          itPath = parentMenu
          this.$set(itPath, "activeMenu", true);
        } else itPath = null
      }
    },
  },
}
</script>

<style lang="scss" scope>
.menu-wrapper {
  display: flex;
  font-size: 16px;
  height: 100%;

  .active-menu {
    color: var(--activeTextColor);
  }

  ul:not(.menu-wrapper),
  li {
    margin: 0;
    padding: 0;
    color: var(--textColor);
    text-decoration: none;
    list-style: none;
  }

  li {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: var(--textColor);
  }

  .menu-item {
    height: 100%;
    margin-right: 5px;
  }

  .icon-arrow:not(.menu-item) {
    padding: 2px;
    line-height: 100%;
    margin-bottom: -5px;
  }

  // 左侧
  .menu-item-li {
    position: relative;
    height: var(--menuHeight);
    min-width: var(--menuWidth);
    box-sizing: border-box;
  }

  .menu-item-li ul li:not(.menu-item) {
    border-right: 1px solid #2fb3b5;
    border-left: 1px solid #2fb3b5;
  }

  .menu-item-li ul li:first-child {
    border-top: 1px solid #2fb3b5;
  }

  .menu-item-li ul li:last-child {
    border-bottom: 1px solid #2fb3b5;
  }

  .menu-item-li:hover > a {
    color: var(--hoverTextColor);
  }

  .menu-item-li:hover > div {
    color: var(--hoverTextColor);
  }

  .menu-link {
    height: 100%;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .menu-item-ul {
    position: absolute;
    background: var(--bgColor);
    box-sizing: border-box;
  }

  .menu-item-li ul {
    display: none;
    left: 0;
    top: 100%;
    z-index: 99999;
  }

  .menu-item-li ul ul {
    display: none;
    left: 101%;
    top: 0;
    padding-left: 2px;
  }

  .menu-item-li:hover > ul {
    display: inline-block;

    :not(.menu-item) {
      margin-top: -3px;
    }

    > li:first-of-type {
      margin-top: 2px;
    }
  }

  // 右侧
  .left-menu-item-li {
    position: relative;
    height: var(--menuHeight);
    min-width: var(--menuWidth);
    box-sizing: border-box;
  }

  .left-menu-item-li ul li:not(.menu-item) {
    border-right: 1px solid #2fb3b5;
    border-left: 1px solid #2fb3b5;
  }

  .left-menu-item-li ul li:first-child {
    border-top: 1px solid #2fb3b5;
  }

  .left-menu-item-li ul li:last-child {
    border-bottom: 1px solid #2fb3b5;
  }

  .left-menu-item-li:hover > a {
    color: var(--hoverTextColor);
  }

  .left-menu-item-li:hover > div {
    color: var(--hoverTextColor);
  }

  .left-menu-item-li ul {
    display: none;
    left: 0;
    top: 100%;
    z-index: 9999;
  }

  .left-menu-item-li ul ul {
    display: none;
    left: -105%;
    top: 0;
    padding-left: 2px;
  }

  .left-menu-item-li:hover > ul {
    display: inline-block;

    :not(.menu-item) {
      margin-top: -3px;
    }

    > li:first-of-type {
      margin-top: 2px;
    }
  }
}
</style>