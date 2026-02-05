import { ThemeManager } from '@visactor/vchart';

/**
 * 从 CSS 变量读取颜色值
 * @param varName - CSS 变量名（带 -- 前缀）
 * @param fallback - 回退值（用于 SSR 或变量未定义时）
 */
function resolveCssVar(varName: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || fallback;
}

/**
 * 获取图表文本颜色
 * 
 * 直接根据 isDark 参数返回对应的文本颜色。
 * 
 * 注意：不使用 CSS 变量是因为存在时序问题 —— React 状态更新后子组件
 * 立即重新渲染，但 useEffect 中的 DOM 更新（data-theme 属性）是异步的，
 * 导致 getComputedStyle 读取到的仍是旧主题的 CSS 变量值。
 * 
 * @param isDark - 是否深色模式
 * @returns 当前主题的文本颜色
 */
export function getChartTextColor(isDark: boolean): string {
  // 颜色值与 _generated-light.css / _generated-dark.css 中的 --token-text-title 保持一致
  return isDark ? '#ebebeb' : '#1f2329';
}

/**
 * DataV 图表调色板配置
 * 
 * 颜色定义在 _generated-*.css 中（--token-dataV-categorical-1 到 -14）
 * 这里只保留 fallback 值用于 CSS 变量未加载时
 */
const DATAV_CATEGORICAL_FALLBACKS = [
  '#3370EB', '#1BCEBF', '#FFC60A', '#ED6D0C',
  '#DCA1E4', '#25B2E5', '#6DCDEB', '#288FCB',
  '#94B5F5', '#8F61D1', '#BF78E9', '#008280',
  '#27AD8E', '#7BC335',
] as const;

let cachedPalette: string[] | null = null;
let cachedThemeKey: string | null = null;

/**
 * 获取 DataV 14 色调色板
 * 
 * 从 CSS 变量读取颜色，支持主题切换时自动更新缓存。
 */
export function getDataVCategoricalPalette14(): string[] {
  const themeKey =
    typeof window === 'undefined' ? 'ssr' : document.documentElement.getAttribute('data-theme') || 'none';

  if (cachedPalette && cachedThemeKey === themeKey) return cachedPalette;

  const palette = DATAV_CATEGORICAL_FALLBACKS.map((fallback, idx) => 
    resolveCssVar(`--token-dataV-categorical-${idx + 1}`, fallback)
  );
  cachedPalette = palette;
  cachedThemeKey = themeKey;
  return palette;
}

/**
 * 获取 DataV 调色板中的单个颜色
 * @param index1Based - 1-14 的颜色索引
 */
export function getDataVCategoricalColor(index1Based: number): string {
  const idx = Math.max(1, Math.min(14, Math.floor(index1Based))) - 1;
  return getDataVCategoricalPalette14()[idx];
}

/**
 * 注册 VChart 主题
 * 
 * 覆盖 VChart 内置的 light/dark 主题：
 * - 注入 DataV 调色板
 * - 设置透明背景（让图表背景跟随卡片颜色）
 */
export function registerDataVThemes() {
  try {
    const palette = getDataVCategoricalPalette14();
    ThemeManager.registerTheme('light', {
      type: 'light',
      background: 'transparent',
      colorScheme: { default: [...palette] },
    });
    ThemeManager.registerTheme('dark', {
      type: 'dark',
      background: 'transparent',
      colorScheme: { default: [...palette] },
    });
  } catch {
    // ignore: if ThemeManager API changes or fails, charts still render with defaults
  }
}
