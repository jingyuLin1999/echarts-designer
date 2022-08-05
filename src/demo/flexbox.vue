<template>
  <div class="flex-box-demo">
    <FlexBoxContainer
      :boxSize="[510, 379]"
      :margin="5"
      @domResize="onDomResize"
    >
      <div class="card">13</div>
      <div class="card">13</div>
      <div class="card">13</div>
      <div class="card">13</div>
      <div class="card">13</div>
    </FlexBoxContainer>
    <div class="test"></div>
  </div>
</template>

<script>
import FlexBoxContainer from "@/components/FlexBoxContainer";
export default {
  components: { FlexBoxContainer },
  methods: {
    onDomResize(arg) {
      let { width, height, disWidth, disHeight } = arg;
      if (disHeight == 0) return;
      console.log("高度改变了", disHeight);
    },
  },
};
</script>

<style lang="scss">
.flex-box-demo {
  width: 100%;
  height: 100%;
  background: #00f;
  .card {
    background: #fff;
    border: 1px solid #f00;
  }
  .test{
    height: 300px;
    background: #f00;
  }
}
</style>