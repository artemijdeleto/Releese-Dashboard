<template>
	<div class="mx-auto max-w-2xl p-5">
		<VHeading>{{ $t('views.releases.heading') }}</VHeading>

    <HorizontalLine />

		<div>
			<router-link to="/releases/add" class="inline-block bg-blue-600 text-white shadow font-semibold rounded text-sm p-2 px-4">
				{{ $t('views.releases.createNew') }}
      </router-link>
		</div>

    <HorizontalLine />

		<div v-if="releases[0]" class="flex-container">
			<div class="release" v-for="release in releases">
				<a
					class="release__image-link"
					:href="release.link"
					target="_blank"
				>
					<img :src="release.cover || '/assets/img/no-photo.png'" class="release__image">
				</a>
				<div class="release__info">
					<p class="font-medium">{{ release.title }}</p>
					<p class="text-sm">{{ release.artist.name }}</p>
					<div class="release__buttons mt-2">
						<router-link
							:to="'/releases/' + release.id + '/stats'"
							class="px-3 py-1 text-sm border rounded-sm mr-2"
						>
							Stats
						</router-link>
						<a
							@click.prevent="animate(release, $event)"
							:href="'/releases/' + release.id + '/edit'"
							class="px-3 py-1 text-sm border rounded-sm"
						>
							Edit
						</a>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p>No releases</p>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import axios from "axios";
  import VHeading from "@/components/VHeading.vue";
  import HorizontalLine from "@/components/HorizontalLine.vue";

	export default {
    components: {VHeading, HorizontalLine},
    data() {
			return {
				// releases: []
			}
		},
		computed: {
			...mapState(['user', 'releases'])
		},
		created() {
		  this.$store.dispatch('fetchReleases');
		  // this.$store.state.releases
			// axios(`/user/${this.user.id}/releases`).then(({ data }) => {
      //   this.releases = data;
      // })
		},
		beforeRouteLeave(to, from, next) {
			console.log(this.release);
			to.meta.release = this.release;
			next();
		},
		methods: {
			animate(release, e) {
				const item = e.target.parentNode.parentNode.parentNode;
				this.release = release;
				// this.$store.state.transition = 'fade';
				this.$router.push(`/releases/${release.id}/edit`);
				// item.classList.add('show');
				// item.style.top = -item.offsetTop + 53 + 'px';
				// e.target.parentNode.parentNode.previousSibling.classList.remove('release__image-link');
				// e.target.parentNode.parentNode.previousSibling.classList.add('editor__image-wrapper');
			}
		}
	}
</script>

<style lang="scss">
	.release__buttons {
		display: flex;
		justify-content: space-between;

		.btn {
			width: 100%;
		}
	}

	.release {
		display: flex;
		flex-wrap: wrap;
		/*width: 50%;*/
		/*padding: 0 1rem 2rem 0;*/
		margin-bottom: 2rem;
	}

	.release__image {
		// width: 15%;
		width: 100%;
		/*flex-grow: 1;*/
		//align-self: flex-start;
		//margin-right: 1rem;
		border-radius: 4px;
	}

	.release__image-link {
		align-self: flex-start;
		margin-right: 1rem;
		width: 20%;
	}

	.release__info {
		flex-grow: 2;
	}
</style>
