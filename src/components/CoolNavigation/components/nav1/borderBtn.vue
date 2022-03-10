<template>
  <div class="border-btn">
    <svg :width="size[0]" :height="size[1]">
      <polygon
        style="stroke-width: 1"
        fill="#11B2B5"
        :points="`0,0 ${size[1] / 2 - 5},0 0,${size[1] / 2 - 5}`"
      />
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
      />
    </svg>
    <dl class="border-box-content" :style="styleObject">
      <dt>
        <router-link :to="btnInfo.path">{{ btnInfo.title }}</router-link>
      </dt>
      <slot></slot>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    btnInfo: {
      type: Object,
      default: () => ({ title: "更多菜单", path: "" }),
    },
    colors: { type: Array, default: () => ["#f1f3fe", "#1bcbf5"] }, // 颜色，0字体颜色1悬停的颜色
    size: { type: Array, default: () => [120, 34] },
  },
  computed: {
    styleObject() {
      return {
        "--color": this.colors[0],
        "--color-hover": this.colors[1],
        "--width": this.size[0] + "px",
      };
    },
  },
};
</script>

<style lang="scss">
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
      text-align: center;
    }
    & > dt:hover a {
      color: var(--color-hover);
    }
    & > dd {
      display: none;
      width: var(--width);
      height: 33px;
      line-height: 33px;
      text-align: left;
      margin-left: -17px;
      box-sizing: border-box;
      padding-left: 4px;
    }
    &:hover dd {
      display: inline-block;
    }
    & > dd:hover a {
      color: var(--color-hover);
    }
    & > dd:first-of-type {
      margin-top: 10px;
    }
    & > dt > a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>