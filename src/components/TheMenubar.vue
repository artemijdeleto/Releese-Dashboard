<template>
	<header
    class="
      sticky w-full left-0 top-0 z-10 shadow-sm
      bg-neutral-200 text-black
      dark:bg-black/50 dark:text-white
    "
  >
		<nav class="flex max-w-7xl mx-auto">
			<div class="flex-grow">
				<template v-if="isLogged">
          <MenubarButton>{{ $t('menubar.file') }}</MenubarButton>
				</template>
				<MenubarButton>{{ $t('menubar.help') }}</MenubarButton>
			</div>

			<div class="text-right">
				<MenubarButton @click="toggleTheme()">
          {{ $t(`theme.${theme}`) }}
        </MenubarButton>
				<MenubarButton @click="toggleLocale()">
					<template v-if="$i18n.locale === 'ru'">
						<svg class="inline h-2.5 mr-2 align-baseline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6">
							<path fill="#fff" d="M0 0h9v3H0z"/>
							<path fill="#d52b1e" d="M0 3h9v3H0z"/>
							<path fill="#0039a6" d="M0 2h9v2H0z"/>
						</svg>
						<span>Русский</span>
					</template>
					<template v-else>
						<svg class="inline h-2.5 mr-2 align-baseline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
							<clipPath id="s">
								<path d="M0,0 v30 h60 v-30 z"/>
							</clipPath>
							<clipPath id="t">
								<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
							</clipPath>
							<g clip-path="url(#s)">
								<path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
								<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
								<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
								<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
								<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
							</g>
						</svg>
						<span>English</span>
					</template>
				</MenubarButton>

				<template v-if="isLogged">
					<MenubarButton>{{ user.username }}</MenubarButton>
				</template>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { setLocale } from '../i18n';
import { getTheme, toggleTheme } from "../theme";
import MenubarButton from './Menubar/MenubarButton.vue';

export default defineComponent({
  components: {
    MenubarButton
  },
  data() {
    return {
      theme: 'light'
    }
  },
  created() {
    this.theme = getTheme();

    if (localStorage.getItem('sc.language') === 'ru') {
      setLocale('ru');
    }
  },
  computed: {
    ...mapGetters(['isLogged', 'user'])
  },
  methods: {
    toggleTheme() {
      this.theme = toggleTheme();
    },
    toggleLocale() {
      setLocale(this.$i18n.locale === 'ru' ? 'en' : 'ru')
        .then(locale => {
          localStorage.setItem('sc.language', locale);
        });
    }
  }
});
</script>
