<template>
  <div class="dv-border-box-14">
    <div class="gradient-border">
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
  padding: var(--borderWidth);
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .gradient-border {
    width: 100%;
    height: 100%;
    background: #1d1f20;
    position: relative;
    box-sizing: border-box;
    border-radius: var(--borderWidth);
  }

  .gradient-border:after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #f79533,
      #f37055,
      #2e6099,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    );
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    background-size: 300% 300%;
    animation: animatedgradient 5s ease alternate infinite;
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
}
</style>