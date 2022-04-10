import en from './locales/en';
import { createI18n } from "vue-i18n";

const cache = ['en'];
const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en }
});

function apply(locale: string) {
	// @ts-ignore
  i18n.global.locale = locale;

	return locale;
}

export function setLocale(locale: string) {
	if (i18n.global.locale === locale || cache.includes(locale)) {
		return Promise.resolve(apply(locale));
	}

	return import(/* webpackChunkName: "locales/[request]" */ `./locales/${locale}.ts`).then(
		messages => {
			i18n.global.setLocaleMessage(locale, messages.default);
			cache.push(locale);
			return apply(locale);
		}
	)
}

export default i18n;
