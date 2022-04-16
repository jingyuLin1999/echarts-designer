<template>
  <div class="dv-border-box-9" :ref="ref">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <animate
            attributeName="x1"
            values="0%;100%;0%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="x2"
            values="100%;0%;100%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <stop offset="0%" :stop-color="mergedColor[0]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" :stop-color="mergedColor[1]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        <mask :id="maskId">
          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`6, ${height * 0.4} 6, 1, ${width * 0.4 + 7}, 1`"
          />
          <polyline
            fill="#fff"
            :points="`6, ${height * 0.15} 6, 1, ${width * 0.1 + 7}, 1
              ${width * 0.1}, 6 14, 6 14, ${height * 0.15 - 7}
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${width * 0.5}, 1 ${width - 1}, 1, ${width - 1}, ${
              height * 0.25
            }`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.52}, 1 ${width * 0.58}, 1
              ${width * 0.58 - 7}, 9 ${width * 0.52 + 7}, 9
            `"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.9}, 1 ${width - 1}, 1 ${width - 1}, ${height * 0.1}
              ${width - 9}, ${height * 0.1 - 7} ${width - 9}, 9 ${
              width * 0.9 + 7
            }, 9
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`6, ${height * 0.5} 6, ${height - 1} ${width * 0.3 + 6}, ${
              height - 1
            }`"
          />
          <polyline
            fill="#fff"
            :points="`
              6, ${height * 0.55} 6, ${height * 0.7}
              0, ${height * 0.7 - 6} 0, ${height * 0.55 + 6}
            `"
          />
          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${width * 0.35}, ${height - 1} ${width - 1}, ${
              height - 1
            } ${width - 1}, ${height * 0.35}`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.92}, ${height - 1} ${width - 1}, ${height - 1} ${
              width - 1
            }, ${height * 0.8}
              ${width - 9}, ${height * 0.8 + 7} ${width - 9}, ${height - 9} ${
              width * 0.92 + 7
            }, ${height - 9}
            `"
          />
        </mask>
      </defs>

      <polygon
        :fill="backgroundColor"
        :points="`
        15, 9 ${width * 0.1 + 1}, 9 ${width * 0.1 + 4}, 6 ${width * 0.52 + 2}, 6
        ${width * 0.52 + 6}, 10 ${width * 0.58 - 7}, 10 ${width * 0.58 - 2}, 6
        ${width * 0.9 + 2}, 6 ${width * 0.9 + 6}, 10 ${width - 10}, 10 ${
          width - 10
        }, ${height * 0.1 - 6}
        ${width - 6}, ${height * 0.1 - 1} ${width - 6}, ${height * 0.8 + 1} ${
          width - 10
        }, ${height * 0.8 + 6}
        ${width - 10}, ${height - 10} ${width * 0.92 + 7}, ${height - 10}  ${
          width * 0.92 + 2
        }, ${height - 6}
        11, ${height - 6} 11, ${height * 0.15 - 2} 15, ${height * 0.15 - 7}
      `"
      />

      <rect
        x="0"
        y="0"
        :width="width"
        :height="height"
        :fill="`url(#${gradientId})`"
        :mask="`url(#${maskId})`"
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
import { uuid } from "@/utils";

import autoResize from "@/mixins/autoResize";

import { clone, mergeDeepRight } from "ramda";

export default {
  name: "DvBorderBox9",
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
    const id = uuid();
    return {
      ref: "border-box-9",

      gradientId: `border-box-9-gradient-${id}`,
      maskId: `border-box-9-mask-${id}`,

      defaultColor: ["#11eefd", "#0078d2"],

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
.dv-border-box-9 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px 8px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 35px 35px 35px 0;
    }
  }
}
</style>
