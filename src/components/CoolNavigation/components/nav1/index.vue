<template>
  <div class="cool-navigation-1" :ref="ref">
    <svg
      v-for="item in ['line', 'line-reverse']"
      :key="item"
      :class="item"
      :width="width"
      :height="height"
    >
      <polygon
        style="stroke-width: 1"
        fill="#0c7ef8"
        :points="`0,${height * 0.31}
        ${halfWidth * 0.591},${height * 0.31} 
        ${halfWidth * 0.613},${height * 0.53} 
        ${halfWidth * 0.709},${height * 0.53} 
        ${halfWidth - halfWidth * 0.239},${height}
        ${halfWidth},${height}
        ${halfWidth},${height - 2}
        ${halfWidth - halfWidth * 0.239 + 1},${height - 2}
        ${halfWidth * 0.709 + 1},${height * 0.53 - 2} 
        ${
          halfWidth -
          halfWidth * 0.21 -
          halfWidth * 0.081 -
          halfWidth * 0.096 +
          1
        },${height * 0.53 - 2} 
        ${halfWidth * 0.591 + 1},${height * 0.31 - 2} 
        0,${height * 0.31 - 2}`"
      />
      <polygon />
      <!-- 标题下方线发亮 -->
      <polygon
        style="stroke-width: 1"
        fill="#34D4FC"
        :points="`${halfWidth - halfWidth * 0.239},${height} 
        ${halfWidth - halfWidth * 0.139},${height - 2} 
        ${halfWidth},${height - 3}
        ${halfWidth},${height}
        `"
      />
      <!-- 线上两个矩形 -->
      <rect
        class="line-rect"
        :x="halfWidth * 0.35"
        :y="height * 0.262"
        :width="halfWidth * 0.099"
        :height="height * 0.06"
        fill="#1fc9ea"
      />
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style="stop-color: rgb(43, 129, 249); stop-opacity: 1"
          />
          <stop
            offset="100%"
            style="stop-color: rgb(112, 36, 248); stop-opacity: 1"
          />
        </linearGradient>
      </defs>
      <rect
        class="line-rect"
        :x="0"
        :y="height * 0.262"
        :width="halfWidth * 0.099"
        :height="height * 0.06"
        fill="url(#grad1)"
      />
      <!-- 顶部矩形 -->
      <rect
        v-for="(item, index) in 10"
        :key="item"
        class="top-rect"
        :x="
          halfWidth -
          halfWidth * 0.1 -
          halfWidth * 0.08 -
          halfWidth * 0.028 -
          index * 32
        "
        y="0"
        :width="
          halfWidth * 0.022 - index * 1.7 > 0
            ? halfWidth * 0.022 - index * 1.7
            : 0
        "
        :height="height * 0.17"
        :fill="topRectColor[index]"
      />
      <!-- 下方矩形 -->
      <polygon
        style="stroke-width: 1"
        fill="#1171B7"
        :points="`
        ${halfWidth * 0.709 - halfWidth * 0.058},${height * 0.59} 
        ${halfWidth - halfWidth * 0.21 - halfWidth * 0.107},${height - 6} 
        ${halfWidth - halfWidth * 0.21 - halfWidth * 0.086},${height - 6} 
        ${
          halfWidth - halfWidth * 0.21 - halfWidth * 0.082 - halfWidth * 0.037
        },${height * 0.59}`"
      />
      <polygon
        style="stroke-width: 1"
        fill="#2C9BFB"
        :points="`
        ${halfWidth - halfWidth * 0.321},${height * 0.59} 
        ${halfWidth - halfWidth * 0.286},${height - 6} 
        ${halfWidth - halfWidth * 0.257},${height - 6} 
        ${halfWidth - halfWidth * 0.294},${height * 0.59}`"
      />
      <!-- 上方线 -->
      <polygon
        style="stroke-width: 1"
        fill="#3557f6"
        :points="`
        ${halfWidth * 0.596},${height * (0.31 + 0.06)} 
        ${halfWidth * 0.709 + 10},${height * (0.31 + 0.06)} 
        ${halfWidth - halfWidth * 0.21},${height - 2}
        ${halfWidth - halfWidth * 0.21 + 3},${height - 2}
        ${halfWidth * 0.709 + 10},${height * (0.31 + 0.06) - 1} 
        ${halfWidth * 0.606 - 1},${height * (0.31 + 0.06) - 2} 
        `"
      />
      <!-- 下方线 -->
      <polygon
        style="stroke-width: 1"
        fill="#039eff"
        :points="`
        ${halfWidth * 0.709 - halfWidth * 0.07},${height * 0.56} 
        ${halfWidth * 0.709 - halfWidth * 0.029},${height} 
        ${halfWidth - halfWidth * 0.245},${height}
        ${halfWidth - halfWidth * 0.245},${height - 1}
        ${
          halfWidth -
          halfWidth * 0.21 -
          halfWidth * 0.081 -
          halfWidth * 0.029 +
          1
        },${height - 1} 
        ${
          halfWidth -
          halfWidth * 0.21 -
          halfWidth * 0.081 -
          halfWidth * 0.07 +
          2
        },${height * 0.56} 
        `"
      />
      <polygon
        style="stroke-width: 1"
        fill="#3557f6"
        :points="`
        ${halfWidth * 0.709 - halfWidth * 0.082},${height * 0.56} 
        ${halfWidth * 0.709 - halfWidth * 0.042},${height} 
        ${
          halfWidth -
          halfWidth * 0.21 -
          halfWidth * 0.082 -
          halfWidth * 0.041 +
          2
        },${height} 
        ${
          halfWidth -
          halfWidth * 0.21 -
          halfWidth * 0.082 -
          halfWidth * 0.08 +
          2
        },${height * 0.56} 
        `"
      />
      <polygon
        style="stroke-width: 1"
        fill="#3557f6"
        :points="`
        ${
          halfWidth - halfWidth * 0.21 - halfWidth * 0.082 - halfWidth * 0.094
        },${height * 0.56} 
        ${
          halfWidth - halfWidth * 0.21 - halfWidth * 0.082 - halfWidth * 0.057
        },${height} 
        ${halfWidth - halfWidth * 0.349 + 2},${height} 
        ${halfWidth - halfWidth * 0.385 + 2},${height * 0.56} 
        `"
      />
    </svg>
    <!-- 标题 -->
    <div class="title-content">{{ navTitle }}</div>
    <!-- 菜单 -->
    <div class="left-menu menu-position">
      <Button
        v-for="(menuItem, index) in leftMenu"
        :key="index"
        :btnInfo="menuItem"
        :size="menuSize"
      />
    </div>
    <div class="right-menu menu-position">
      <Button
        v-for="(menuItem, index) in rightMenu"
        :key="index"
        :btnInfo="menuItem"
        :size="menuSize"
      />
      <Button class="more-menu" v-if="moreMenu.length > 0" :size="menuSize">
        <dd
          v-for="(moreItem, index) in moreMenu"
          :key="index"
          :style="{ background: bgColor }"
        >
          <router-link :to="moreItem.path"> {{ moreItem.title }}</router-link>
        </dd>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "./borderBtn";
import autoResize from "../../../PerfectBorder/autoResize";
export default {
  name: "decorationTitle",
  mixins: [autoResize],
  components: { Button },
  props: {
    menu: { type: Array, default: () => [] },
    colors: { type: Array, default: () => [] },
    navTitle: { type: String, default: "工厂看板" },
    menuSize: { type: Array, default: () => [120, 34] },
    bgColor: { type: String, default: "" },
  },
  computed: {
    halfWidth() {
      return this.width / 2;
    },
    takeUpMenuNum() {
      return Math.floor((this.halfWidth * 0.58) / (this.menuSize[0] + 10));
    },
    leftMenu() {
      return this.menu.slice(0, this.takeUpMenuNum);
    },
    rightMenu() {
      return this.menu.slice(
        this.takeUpMenuNum,
        this.menu.length > 2 * this.takeUpMenuNum
          ? 2 * this.takeUpMenuNum - 1
          : 2 * this.takeUpMenuNum
      );
    },
    moreMenu() {
      let moreMenu = [];
      if (this.menu.length > 2 * this.takeUpMenuNum) {
        moreMenu = this.menu.slice(
          2 * this.takeUpMenuNum - 1,
          this.menu.length
        );
      }
      return moreMenu;
    },
  },
  data() {
    return {
      ref: "cool-navigation-1",
      topRectColor: [
        "#2ec9ff",
        "#26c4ff",
        "#1ec0ff",
        "#29b3fc",
        "#22a9ff",
        "#1ba6ff",
        "#1796ff",
        "#128eff",
        "#2e83e0",
        "#2e83e0",
      ],
    };
  },
};
</script>

<style lang="scss">
.cool-navigation-1 {
  position: relative;
  width: 100%;
  height: 100%;
  .line-reverse {
    position: absolute;
    right: 0;
    top: 0;
    transform: rotateY(180deg);
  }
  .top-rect {
    transform: skew(-40deg);
  }
  .title-content {
    position: absolute;
    box-sizing: border-box;
    white-space: nowrap;
    width: 20%;
    height: 100%;
    left: 40%;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 41px;
    font-weight: 550;
    font-family: "微软雅黑";
    background: linear-gradient(to bottom, #fefaf4 30%, #32dafe);
    -webkit-background-clip: text;
    color: transparent;
  }
  > .menu-position {
    position: absolute;
    width: 30%;
    height: 64%;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 20px;
  }
  > .left-menu {
    left: 0;
  }
  > .right-menu {
    right: 0;
  }
}
</style>