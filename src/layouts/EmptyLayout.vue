<template>
  <transition name="slide-fade" mode="out-in">
    <slot>
      <div class="mx-auto flex min-h-screen items-center">
        <Spinner />
      </div>
    </slot>
  </transition>
</template>

<script setup>
import Spinner from "@/components/Spinner.vue";
</script>
