<template>
  <div class="dv-border-box-6" :ref="ref">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
      `"
      />

      <circle :fill="mergedColor[1]" cx="2" cy="2" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 2" cy="2" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 2" :cy="height - 2" r="2" />
      <circle :fill="mergedColor[1]" cx="2" :cy="height - 2" r="2" />
      <polyline :stroke="mergedColor[0]" :points="`8, 2 ${width - 8}, 2`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`8, ${height - 1} ${width - 8}, ${height - 1}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`4, 70 4, ${height - 70}`" />
     
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 4}, 70 ${width - 4}, ${height - 70}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`1, 8, 1, 50`" />
      
      <polyline :stroke="mergedColor[0]" :points="`6, 30 6, 80`" />
      
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 1}, 8 ${width - 1}, 50`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 6}, 30 ${width - 6}, 80`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`1, ${height - 8} 1, ${height - 50}`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`6, ${height - 30} 6, ${height - 80}`"
      />
      
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 1}, ${height - 8} ${width - 1}, ${height - 50}`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`"
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
  name: "DvBorderBox6",
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
      ref: "border-box-6",

      defaultColor: ["#083276", "#80DEF5"],

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
.dv-border-box-6 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 4px 8px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
