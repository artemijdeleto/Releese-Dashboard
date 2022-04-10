<template>
  <component :is="tag" class="py-1 px-3 hover:bg-neutral-300 text-sm dark:hover:bg-black/50">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'div'
  }
});
</script>
