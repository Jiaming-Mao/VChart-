import { ThemeManager } from '@visactor/vchart';

/**
 * dataV categorical palette (light/dark same palette)
 * Source: token list provided by product/design.
 */
export const DATAV_CATEGORICAL_TOKENS_14 = [
  { token: '--token-dataV-categorical-1', fallback: '#3370EB' },
  { token: '--token-dataV-categorical-2', fallback: '#1BCEBF' },
  { token: '--token-dataV-categorical-3', fallback: '#FFC60A' },
  { token: '--token-dataV-categorical-4', fallback: '#ED6D0C' },
  { token: '--token-dataV-categorical-5', fallback: '#DCA1E4' },
  { token: '--token-dataV-categorical-6', fallback: '#25B2E5' },
  { token: '--token-dataV-categorical-7', fallback: '#6DCDEB' },
  { token: '--token-dataV-categorical-8', fallback: '#288FCB' },
  { token: '--token-dataV-categorical-9', fallback: '#94B5F5' },
  { token: '--token-dataV-categorical-10', fallback: '#8F61D1' },
  { token: '--token-dataV-categorical-11', fallback: '#BF78E9' },
  { token: '--token-dataV-categorical-12', fallback: '#008280' },
  { token: '--token-dataV-categorical-13', fallback: '#27AD8E' },
  { token: '--token-dataV-categorical-14', fallback: '#7BC335' },
] as const;

let cachedPalette: string[] | null = null;
let cachedThemeKey: string | null = null;

function resolveCssVar(token: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = window.getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return v || fallback;
}

export function getDataVCategoricalPalette14(): string[] {
  const themeKey =
    typeof window === 'undefined' ? 'ssr' : document.documentElement.getAttribute('data-theme') || 'none';

  if (cachedPalette && cachedThemeKey === themeKey) return cachedPalette;

  const palette = DATAV_CATEGORICAL_TOKENS_14.map(({ token, fallback }) => resolveCssVar(token, fallback));
  cachedPalette = palette;
  cachedThemeKey = themeKey;
  return palette;
}

export function getDataVCategoricalColor(index1Based: number): string {
  const idx = Math.max(1, Math.min(14, Math.floor(index1Based))) - 1;
  return getDataVCategoricalPalette14()[idx];
}

/**
 * Register/override VChart built-in `light`/`dark` theme names.
 * Keep override minimal: only inject categorical palette.
 */
export function registerDataVThemes() {
  try {
    const palette = getDataVCategoricalPalette14();
    ThemeManager.registerTheme('light', {
      type: 'light',
      colorScheme: { default: [...palette] },
    });
    ThemeManager.registerTheme('dark', {
      type: 'dark',
      colorScheme: { default: [...palette] },
    });
  } catch {
    // ignore: if ThemeManager API changes or fails, charts still render with defaults
  }
}

