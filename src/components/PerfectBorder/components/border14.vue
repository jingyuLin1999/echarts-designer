<template>
  <div class="dv-border-box-14">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.dv-border-box-14 {
  --borderWidth: 2px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: var(--borderWidth);

  &.dv-border-box-14:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 5s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    padding: var(--borderWidth);
    overflow: hidden;
    box-sizing: border-box;
  }
}
</style>