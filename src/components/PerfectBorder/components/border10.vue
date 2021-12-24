<template>
  <div
    class="dv-border-box-10"
    :ref="ref"
    :style="`box-shadow: inset 0 0 25px 3px ${mergedColor[0]}`"
  >
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${
          width - 4
        }, ${height}
        4, ${height} 0, ${height - 4} 0, 4
      `"
      />
    </svg>

    <svg
      width="150px"
      height="150px"
      :key="item"
      v-for="item in border"
      :class="`${item} dv-border-svg-container`"
    >
      <polygon
        :fill="mergedColor[1]"
        points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
      />
    </svg>

    <div class="border-box-content">
      <div class="perfect-border">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import autoResize from "../autoResize";

import { clone, mergeDeepRight } from "ramda";

export default {
  name: "DvBorderBox10",
  mixins: [autoResize],
  props: {
    color: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  data() {
    return {
      ref: "border-box-10",

      border: ["left-top", "right-top", "left-bottom", "right-bottom"],

      defaultColor: ["#1d48c4", "#d3e1f8"],

      mergedColor: [],
    };
  },
  watch: {
    color() {
      const { mergeColor } = this;

      mergeColor();
    },
  },
  methods: {
    mergeColor() {
      const { color, defaultColor } = this;

      this.mergedColor = mergeDeepRight(clone(defaultColor, true), color || []);
    },
  },
  mounted() {
    const { mergeColor } = this;

    mergeColor();
  },
};
</script>

<style lang="scss">
.dv-border-box-10 {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;

  .dv-border-svg-container {
    position: absolute;
    display: block;
  }

  .right-top {
    right: 0px;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0px;
    transform: rotateX(180deg);
  }

  .right-bottom {
    right: 0px;
    bottom: 0px;
    transform: rotateX(180deg) rotateY(180deg);
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 3px;
    }
  }
}
</style>
