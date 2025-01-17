<template>
  <div class="cool-navigation-mobile" :style="injectStyles">
    <div class="navbar">
      <span class="iconfont icon-caidan-dakai open-menu-icon" @click="onOpenMenu(true)"></span>
      <Breadcrumb separator="/">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem v-for="(item, index) in breadcrumb" :key="index">{{
          menuText(item)
        }}</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div v-if="openSidebar" class="drawer-bg" @click="onOpenMenu(false)" />

    <div :class="['sidebar-container', openSidebar ? '' : 'hideSidebar']"
      :style="{ background: menuBgColor || bgColor }">
      <p class="logo">{{ navTitle }}</p>
      <Scrollbar wrap-class="scrollbar-wrapper">
        <Menu :default-active="activeMenu || defaultActiveMenu" :collapse="false"
          :background-color="menuBgColor || bgColor" :text-color="textColor" :unique-opened="false"
          :active-text-color="activeTextColor" :collapse-transition="false" mode="vertical" @select="onSelectMenu">
          <sidebar-item v-for="route in menu" :internation="internation" :key="route[defaultProp.path]" :item="route"
            :base-path="route[defaultProp.path]" :defaultProp="defaultProp" :menuPool="menuPool" />
        </Menu>
      </Scrollbar>
    </div>
  </div>
</template>

<script>
import SidebarItem from "./sidebarItem";
import "element-ui/lib/theme-chalk/index.css";
import { Breadcrumb, BreadcrumbItem, Scrollbar, Menu } from "element-ui";
export default {
  components: {
    Menu,
    Scrollbar,
    Breadcrumb,
    BreadcrumbItem,
    SidebarItem,
  },
  props: {
    menu: { type: Array, default: () => [] }, // 菜单
    activeMenu: { type: String, default: "" }, // 已触发的菜单
    navTitle: { type: String, default: "工厂看板" }, // 标题
    menuBgColor: { type: String, default: "" }, // 菜单颜色,不设置，则默认是bgColor
    bgColor: { type: String, default: "" }, // 背景颜色
    textColor: { type: String, default: "#C0CBD9" }, // 文本颜色
    activeTextColor: { type: String, default: "#67F4F5" }, // 激活的文本颜色
    defaultProp: { type: Object, default: () => ({}) }, // 字段映射关系
    defaultActiveMenu: { type: String, default: "" },
    navHeight: { type: String, default: "50px" },
    internation: { type: Boolean, default: false, } // 是否国际化
  },
  computed: {
    injectStyles() {
      return {
        "--bgColor": this.bgColor,
        "--textColor": this.textColor,
        "--hoverTextColor": this.hoverTextColor,
        "--activeTextColor": this.activeTextColor,
        "--navHeight": this.navHeight,
      };
    },
  },
  mounted() {
    let path = this.activeMenu || this.defaultActiveMenu;
    if (path) this.pickBreadcrumb(path);
  },
  methods: {
    onOpenMenu(status) {
      this.openSidebar = status;
    },
    deepPick(keys = [], obj) {
      let pickObj = null;
      if (keys.length == 0 || !keys[0]) return obj;
      keys.map((key, index) => {
        pickObj = obj[key];
        if (pickObj && keys.length != index + 1) obj = pickObj;
      });
      return pickObj;
    },
    pickBreadcrumb(path) {
      this.breadcrumb = [];
      let paths = path.split("/");
      let pathKey = this.defaultProp.path;
      paths.map((key) => {
        if (key) {
          let breadcrumb = this.menuPool.find(
            (item) => item[pathKey] == key || item[pathKey] == "/" + key
          );
          if (breadcrumb) this.breadcrumb.push(breadcrumb);
        }
      });
    },
    onSelectMenu(path) {
      this.pickBreadcrumb(path);
      this.$emit("activeMenu", path);
    },
    deepPick(keys = [], obj) {
      let pickObj = null;
      if (keys.length == 0 || !keys[0]) return obj;
      keys.map((key, index) => {
        pickObj = obj[key];
        if (pickObj && keys.length != index + 1) obj = pickObj;
      });
      return pickObj;
    },
    menuText(menu) {
      return this.deepPick(this.defaultProp.title.split("."), menu);
    },
  },
  data() {
    return {
      menuPool: [], // menu扁平数据搜索池
      breadcrumb: [], // 面包屑
      openSidebar: false, // 是否打开
    };
  },
};
</script>

<style lang="scss">
@import "./iconfont/iconfont.css";
$sideBarWidth: 230px;

.cool-navigation-mobile {
  position: relative;

  .el-breadcrumb__inner {
    color: var(--textColor);
  }

  >.navbar {
    height: var(--navHeight);
    padding: 0 10px;
    display: flex;
    align-items: center;
    color: var(--textColor);
    box-shadow: 0 0 3px rgb(218, 216, 216);
    background: var(--bgColor);
    overflow: hidden;

    >.open-menu-icon {
      margin-right: 16px;
      font-size: 26px;
      font-weight: 550;
      cursor: pointer;
    }
  }

  >.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    left: 0;
    height: 100vh;
    position: absolute;
    z-index: 999;
  }

  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    .logo {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 23px;
      font-weight: 600;
      box-sizing: border-box;
      padding: 0 15px;
    }

    &.hideSidebar {
      pointer-events: none;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }

    // reset element-ui css
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }

    .el-menu {
      border-right: 0;
    }

    .el-menu-item {
      box-sizing: border-box;
    }

    .el-scrollbar {
      width: 100%;
      height: 100% !important;
    }
  }
}
</style>