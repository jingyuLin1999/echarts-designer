<template>
  <div class="border-btn">
    <svg :width="size[0]" :height="size[1]">
      <!-- 左上小三角形 -->
      <polygon
        style="stroke-width: 1"
        fill="#11B2B5"
        :points="`0,0 ${size[1] / 2 - 5},0 0,${size[1] / 2 - 5}`"
      >
        <animate
          v-if="isFlashing"
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
          dur="0.7s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <!-- 多边体 -->
      <defs>
        <linearGradient id="borderLinear" x1="3%" y1="3%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style="stop-color: rgb(17, 178, 181); stop-opacity: 1"
          />
          <stop
            offset="100%"
            style="stop-color: rgb(3, 30, 115); stop-opacity: 1"
          />
        </linearGradient>
      </defs>
      <polygon
        style="stroke-width: 1"
        fill="url(#borderLinear)"
        :points="`${size[1] / 2},0 ${size[0]},0 ${size[0]},${size[1]} 0,${
          size[1]
        } 
        0,${size[1] / 2} 3,${size[1] / 2} 
        3,${size[1] - 3}  ${size[0] - 3},${size[1] - 3} ${size[0] - 3},3 ${
          size[1] / 2 + 2
        },3
        4,${size[1] / 2 + 1} 0,${size[1] / 2} 
        `"
      >
        <animate
          v-if="isFlashing"
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
          dur="0.7s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
    <dl class="border-box-content" :style="styleObject">
      <dt @click="onClickBtn">
        <router-link :to="btnInfo.path">{{ btnInfo.title }}</router-link>
      </dt>
      <slot></slot>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    btnInfo: { type: Object, default: () => ({ title: "更多菜单", path: "" }) },
    size: { type: Array, default: () => [120, 34] },
    isFlashing: { type: Boolean, default: false }, // 是否闪动
    textColor: { type: String, default: "#f1f3fe" }, // 文本颜色
    hoverTextColor: { type: String, default: "#1bcbf5" }, // 聚焦文本颜色
  },
  computed: {
    styleObject() {
      return {
        "--color": this.textColor,
        "--color-hover": this.hoverTextColor,
        "--width": this.size[0] - 1 + "px",
      };
    },
  },
  methods: {
    onClickBtn() {
      this.$emit("clickButton", this.btnInfo);
    },
  },
  data() {
    return {
      mergedColor: ["#4fd2dd", "#235fa7"],
    };
  },
};
</script>

<style lang="scss">
$moreMenuBorder: #2fb3b5;
.border-btn {
  position: relative;
  margin-right: 10px;
  .border-box-content {
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 5px 5px 5px 18px;
    color: var(--color);
    cursor: pointer;
    a {
      color: var(--color);
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    & > dt {
      width: 100%;
      height: 100%;
      text-align: center;
    }
    & > dt:hover a {
      color: var(--color-hover);
    }
    & > dd {
      display: none;
      width: var(--width);
      min-height: 33px;
      text-align: left;
      margin-left: -18px;
      box-sizing: border-box;
      padding-left: 4px;
      border-left: 3px solid $moreMenuBorder;
      border-right: 3px solid $moreMenuBorder;
    }
    & > dd:last-of-type {
      border-bottom: 3px solid $moreMenuBorder;
    }
    &:hover dd {
      display: inline-block;
    }
    & > dd:hover a {
      color: var(--color-hover);
    }
    & > dd:first-of-type {
      margin-top: 3px;
    }

    & > dt > a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>