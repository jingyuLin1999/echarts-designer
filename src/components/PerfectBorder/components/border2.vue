<template>
  <div class="dv-border-box-2" :ref="ref">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6}
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :points="`1, 1 ${width - 1} ,1 ${width - 1}, ${height - 1} 1, ${
          height - 1
        } 1, 1`"
      />
      <polyline
        :stroke="mergedColor[1]"
        :points="`5, 5 ${width - 6}, 5 ${width - 5}, ${height - 5} 5, ${
          height - 5
        } 5, 5`"
      />
      <circle :fill="mergedColor[0]" cx="10" cy="10" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 10" cy="10" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 10" :cy="height - 10" r="1" />
      <circle :fill="mergedColor[0]" cx="10" :cy="height - 10" r="1" />
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
  name: "DvBorderBox2",
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
      ref: "border-box-2",

      defaultColor: ["#235fa7", "#4fd2dd"],

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
.dv-border-box-2 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 7px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 2px;
    }
  }
}
</style>
