<template>
  <svg width="100%" height="100%" style="background-color: transparent">
    <!-- 定义渐变颜色 -->
    <defs>
      <linearGradient id="linear"  x1="100%" y1="50%" x2="0" y2="50%">
        <stop offset="0" stop-color="rgba(83,157,252,1)"></stop>
        <stop offset="50%" stop-color="rgba(83,157,252,1)"></stop>
        <stop offset="100%" stop-color="rgba(134,251,243,0.65)"></stop>
      </linearGradient>
    </defs>
    <!-- 背景圆圈进度条 -->
    <circle  cx="50%" cy="50%" r="50%" fill="transparent" class="progress-background"/>
    <!-- 实际显示进度条 -->
    <circle
        class="progress-bar"
        r="50%"
        cx="50%"
        cy="50%"
        stroke="url('#linear')"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="percentage"
    ></circle>
    <circle  cx="50%" cy="5%" r="5%" fill="rgba(83,157,252,1)"/>
  </svg>
</template>

<script>
export default {
  name: "bubble",
  props: {
    dashArray: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  stroke-width: 0.4vw;
  transform-origin: center;
  &.progress-background {
    transform: scale(0.9);
    stroke: rgba(94, 150, 221, .45);
  }
  &.progress-bar {
    stroke-linecap: round;
    transform: scale(0.9) rotate(-90deg);
  }
}
</style>