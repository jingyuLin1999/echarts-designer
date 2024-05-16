<template>
  <div class="dv-border-box-15" :style="injectCSS">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    border: { type: Object, default: () => ({}) },
  },
  computed: {
    injectCSS() {
      const { color } = this.border
      return {
        "--c1": color && color[0] || '#8f41e9',
        "--c2": color && color[1] || '#578aef'
      }
    }
  }

};
</script>

<style lang="scss">
.dv-border-box-15 {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  border: 2px solid;
  border-image: linear-gradient(to right, var(--c1), var(--c2)) 1;
  overflow: hidden;
}
</style>