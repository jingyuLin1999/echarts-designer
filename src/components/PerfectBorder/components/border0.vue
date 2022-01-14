<template>
  <div class="perfect-border">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.perfect-border {
  padding: 1px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>