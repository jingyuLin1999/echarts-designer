<template>
  <div class="dv-border-box-13" :ref="ref">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <path
        :fill="backgroundColor"
        :stroke="mergedColor[0]"
        :d="`
          M 1 20 L 1 9 L 9 1  L 60 1 L 68 7
          L ${width - 18} 7 L ${width - 1} 23
          L ${width - 1} ${height - 1} L 18 ${height - 1}
          L 1 ${height - 16} L 1 20
        `"
      />

      <path
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="mergedColor[0]"
        :d="`M 16 7 L 61 7`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M 1 20 L 1 9 L 9 1  L 60 1 L 68 7`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M ${width - 1} ${height - 30} L ${width - 1} ${height - 1} L ${
          width - 30
        } ${height - 1}`"
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
import autoResize from "@/mixins/autoResize";

import { clone, mergeDeepRight } from "ramda";

export default {
  name: "DvBorderBox13",
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
      ref: "border-box-13",

      defaultColor: ["#6586ec", "#2cf7fe"],

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
.dv-border-box-13 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 9px 3px 3px 3px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 2px 25px 0px 26px;
    }
  }
}
</style>
