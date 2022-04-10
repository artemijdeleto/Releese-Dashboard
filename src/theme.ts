const enum Themes {
  Dark = 'dark',
  Light = 'light'
}

const LOCAL_STORAGE_THEME_KEY = 'sc.theme';

type Theme = Themes.Dark | Themes.Light;

export const getTheme = (): Theme => {
  const storedPreference = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
  if (storedPreference !== null && [Themes.Dark, Themes.Light].includes(storedPreference)) {
    return storedPreference;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Themes.Dark;
  }

  return Themes.Light;
}

const storePreference = (theme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
}

const applyTheme = (theme: Themes) => {
  if (theme === Themes.Dark) {
    return document.documentElement.classList.add('dark');
  }

  return document.documentElement.classList.remove('dark');
}

export const toggleTheme = () => {
  const theme = getTheme() === Themes.Dark ? Themes.Light : Themes.Dark;
  setTheme(theme);

  return theme;
}

export const setTheme = (theme: Theme) => {
  storePreference(theme);
  applyTheme(theme);
}

export const initialize = () => {
  applyTheme(getTheme());
}
