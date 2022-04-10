<template>
  <div
    :class="
      `before:block before:opacity-60 before:bg-black before:absolute before:w-full before:h-full
      relative overflow-hidden text-gray-50 bg-gray-800 bg-no-repeat bg-cover bg-center`
    "
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ backgroundUrl: string }>();
</script>
