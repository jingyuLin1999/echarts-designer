<template>
  <div class="perfect-border">
    <div :class="['box', { [border.className]: border.className }]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    border: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="scss">
.perfect-border {
  width: 100%;
  height: 100%;

  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 1px;
    box-sizing: border-box;
  }

  .border--0 {
    border: 2px solid #4452b4;
    border-radius: 2px;
  }
}
</style>