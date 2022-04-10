<template>
  <router-view v-slot="{ Component }">
    <component :is="layout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

export default defineComponent({
  components: {
    DefaultLayout,
    EmptyLayout
  },
  mounted() {
    setTimeout(() => document.body.style.opacity = '1', 100);
  },
  computed: {
    layout(): string {
      return (this.$route.meta as any).layout || 'DefaultLayout';
    }
  }
});
</script>
