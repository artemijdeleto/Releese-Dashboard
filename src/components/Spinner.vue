<template>
  <svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path dark:stroke-blue-50" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
</template>

<style lang="scss">
@use "sass:math";

$offset: 187;
$duration: 1.4s;

.spinner {
  display: block;
  animation: rotator $duration linear infinite;
  height: 40px;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke: #333447;
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite;
}

@keyframes dash {
  0% { stroke-dashoffset: $offset; }
  50% {
    stroke-dashoffset: math.div($offset, 4);
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform:rotate(450deg);
  }
}
</style>