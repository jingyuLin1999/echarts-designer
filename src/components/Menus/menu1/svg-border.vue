<template>
  <svg :width="menuSize[0]" :height="menuSize[1]" class="svg-border">
    <defs>
      <linearGradient id="borderLineBtn" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color: #37e9fe; stop-opacity: 0.5" />
        <stop offset="40%" style="stop-color: #37e9fe; stop-opacity: 1" />
        <stop offset="80%" style="stop-color: #37e9fe; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #37e9fe; stop-opacity: 1" />
        <!-- 3153D4 -->
      </linearGradient>
    </defs>
    <defs>
      <linearGradient id="bgcolor" x1="0" y1="0" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #204173; stop-opacity: 0.9" />
        <stop offset="100%" style="stop-color: #204173; stop-opacity: 0.9" />
      </linearGradient>
    </defs>
    <polyline
      style="stroke-width: 1.5"
      stroke="url(#borderLineBtn)"
      fill="url(#bgcolor)"
      :points="`${menuSize[0] * 0.07627},1
            ${menuSize[0] * 0.923728},1
            ${menuSize[0] - 2},${menuSize[1] * 0.26371} 
            ${menuSize[0] - 2},${menuSize[1] * 0.73529} 
            ${menuSize[0] * 0.923728},${menuSize[1] - 1} 
            ${menuSize[0] * 0.07627},${menuSize[1] - 1} 
            1,${menuSize[1] * 0.73529} 
            1,${menuSize[1] * 0.26371} 
            ${menuSize[0] * 0.07627},0
            `"
    />
    <defs>
      <linearGradient id="hightlightbtn" x1="0" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color: #398eb2; stop-opacity: 1" />
        <stop offset="40%" style="stop-color: #89D6FA; stop-opacity: 1" />
        <stop offset="80%" style="stop-color: #89D6FA; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #3eb4ce; stop-opacity: 0.4" />
      </linearGradient>
    </defs>
    <ellipse
      :cx="menuSize[0] / 2"
      :cy="1.2"
      :rx="menuSize[0] * 0.3"
      :ry="1.5"
      fill="url(#hightlightbtn)"
      style="stroke-width: 0"
    />
    <polyline
      style="fill: none; stroke-width: 1.2"
      stroke="#53c0f7"
      :points="`4.1,${menuSize[1] * 0.26371} 4,${menuSize[1] * 0.73529}`"
    />
    <polyline
      style="fill: none; stroke-width: 2"
      stroke="#53c0f7"
      :points="`${menuSize[0] - 7},${menuSize[1] * 0.73529} 
      ${menuSize[0] * 0.899},${menuSize[1] - 3} `"
    />
  </svg>
</template>

<script>
export default {
  props: {
    menuSize: { type: Array, default: () => [120, 34] },
  }

}
</script>

<style>
</style>