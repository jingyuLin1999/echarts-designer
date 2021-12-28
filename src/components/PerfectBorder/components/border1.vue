<template>
  <div class="dv-border-box-1" :ref="ref">
    <svg class="border" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`10, 27 10, ${height - 27} 13, ${height - 24} 13, ${
          height - 21
        } 24, ${height - 11}
      38, ${height - 11} 41, ${height - 8} 73, ${height - 8} 75, ${
          height - 10
        } 81, ${height - 10}
      85, ${height - 6} ${width - 85}, ${height - 6} ${width - 81}, ${
          height - 10
        } ${width - 75}, ${height - 10}
      ${width - 73}, ${height - 8} ${width - 41}, ${height - 8} ${
          width - 38
        }, ${height - 11}
      ${width - 24}, ${height - 11} ${width - 13}, ${height - 21} ${
          width - 13
        }, ${height - 24}
      ${width - 10}, ${height - 27} ${width - 10}, 27 ${width - 13}, 25 ${
          width - 13
        }, 21
      ${width - 24}, 11 ${width - 38}, 11 ${width - 41}, 8 ${width - 73}, 8 ${
          width - 75
        }, 10
      ${width - 81}, 10 ${
          width - 85
        }, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
      />
    </svg>

    <svg
      width="150px"
      height="150px"
      :key="item"
      v-for="item in border"
      :class="`${item} border`"
    >
      <polygon
        :fill="mergedColor[0]"
        points="0,60 0,12 6,6 12,6 18,0 21,0 24,3 30,3 33,0 78,0 75,3 69,3 67.2,1 34.8,1 31.8,4.2 18,4.2 6,15 6,18 3,21 3,45 1.8,18 1.8,56"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="mergedColor[1]"
        points="21.599999999999998,0 32.4,0.8 29.4,1.8 24.599999999999998,1.8"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="mergedColor[0]"
        points="3,48 3,57 1.199999999999999,60 1.199999999999999,69 1.8,72 1.8,104 2.4,104 2.4,60 3.6,60 3.6,48"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};transparent`"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
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
  name: "DvBorderBox1",
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
      ref: "border-box-1",

      border: ["left-top", "right-top", "left-bottom", "right-bottom"],

      defaultColor: ["#4fd2dd", "#235fa7"],

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
.dv-border-box-1 {
  position: relative;
  width: 100%;
  height: 100%;

  .border {
    position: absolute;
    display: block;
  }

  .right-top {
    right: 0px;
    top: 0px;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0px;
    left: 0px;
    transform: rotateX(180deg);
  }

  .left-top {
    top: 0px;
    left: 0px;
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
    padding: 5px 4px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 23px;
    }
  }
}
</style>
