<template>
  <div
    class="cool-navigation-2"
    :ref="ref"
    :style="injectStyles"
    :height="navHeight"
  >
    <!-- 标题 -->
    <div class="nav-top">
      <div class="title-content">
        <slot name="logo"></slot>
        <span class="title">{{ navTitle }}</span>
      </div>
      <div class="menus-content" :style="{ height: `${navHeight - 9}px` }">
        <div
          class="menu"
          v-for="(menuItem, index) in showMenu"
          :key="index"
          @click="onActiveMenu(menuItem)"
        >
          <router-link
            :class="[activeMenu == menuItem.path ? 'active-menu' : '']"
            :to="menuItem.path"
          >
            {{ menuItem.title }}</router-link
          >
        </div>
        <div v-if="moreMenu.length > 0" class="more-menu">
          <dl>
            <dt>更多菜单</dt>
            <dd
              class="menu"
              v-for="moreItem in moreMenu"
              :key="moreItem.path"
              @click="onActiveMenu(moreItem)"
            >
              <router-link
                :to="moreItem.path"
                :class="[activeMenu == moreMenu.path ? 'active-menu' : '']"
              >
                {{ moreItem.title }}
              </router-link>
            </dd>
          </dl>
        </div>
        <!-- 日期 -->
        <div class="date-container" :style="{ color: textColor }">
          <span class="iconfont clock">&#xe680;</span>
          <span :style="{ color: hoverTextColor }">{{
            new Date().getFullYear()
          }}</span>
          年
          <span :style="{ color: hoverTextColor }"
            >{{ new Date().getMonth() + 1 }}
          </span>
          月
          <span :style="{ color: hoverTextColor }">{{
            new Date().getDate()
          }}</span
          >日
        </div>
      </div>
    </div>
    <svg class="bottom-line" :width="width" height="12px">
      <polygon
        style="stroke-width: 1"
        fill="#0c7ef8"
        :points="`0,8
        ${width * 0.2139},8
        ${width * 0.225},2
        ${width},2
        ${width},1
        ${width * 0.225 - 1},1
        ${width * 0.2139 - 1},7
        0,7
        0,8
        `"
      ></polygon>
    </svg>

    <svg class="bg-color" :width="width" :height="navHeight">
      <!-- 背景颜色 -->
      <polygon
        style="stroke-width: 1"
        :fill="bgColor"
        :points="`0,0
        0,${navHeightNum - 4}
        ${width * 0.2139},${navHeightNum - 3}
        ${width * 0.225},${navHeightNum - 9}
        ${width},${navHeightNum - 9}
        ${width},0
        0,0
        `"
      ></polygon>
      <!-- 标题下方线发亮 -->
      <polygon
        style="stroke-width: 2"
        fill="#34D4FC"
        :points="`
        ${width * 0.03},${navHeightNum - 2} 
        ${width * 0.06},${navHeightNum - 3}  
        ${width * 0.09},${navHeightNum - 4} 
        ${width * 0.12},${navHeightNum - 5} 
        ${width * 0.14},${navHeightNum - 4} 
        ${width * 0.16},${navHeightNum - 3} 
        ${width * 0.18},${navHeightNum - 2} 
        ${width * 0.03},${navHeightNum - 2} 
        `"
      />
    </svg>
  </div>
</template>

<script>
import autoResize from "@/mixins/autoResize";
export default {
  name: "coolNavigation2",
  mixins: [autoResize],
  props: {
    menu: { type: Array, default: () => [] },
    menuSize: { type: Array, default: () => [120, 34] },
    activeMenu: { type: String, default: "" }, // 已触发的菜单
    navTitle: { type: String, default: "声发射系统" },
    bgColor: { type: String, default: "" },
    textColor: { type: String, default: "#C0CBD9" }, // 文本颜色
    hoverTextColor: { type: String, default: "#1bcbf5" }, // 聚焦文本颜色
    activeTextColor: { type: String, default: "#56f3f5" }, // 激活的文本颜色
    defaultProp: { type: Object, default: () => ({}) },
    navHeight: { type: String, default: "50px" },
  },
  computed: {
    friendlyMenus() {
      let menus = this.createMenus(this.menu);
      return menus;
    },
    showMenu() {
      this.moreMenu = [];
      let sliceNum =
        this.friendlyMenus.length > this.takeUpMenuNum
          ? this.takeUpMenuNum
          : this.friendlyMenus.length;
      this.moreMenu = this.friendlyMenus.slice(
        sliceNum,
        this.friendlyMenus.length
      );
      let showMenu = this.friendlyMenus.slice(0, sliceNum);
      return showMenu;
    },
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
    takeUpMenuNum() {
      return Math.floor((this.width * 0.77 - 150) / (this.menuSize[0] + 10));
    },
    navHeightNum() {
      return parseInt(this.navHeight.replace("px"));
    },
  },
  methods: {
    deepPick(keys = [], obj) {
      let pickObj = null;
      if (keys.length == 0 || !keys[0]) return obj;
      keys.map((key, index) => {
        pickObj = obj[key];
        if (pickObj && keys.length != index + 1) obj = pickObj;
      });
      return pickObj;
    },
    onActiveMenu(menuInfo) {
      this.$emit("activeMenu", menuInfo.path);
    },
    createMenus(routers, path = "", menu = []) {
      routers.map((item) => {
        path +=
          (path[path.length - 1] != "/" && item[this.defaultProp.path][0] != "/"
            ? "/"
            : "") + item[this.defaultProp.path];
        if (
          Array.isArray(item[this.defaultProp.children]) &&
          item[this.defaultProp.children].length > 0
        ) {
          this.createMenus(item[this.defaultProp.children], path, menu);
          // 往上爬需要减掉一个节点的path
          path = path.substr(0, path.lastIndexOf("/"));
        } else {
          if (this.deepPick(this.defaultProp.hidden.split("."), item) != true) {
            let title = this.deepPick(this.defaultProp.title.split("."), item);
            menu.push({ path, title: title });
          }
          // 同级拼接完后需截断一个
          path = path.substr(0, path.lastIndexOf("/"));
        }
      });
      return menu;
    },
  },
  data() {
    return {
      ref: "cool-navigation-2",
      moreMenu: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";
  src: url("../iconfont/iconfont.ttf?t=1675758911853") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.cool-navigation-2 {
  width: 100%;
  height: var(--navHeight);
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .active-menu {
    color: var(--activeTextColor) !important;
    position: relative;
    &::after {
      content: "";
      width: var(--menuWidth);
      height: calc(var(--navHeight) - 9px);
      background: #4292c0;
      opacity: 0.5;
      position: absolute;
      left: 0;
      top: 0;
      transform: skew(-8deg);
    }
  }
  > .nav-top {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 2;
    position: relative;
    .title-content {
      width: 22%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .title {
        margin-left: 8px;
        white-space: nowrap;
        font-size: 23px;
        font-weight: 550;
        font-family: "微软雅黑";
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to bottom, #fefaf4 20%, #32dafe);
      }
    }
    > .menus-content {
      display: flex;
      width: 78%;
      align-items: center;
      font-size: 15px;
      justify-content: flex-end;
      box-sizing: border-box;
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--textColor);
      }
      a:hover:not(.active-menu) {
        background: var(--hoverTextColor);
        transform: skew(-8deg);
      }
      > .menu {
        height: 100%;
        cursor: pointer;
        width: var(--menuWidth);
        margin: 0 5px;
      }
      > .more-menu {
        position: relative;
        width: var(--menuWidth);
        height: var(--menuHeight);
        dl {
          position: absolute;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          dt {
            color: var(--textColor);
            cursor: pointer;
          }
          dt,
          dd {
            width: var(--menuWidth);
            height: var(--menuHeight);
            line-height: var(--menuHeight);
            text-align: center;
          }
          dd {
            display: none;
          }
          &:hover dd {
            display: inline-block;
          }
        }
      }
      > .date-container {
        width: 140px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 12px;
        color: var(--textColor);
        > .clock {
          margin-right: 3px;
          font-size: 15px;
          margin-bottom: -1px;
        }
      }
    }
  }
  > .bg-color {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>