<template>
  <div class="dv-border-box-12" :ref="ref">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology
            operator="dilate"
            radius="1"
            in="SourceAlpha"
            result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feFlood
            :flood-color="fade(mergedColor[1] || defaultColor[1], 70)"
            result="glowColor"
          >
            <animate
              attributeName="flood-color"
              :values="`
                ${fade(mergedColor[1] || defaultColor[1], 70)};
                ${fade(mergedColor[1] || defaultColor[1], 30)};
                ${fade(mergedColor[1] || defaultColor[1], 70)};
              `"
              dur="3s"
              begin="0s"
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlowColored"
          />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        v-if="width && height"
        :fill="backgroundColor"
        stroke-width="2"
        :stroke="mergedColor[0]"
        :d="`
          M15 1.5 L ${width - 15} 1.5 Q ${width - 1.5} 1.5, ${width - 1.5} 15
          L ${width - 1.5} ${height - 15} Q ${width - 1.5} ${height - 1.5}, ${
          width - 15
        } ${height - 1.5}
          L 15, ${height - 1.5} Q 1.5 ${height - 1.5} 1.5 ${
          height - 15
        } L 1.5 15
          Q 1.5 1.5 15 1.5
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`M 20 1.5 L 15 1.5 Q 1.5 1.5 1.5 15 L 1.5 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`M ${width - 20} 1.5 L ${width - 15} 1.5 Q ${width - 1.5} 1.5 ${
          width - 1.5
        } 15 L ${width - 1.5} 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M ${width - 20} ${height - 1.5} L ${width - 15} ${height - 1.5}
          Q ${width - 1.5} ${height - 1.5} ${width - 1.5} ${height - 15}
          L ${width - 1.5} ${height - 20}
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M 20 ${height - 1.5} L 15 ${height - 1.5}
          Q 1.5 ${height - 1.5} 1.5 ${height - 15}
          L 1.5 ${height - 20}
        `"
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

import { fade } from "@jiaminghi/color";

export default {
  name: "DvBorderBox12",
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
      ref: "border-box-12",
      filterId: `borderr-box-12-filterId-${id}`,

      defaultColor: ["#2e6099", "#7ce7fd"],

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
    fade,
  },
  mounted() {
    const { mergeColor } = this;

    mergeColor();
  },
};
</script>

<style lang="scss">
.dv-border-box-12 {
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
    padding: 3px;
    box-sizing: border-box;
    .perfect-border {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 11px;
    }
  }
}
</style>
