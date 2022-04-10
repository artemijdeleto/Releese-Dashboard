<template>
  <div class="grid grid-cols-[300px_minmax(900px,_1fr)] h-screen">
    <VSidebar class="h-full overflow-auto"></VSidebar>

    <div class="h-full flex-grow overflow-auto">
      <transition name="slide-fade" mode="out-in">
        <slot>
          <div class="mx-auto flex min-h-screen justify-center items-center">
            <Spinner />
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script setup>
import VSidebar from '@/components/TheSidebar.vue';
import Spinner from "@/components/Spinner.vue";
</script>
