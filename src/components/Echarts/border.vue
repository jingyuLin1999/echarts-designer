<template>
  <div class="border-wrapper">
    <dv-border-box-1
      v-if="chartData.borderType == '1'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-1>
    <dv-border-box-3
      v-else-if="chartData.borderType == '3'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-3>
    <dv-border-box-4
      :reverse="true"
      v-else-if="chartData.borderType == '4'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-4>
    <dv-border-box-8
      :reverse="true"
      v-else-if="chartData.borderType == '8'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-8>
    <dv-border-box-9
      v-else-if="chartData.borderType == '9'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-9>
    <dv-border-box-10
      v-else-if="chartData.borderType == '10'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-10>
    <dv-border-box-11
      v-else-if="chartData.borderType == '11'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-11>
    <dv-border-box-12
      v-else-if="chartData.borderType == '12'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-12>
    <dv-border-box-13
      title="chartData.title"
      v-else-if="chartData.borderType == '13'"
      :style="{ width: borderWh.w, height: borderWh.h }"
    >
      <Field
        :chartData="chartData"
        :echarts="echarts"
        :hooks="hooks"
        :design="design"
      />
    </dv-border-box-13>
    <Field
      v-else
      :style="{ width: borderWh.w, height: borderWh.h }"
      :chartData="chartData"
      :echarts="echarts"
      :hooks="hooks"
      :design="design"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Field from "./field";
import dataV from "@jiaminghi/data-view";
Vue.use(dataV);

export default {
  components: { Field },
  props: {
    design: { type: Boolean, default: false }, // 是否是设计模式
    hooks: { type: Object, default: () => ({}) },
    chartData: { type: Object, default: () => ({}) },
    echarts: { type: Object, default: () => ({}) },
  },
  computed: {
    borderWh() {
      const { width, height } = this.chartData.px;
      return { w: (width || 1) + "px", h: (height || 1) + "px" };
    },
    isReverse() {
      return this.chartData.border.reverse || false;
    },
  },
};
</script>

<style lang="scss">
.border-wrapper {
  .border-box-content {
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    > .field-wrapper {
      width: 95%;
      height: 95%;
      overflow: hidden;
    }
  }
}
</style>