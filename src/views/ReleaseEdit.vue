<template>
	<div class="mx-auto max-w-2xl p-5">

<!--		<router-link to="/">&lt;- {{ $t('actions.goBack') }}</router-link>-->
		<VHeading>{{ $t('views.release.' + (create ? 'creatingHeading' : 'editingHeading'))  }}</VHeading>

    <HorizontalLine />

    <AppAlert v-show="hasUnsavedChanges">
      <b class="font-medium">You have unsaved changes.</b> Make sure you save them
    </AppAlert>

    <div class="space-y-5" @change="this.hasUnsavedChanges = true">

      <section>
        <h2 class="mb-2 tracking-wider text-sm font-semibold uppercase">Basic info</h2>

        <div class="flex">
          <ReleaseCover
            :src="form.cover.url"
            class="w-2/5 pr-5"
            @change="onCoverFileChanged"
            @image-loaded="onImageLoaded"
          />
          <div class="editor__form space-y-2">
            <v-input
              v-model="release.title"
              label="Title"
              class="w-full"
              placeholder="High Hopes? Ocean Drive?"
            />
            <AppSelect
              v-model.number="release.artist.id"
              class="w-full"
              label="Artist"
              :options="artists"
              value-key="id"
              name-key="name"
            />

            <div class="space-y-1">
              <h2 class="text-xs">Other artists</h2>

              <div v-for="artist in form.artists" class="grid grid-cols-[4fr_3fr] gap-1">
                <AppSelect
                  v-model.number="artist.id"
                  :options="artists"
                  class="w-full"
                  value-key="id"
                  name-key="name"
                />

                <AppSelect
                  v-model.number="artist.role"
                  :options="artistRoles"
                  class="w-full"
                  value-key="id"
                  name-key="name"
                />
              </div>

              <div>
                <VButton theme="blue" size="xs" rounded="sm" @click="addFeaturingArtist">&plus; Add artist</VButton>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AppCheckbox label="Active" />
        </div>
      </section>

      <hr>

      <section>
        <h2 class="mb-2 tracking-wider text-sm font-semibold uppercase">Platforms</h2>

        <div class="space-y-2">
          <div v-for="(service, key) in release.platforms" :key="service.id" class="flex items-center space-x-2">
            <img :src="getPlatformIcon(service.id)" class="text-xs w-5" :alt="service.name">
            <AppSelect
              v-model.number="service.id"
              :options="platforms"
              value-key="id"
              name-key="name"
            />
            <VInput v-model="service.url" :placeholder="placeholders[service.id] || 'URL'" class="grow" />
            <VButton theme="red" size="xs" rounded="sm" @click="removePlatform($event, key)">&times;</VButton>
          </div>
          <div>
            <VButton theme="blue" size="xs" rounded="sm" @click="addPlatform">&plus; Add platform</VButton>
          </div>
        </div>


      </section>
    </div>

		<hr class="my-3">

    <template v-if="publicLink">
      <p class="text-sm">
        {{ $t('views.release.publicLink') }}: <a :href="publicLink" target="_blank" class="font-medium text-blue-600">{{ publicLink }}</a>
      </p>

      <hr class="my-3">
    </template>

    <div class="grid grid-cols-2 gap-1">
      <v-button class="btn btn-primary px-4 me-3" theme="blue" @click.native="save">
        {{ create ? 'Submit' : 'Save' }}
      </v-button>
      <v-button v-if="!create" theme="red">Delete</v-button>
    </div>

    <AppBackdrop v-show="isCropping">
      <AppCropper
        ref="cropper"
        @crop="onCrop"
      />
    </AppBackdrop>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

  import AppBackdrop from '@/components/AppBackdrop.vue'
  import AppCheckbox from '@/components/AppCheckbox.vue'
  import AppCropper from '@/components/AppCropper.vue'
  import VButton from '@/components/VButton.vue'
	import ReleaseCover from '@/components/Release/ReleaseCover.vue'
	import VHeading from '@/components/VHeading.vue'
	import VInput from '@/components/VInput.vue'
  import {createRelease, getRelease, updateRelease} from "@/service/ReleaseService";
  import {getArtists} from "@/service/ArtistService";
  import AppSelect from "@/components/AppSelect.vue";
  import {createStorageItem} from "@/service/StorageService";
  import AppAlert from "@/components/AppAlert.vue";
  import HorizontalLine from "@/components/HorizontalLine.vue";

	export default {
		components: {
      HorizontalLine,
      AppAlert,
      AppSelect,
      AppBackdrop,
			AppCheckbox,
      AppCropper,
      VButton,
      VHeading,
      VInput,
      ReleaseCover
		},
		data() {
			return {
        releaseId: null,
        form: {
          artist: '',
          artists: [],
          cover: {
            id: null,
            url: null
          }
        },
        artists: [],
        artistRoles: [
          {
            id: 1,
            name: 'Featuring artist'
          }
        ],
        isCropping: false,
        hasUnsavedChanges: false,
				fetching: false,
				create: false,
				release: {
          artist: {
            id: null
          },
				  thumbnail: 'https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=6&m=1222357475&s=612x612&w=0&h=p8Qv0TLeMRxaES5FNfb09jK3QkJrttINH2ogIBXZg-c=',
					platforms: []
				},
				placeholders: {
					vk: 'Playlist URL: vk.com/playlist12345',
					boom: 'URL',
					instagram: 'Profile to follow: instagram.com/durov'
				}
			}
		},
		computed: {/*
      artistName: {
        get() {
          return this.artists.find(artist => artist.id === this.release.artist.id);
        },
        set(v) {

        }
      },*/
      publicLink() {
        return this.release.link;
      },
			...mapState(['platforms'])
		},
    created() {
      console.log('Route params:', this.$route.params);
      const releaseId = this.$route.params.id;

      if (!this.platforms.length) {
        this.$store.dispatch('fetchPlatforms');
      }

      getArtists().then(artists => this.artists = artists);

      if (releaseId === undefined) {
        this.create = true;
        return;
      }

      this.releaseId = releaseId;

			// if (this.$route.meta.release) {
			// 	this.release = this.$route.meta.release;
			// } else {
        getRelease(releaseId)
					.then(release => {
            console.log(release);
            this.release = release;
            this.form.artists = release.artists.map(artist => ({ id: artist.id, role: artist.role.id }));
            this.form.cover.url = release.cover;
          })
					.catch(e => {
            // this.$router.push('/');
					});
			// }
		},
		mounted() {
			this.$store.state.transition = 'slide-fade';
      window.onbeforeunload = () => this.hasUnsavedChanges ? 'You have unsaved changes' : null;
		},
    unmounted() {
      window.onbeforeunload = null;
    },
    beforeRouteEnter(to, from, next) {
      next()
			// if (to.params.id === undefined) return next(vm => {
			// 	vm.create = true;
			// });
			// if (to.params.id < 1) return next('/');
		},
		methods: {
      addFeaturingArtist() {
        this.form.artists.push({
          id: null,
          role: null
        });
      },
      getPlatformIcon(platformId) {
        // console.log('get icon', platformId)
        return this.platforms.find(p => p.id === platformId)?.icon;
      },
      addPlatform() {
        this.release.platforms.push({
          id: null,
          url: ''
        });
      },
      removePlatform(event, idx) {
        this.release.platforms.splice(idx, 1);
      },
      onCrop() {
        const image = this.$refs.cropper.getCroppedImage();
        this.release.thumbnail = image;
        this.form.cover = image;
        this.isCropping = false;
      },
      onImageLoaded(image) {
        console.log('Image loaded');
        this.$refs.cropper.setSourceImage(image);

        // this.isCropping = true;
      },
      async onCoverFileChanged(event) {
        console.log('Cover file changed');
        const file = event.target.files[0];

        const storageItem = await this.uploadCover(file);
        this.form.cover.id = storageItem.id;
        this.form.cover.url = storageItem.url;
        // this.isCropping = true;
      },
			async save() {
				const data = {
					title: this.release.title,
					artist: this.release.artist.id,
					artists: this.form.artists,
          coverFileId: this.form.cover.id,
					platforms: this.release.platforms
				};
				console.log(JSON.stringify(this.release.platforms));
				console.log(JSON.stringify(data));
				console.log(data);

				if (this.create === true) {
          // await this.uploadCover();
          createRelease(data).then(async response => {
            if (response.status === 201) {
              let release = await response.json();
              console.info('Created release: ', release);
              this.$router.push(`/releases/${release.id}/edit`);
            }
          });
				} else {
					/* let services = [];
					services = this.release.services.map((service, i) => {
						return {
							id: service.id,
							url: service.url
						};
					}); */

					updateRelease(this.releaseId, data).then(response => {
            console.info('Saved');
            this.hasUnsavedChanges = false;
          });

				}
			},
      async uploadCover(file) {
        const fd = new FormData();
        // const file = await this.$refs.cropper.getCroppedImageFile();
        if (file) {
          fd.append('file', file);
          console.log(file);
        }

        const storageItem = await createStorageItem(fd);
        console.log(storageItem);

        return storageItem;
      }
		}
	}
</script>

<style>
	.flex {
		display: flex;
		flex-wrap: wrap;
	}

	.service__icon {
		width: 2rem;
		vertical-align: middle;
		margin-right: .5rem;
	}

	.editor__image-wrapper {
		width: 40% !important;
		padding-right: 1rem;
	}

	.editor__form {
		/*flex-grow: 1;*/
		width: 50%;
	}

	@media all and (max-width: 480px) {
		.editor__image-wrapper {
			width: 100% !important;
			padding: 0 0 1rem 0;
		}
	}
</style>
