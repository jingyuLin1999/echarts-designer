<template>
  <component
    :is="type"
    :style="{ width: borderWh.w, height: borderWh.h }"
    :reverse="isReverse"
  >
    <div class="perfect-border">
      <slot />
    </div>
  </component>
</template>

<script>
import Vue from "vue";
import {
  borderBox1,
  borderBox2,
  borderBox3,
  borderBox4,
  borderBox5,
  borderBox6,
  borderBox7,
  borderBox8,
  borderBox9,
  borderBox10,
  borderBox11,
  borderBox12,
  borderBox13,
} from "@jiaminghi/data-view";
const dataViewBorder = {
  borderBox1,
  borderBox2,
  borderBox3,
  borderBox4,
  borderBox5,
  borderBox6,
  borderBox7,
  borderBox8,
  borderBox9,
  borderBox10,
  borderBox11,
  borderBox12,
  borderBox13,
};
for (let key in dataViewBorder) Vue.use(dataViewBorder[key]);

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    type() {
      let { borderType } = this.item;
      let reversePos = borderType.indexOf("reverse");
      if (reversePos > -1) borderType = borderType.substring(0, reversePos);
      return "dv-border-box-" + borderType;
    },
    borderWh() {
      const { width, height } = this.item.px;
      return { w: (width || 1) + "px", h: (height || 1) + "px" };
    },
    isReverse() {
      return this.item.borderType.indexOf("reverse") > -1;
    },
  },
};
</script>

<style lang="scss">
.perfect-border {
  padding: 13px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
