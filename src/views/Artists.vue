<template>
  <div class="mx-auto max-w-4xl p-5">
    <VHeading>{{ $t('headings.artists') }}</VHeading>

    <HorizontalLine />

    <div class="grid grid-cols-3 gap-3">
      <BackgroundContainer
        v-for="artist in artists"
        backgroundUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        class="rounded-xl"
      >
        <div class="relative p-5">
          <h2 class="text-2xl font-extrabold tracking-tight text-shadow-md">{{ artist.name }}</h2>

          <div>
<!--            <VButton theme="blue" size="sm" rounded="xs">-->
<!--              <router-link :to="`/artists/${artist.id}/edit`">Edit</router-link>-->
<!--            </VButton>-->
          </div>
        </div>
      </BackgroundContainer>

      <RouterLink to="/artists/add" custom v-slot="{ navigate }">
        <div class="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-xl" @click="navigate">
          <h2 class="text-2xl font-extrabold tracking-tight">Create new -></h2>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import VHeading from "@/components/VHeading.vue";
import {getConnectedArtists} from "@/service/ArtistService";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VButton from "@/components/VButton.vue";
import BackgroundContainer from "@/components/BackgroundContainer.vue";

export default {
  components: {
    BackgroundContainer,
    VButton,
    VHeading,
    HorizontalLine
  },
  data() {
    return {
      artists: []
    }
  },
  async created() {
    this.artists = await getConnectedArtists();
  },
  methods: {

  }
}
</script>
