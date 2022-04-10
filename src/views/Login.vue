<template>
  <div class="container mx-auto p-5 max-w-sm text-neutral-700 dark:text-neutral-200">
    <h1 class="font-bold leading-none tracking-tighter text-2xl">
      Releese
    </h1>

    <HorizontalLine />

    <p class="font-medium tracking-tight text-lg">
      {{ $t('views.enter.annotation') }}
    </p>

    <HorizontalLine />

    <a
      :href="oauthLoginUrl"
      class="inline-block shadow py-3 px-5 rounded leading-none bg-blue-600 text-white font-bold tracking-tighter"
    >
      {{ $t('views.enter.button') }}
    </a>
  </div>
</template>

<script setup>
import HorizontalLine from "@/components/HorizontalLine.vue";

const oauthLoginUrl = import.meta.env.VITE_APP_OAUTH_URL;
</script>
