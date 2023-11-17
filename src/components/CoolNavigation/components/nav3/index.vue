<template>
  <div class="cool-navigation-3" :ref="ref" :style="injectStyles">
    <svg :width="width" :height="height" v-for="type in ['svg-bg', 'svg-bg-reverse']" :key="type" :class="type">
      <!-- 左侧顶部 -->
      <defs>
        <linearGradient id="linear" x1="0%" y1="50%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(0,104,238,1)" />
          <stop offset="50%" stop-color="rgba(57,116,242,1)" />
          <stop offset="80%" stop-color="rgba(47,125,245,1)" />
          <stop offset="100%" stop-color="rgba(89,163,254,1)" />
        </linearGradient>
      </defs>
      <polygon style="stroke-width: 1" fill="url(#linear)" :points="`${halfWidth * 0.00106},${height * 0.01613}
                                            ${halfWidth * 0.0529},${height * 0.01613} 
                                            ${halfWidth * 0.0645},${height * 0.1935} 
                                            ${halfWidth * 0.1416},${height * 0.1935} 
                                            ${halfWidth * 0.1459},${height * 0.2742}
                                            ${halfWidth * 0.019},${height * 0.2742}
        `" />
      <!-- 左侧顶部小平行四边形 -->
      <polygon style="stroke-width: 1" fill="#60F3FA" :points="`${halfWidth * 0.05814},${height * 0.01613}
                                            ${halfWidth * 0.0687},${height * 0.01613} 
                                            ${halfWidth * 0.0751},${height * 0.129032} 
                                            ${halfWidth * 0.0645},${height * 0.129032} 
        `" />
      <polygon />
      <!-- 线 -->
      <defs>
        <linearGradient id="main" x1="50%" y1="0" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color: #2a5ff5; stop-opacity: 1" />
          <stop offset="10%" style="stop-color: #2759e6; stop-opacity: 0.9" />
          <stop offset="30%" style="stop-color: #2759e6; stop-opacity: 0.6" />
          <stop offset="50%" style="stop-color: #2759e6; stop-opacity: 0.4" />
          <stop offset="100%" style="stop-color: #2759e6; stop-opacity: 0.05" />
        </linearGradient>
      </defs>
      <polygon style="stroke-width: 1" fill="url(#main)" :points="`${halfWidth * 0.07188},${height * 0.01613}
                                            ${halfWidth},${height * 0.01613} 
                                            ${halfWidth},${height * 0.9516} 
                                            ${halfWidth * (0.6977 + titleWidthPct)},${height * 0.9516} 
                                            ${halfWidth * (0.60994 + titleWidthPct)},${height * 0.14516} 
                                            ${halfWidth * 0.07928},${height * 0.129032} 
        `" />
      <polygon />
      <polyline style="fill: none; stroke: #33e8ff; stroke-width: 1" :points="`${halfWidth * (0.58034 + titleWidthPct)},${height * 0.156}
                                            ${halfWidth * (0.60994 + titleWidthPct)},${height * 0.156} 
                                            ${halfWidth * (0.6977 + titleWidthPct)},${height * 0.93} 
                                            ${halfWidth},${height * 0.93} 
        `" />
      <!-- 线高亮 -->
      <defs>
        <linearGradient id="hightlight" x1="0" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style="stop-color: #385eec; stop-opacity: 1" />
          <stop offset="40%" style="stop-color: #38d3fe; stop-opacity: 1" />
          <stop offset="80%" style="stop-color: #38d3fe; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #365ae7; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <ellipse :cx="halfWidth / 2" :cy="height * 0.047" :rx="halfWidth * 0.05874" :ry="1.4" fill="url(#hightlight)"
        style="stroke-width: 0" />
      <!-- 平行四边形 -->
      <defs>
        <linearGradient id="rect" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #2d88fe; stop-opacity: 1" />
          <stop offset="20%" style="stop-color: #32b0fe; stop-opacity: 1" />
          <stop offset="40%" style="stop-color: #3cebff; stop-opacity: 1" />
          <stop offset="60%" style="stop-color: #3cebff; stop-opacity: 1" />
          <stop offset="80%" style="stop-color: #32b0fe; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #2d88fe; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <polygon style="stroke-width: 1" fill="url(#rect)" :points="`${halfWidth * (0.6025 + titleWidthPct)},${height * 0.3548}
                                            ${halfWidth * (0.6184 + titleWidthPct)},${height * 0.3548} 
                                            ${halfWidth * (0.65856 + titleWidthPct)},${height * 0.7258} 
                                            ${halfWidth * (0.6425 + titleWidthPct)},${height * 0.7258} 
        `" />

      <polygon style="stroke-width: 1" fill="url(#rect)" :points="`${halfWidth * (0.579 + titleWidthPct)},${height * 0.3548}
                                            ${halfWidth * (0.5906 + titleWidthPct)},${height * 0.3548} 
                                            ${halfWidth * (0.6212 + titleWidthPct)},${height * 0.6452} 
                                            ${halfWidth * (0.6096 + titleWidthPct)},${height * 0.6452} 
        `" />

      <polygon style="stroke-width: 1" fill="url(#rect)" :points="`${halfWidth * (0.5578 + titleWidthPct)},${height * 0.3548}
                                            ${halfWidth * (0.56735 + titleWidthPct)},${height * 0.3548} 
                                            ${halfWidth * (0.5938 + titleWidthPct)},${height * 0.6129} 
                                            ${halfWidth * (0.5843 + titleWidthPct)},${height * 0.6129} 
        `" />

      <polygon style="stroke-width: 1" fill="url(#rect)" :points="`${halfWidth * (0.54 + titleWidthPct)},${height * 0.3548}
                                            ${halfWidth * (0.549 + titleWidthPct)},${height * 0.3548} 
                                            ${halfWidth * (0.57 + titleWidthPct)},${height * 0.5806} 
                                            ${halfWidth * (0.56 + titleWidthPct)},${height * 0.5806} 
        `" />
      <!-- 平行四边形的线 -->
      <defs>
        <linearGradient id="rectLine" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #37e9fe; stop-opacity: 0.5" />
          <stop offset="40%" style="stop-color: #37e9fe; stop-opacity: 1" />
          <stop offset="80%" style="stop-color: #37e9fe; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #276bfe; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <polyline style="fill: none; stroke-width: 1" stroke="url(#rectLine)" :points="`${halfWidth * (0.5 + titleWidthPct)},${height * 0.154}
                                            ${halfWidth * (0.55482 + titleWidthPct)},${height * 0.75} 
                                            ${halfWidth * (0.609 + titleWidthPct)},${height * 0.75} 
        `" />
      <!-- 下面的线 -->
      <!-- <defs>
        <linearGradient id="bottomLine" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #2a60f6; stop-opacity: 0" />
          <stop offset="15%" style="stop-color: #2a60f6; stop-opacity: 0.9" />
          <stop offset="85%" style="stop-color: #2a60f6; stop-opacity: 0.9" />
          <stop offset="100%" style="stop-color: #2a60f6; stop-opacity: 0" />
        </linearGradient>
      </defs>
      <polyline
        style="fill: none; stroke-width: 2"
        stroke="url(#bottomLine)"
        :points="`${halfWidth * 0.0349},${height * 0.95}
        ${halfWidth * 0.5552},${height * 0.95} 
        ${halfWidth * 0.58},${height * 0.86} 
        ${halfWidth * 0.67},${height * 0.86} 
        `"
      /> -->
    </svg>
    <!-- 正式数据 -->
    <div class="title">{{ navTitle }}</div>
    <Menu1 class="menu-left" :menu="leftMenus" :textColor="textColor" :internation="internation" :menuSize="menuSize"
      :defaultProp="defaultProp" :hoverTextColor="hoverTextColor" :activeTextColor="activeTextColor"
      :defaultActiveMenu="defaultActiveMenu" :flatMenuSearchPool="flatMenuSearchPool"
      :style="{ width: halfWidth * (0.5 + titleWidthPct) + 'px' }"></Menu1>
    <Menu1 class="menu-right" :menu="rightMenus" :textColor="textColor" :internation="internation" :menuSize="menuSize"
      :defaultProp="defaultProp" :hoverTextColor="hoverTextColor" :activeTextColor="activeTextColor"
      :defaultActiveMenu="defaultActiveMenu" :flatMenuSearchPool="flatMenuSearchPool"
      :style="{ width: halfWidth * (0.5 + titleWidthPct) + 'px' }"></Menu1>
  </div>
</template>

<script>

import autoResize from "@/mixins/autoResize";
import { Menu1 } from "@/components/Menus";
export default {
  name: "coolNavigation3",
  mixins: [autoResize],
  components: { Menu1 },
  props: {
    menu: { type: Array, default: () => [] },
    menuSize: { type: Array, default: () => [120, 34] },
    activeMenu: { type: String, default: "" }, // 已触发的菜单
    navTitle: { type: String, default: "声发射系统" },
    bgColor: { type: String, default: "" },
    textColor: { type: String, default: "#C0CBD9" }, // 文本颜色
    defaultActiveMenu: { type: String, default: "" },
    hoverTextColor: { type: String, default: "#1bcbf5" }, // 聚焦文本颜色
    activeTextColor: { type: String, default: "#0EB3B3" }, // 激活的文本颜色
    defaultProp: { type: Object, default: () => ({}) },
    navHeight: { type: String, default: "63px" },
    titleWidthPct: { type: Number, default: 0.1 }, // 标题宽度
    internation: { type: Boolean, default: false, } // 是否国际化
  },
  mounted() {
    this.flatMenuSearchPool = this.iterationMenus(this.menu);
  },
  computed: {
    halfWidth() {
      return this.width / 2;
    },
    leftMenus() {
      let btnContianerWidth = this.halfWidth * (0.5 + this.titleWidthPct) - 5;
      let btnWidth = this.menuSize[0] + 5;
      let tackupNum = Math.floor(btnContianerWidth / btnWidth);
      let denominator = tackupNum > 0 ? tackupNum - 1 : 1
      this.btnMarginRight = (btnContianerWidth - tackupNum * this.menuSize[0]) / denominator;
      return this.menu.slice(0, tackupNum);
    },
    rightMenus() {
      let btnContianerWidth = this.halfWidth * (0.5 + this.titleWidthPct) - 5;
      let tackupNum = Math.floor(btnContianerWidth / (this.menuSize[0] + 5));
      let menus = [];
      // 溢出
      if (this.menu.length > tackupNum * 2) {
        menus = this.menu.slice(tackupNum, tackupNum * 2 - 1);
        let inMoreMenus = this.menu.slice(tackupNum * 2 - 1, this.menu.length);
        inMoreMenus.map(item => {
          if (item.meta) item.meta.className = "leftExpand";
        })
        let moreMenu = {
          path: "/more-menu",
          meta: { icon: "", title: this.internation ? "menus.moreMenu" : "更多菜单", className: "leftExpand" },
          children: inMoreMenus
        }
        menus.push(moreMenu)
      } else menus = this.menu.slice(tackupNum, tackupNum * 2)
      return menus
    },
    injectStyles() {
      return {
        "--bgColor": this.bgColor,
        "--textColor": this.textColor,
        "--hoverTextColor": this.hoverTextColor,
        "--activeTextColor": this.activeTextColor,
        "--navHeight": this.navHeight,
        "--menuWidth": this.menuSize[0] + "px",
        "--menuHeight": this.menuSize[1] + 1 + "px",
        "--btnMarginRight": this.btnMarginRight + "px",
      };
    },
  },
  methods: {
    iterationMenus(routers, menuMap = {}, parentPath = "",) {
      routers.map((item) => {
        if (item.meta) item.meta.className = "";
        if (
          Array.isArray(item[this.defaultProp.children]) &&
          item[this.defaultProp.children].length > 0
        ) {
          this.iterationMenus(item[this.defaultProp.children], menuMap, item.path);
          // 往上爬
          item.parentPath = parentPath;
          menuMap[item.path] = item
        } else {
          item.parentPath = parentPath;
          menuMap[item.path] = item
        }
      });
      return menuMap;
    },
  },
  data() {
    return {
      ref: "cool-navigation-3",
      btnMarginRight: 5,
      flatMenuSearchPool: {},
    }
  },
}
</script>

<style lang="scss">
.cool-navigation-3 {
  width: 100%;
  height: var(--navHeight);
  position: relative;

  .svg-bg-reverse {
    transform: rotateY(180deg);
  }

  .svg-bg,
  .title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .menu-left {
    position: absolute;
    bottom: 7px;
    left: 5px;
    z-index: 99;
    height: var(--menuHeight);

    .menu-item {
      margin-right: var(--btnMarginRight);
    }
  }

  .menu-right {
    position: absolute;
    bottom: 7px;
    right: 5px;
    z-index: 99;
    height: var(--menuHeight);

    .menu-item {
      margin-right: var(--btnMarginRight);
    }
  }

  .title {
    z-index: 98;
    height: calc(100% - 6px);
    color: #f9fffd;
    font-size: 2.636552em;
    text-align: center;
    font-family: PangMenZhengDao;
    font-weight: 700;
    text-shadow: 0px 0.1004em 0.20417em #09d7f1;
    letter-spacing: 0.01563rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    animation: titleAnimation 2s cubic-bezier(0, 0.5, 0.37, 0.95);
  }

  @keyframes titleAnimation {
    0% {
      transform: rotateX(90deg);
    }

    90% {
      transform: rotateX(-10deg);
    }

    100% {
      transform: rotateX(0deg);
    }
  }
}
</style>