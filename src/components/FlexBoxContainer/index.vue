<template>
  <div
    class="flex-box-container"
    :width="`${width}px`"
    :style="{ '--margin': margin + 'px', height: `${height}px` }"
  >
    <div :ref="ref" class="box-container" :width="`${width}px`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils";
export default {
  name: "flexBoxComponent",
  props: {
    boxSize: { type: Array, default: () => [384, 210] }, // 单位px
    margin: { type: Number, default: 5 }, // 盒子的间距
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.childrenEl = this.$refs.flexBoxContainer.children;
        this.onResize();
      });
    },
    onResize() {
      const { $refs, ref, margin, boxSize, childrenEl } = this;
      const dom = $refs[ref];

      let newWidth = dom ? dom.clientWidth : 0;
      this.disWidth = newWidth - this.width;
      this.width = newWidth;

      let [boxW, boxH] = boxSize;
      let realyCount = childrenEl.length;
      let rowBoxCount = Math.floor((this.width + margin) / (boxW + margin));
      rowBoxCount = Math.min(rowBoxCount, realyCount) || 1;
      let calcuBoxW = (this.width + margin) / rowBoxCount - margin;
      calcuBoxW = parseInt(Math.max(calcuBoxW, boxW));
      let rows = Math.ceil(realyCount / rowBoxCount);

      let newHeight = (rows - 1) * margin + rows * boxH;
      this.disHeight = newHeight - this.height;
      this.height = newHeight;

      childrenEl.forEach((element, index) => {
        let marginRight = (index + 1) % rowBoxCount ? margin : 0;
        let marginBottom = index + 1 > (rows - 1) * rowBoxCount ? 0 : margin;
        element.setAttribute(
          "style",
          `width:${calcuBoxW}px;
            height:${boxH}px;
            margin-right:${marginRight}px;
            margin-bottom:${marginBottom}px;
          `
        );
      });

      if (this.disHeight == boxH) return;
      this.$emit("domResize", {
        width: this.width,
        height: this.height,
        disWidth: this.disWidth,
        disHeight: this.disHeight,
      });
    },
    _resizeHandler() {
      this.debounceFunc();
    },
  },
  beforeMount() {
    window.addEventListener("resize", this._resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this._resizeHandler);
  },
  data() {
    return {
      ref: "flexBoxContainer",

      width: 0,

      height: 0,

      disHeight: 0,

      disWidth: 0,

      childrenEl: null,

      debounceFunc: debounce(80, this.onResize),
    };
  },
};
</script>

<style lang="scss">
.flex-box-container {
  height: 20px;
  overflow: hidden;
  .box-container {
    display: flex;
    flex-wrap: wrap;
    > * {
      box-sizing: border-box;
      margin-bottom: var(--margin);
    }
  }
}
</style>