import { ThemeManager } from '@visactor/vchart';

// ============================================
// Token 颜色常量（与 CSS 变量保持同步）
// ============================================
export const TOKEN_COLORS = {
  light: {
    // 语义色
    'text/title': '#1f2329',
    'text/caption': '#646a73',
    'bg/float': '#ffffff',
    'border/card': '#dee0e3',
    'shadow/n900-5pct': 'rgba(31, 35, 41, 0.05)',
    // DataV 14 色调色板
    'dataV/categorical/1': '#3370EB',
    'dataV/categorical/2': '#1BCEBF',
    'dataV/categorical/3': '#FFC60A',
    'dataV/categorical/4': '#ED6D0C',
    'dataV/categorical/5': '#DCA1E4',
    'dataV/categorical/6': '#25B2E5',
    'dataV/categorical/7': '#6DCDEB',
    'dataV/categorical/8': '#288FCB',
    'dataV/categorical/9': '#94B5F5',
    'dataV/categorical/10': '#8F61D1',
    'dataV/categorical/11': '#BF78E9',
    'dataV/categorical/12': '#008280',
    'dataV/categorical/13': '#27AD8E',
    'dataV/categorical/14': '#7BC335',
  },
  dark: {
    // 语义色
    'text/title': '#ebebeb',
    'text/caption': '#a6a6a6',
    'bg/float': '#292929',
    'border/card': 'rgba(235, 235, 235, 0.15)',
    'shadow/n900-5pct': 'rgba(235, 235, 235, 0.05)',
    // DataV 14 色调色板（深色模式下相同）
    'dataV/categorical/1': '#3370EB',
    'dataV/categorical/2': '#1BCEBF',
    'dataV/categorical/3': '#FFC60A',
    'dataV/categorical/4': '#ED6D0C',
    'dataV/categorical/5': '#DCA1E4',
    'dataV/categorical/6': '#25B2E5',
    'dataV/categorical/7': '#6DCDEB',
    'dataV/categorical/8': '#288FCB',
    'dataV/categorical/9': '#94B5F5',
    'dataV/categorical/10': '#8F61D1',
    'dataV/categorical/11': '#BF78E9',
    'dataV/categorical/12': '#008280',
    'dataV/categorical/13': '#27AD8E',
    'dataV/categorical/14': '#7BC335',
  },
} as const;

export type TokenColorKey = keyof typeof TOKEN_COLORS.light;

// ============================================
// 废弃函数（保留向后兼容，建议使用 TOKEN_COLORS）
// ============================================

/**
 * 获取图表文本颜色
 *
 * @deprecated 请使用 `TOKEN_COLORS[isDark ? 'dark' : 'light']['text/title']` 代替
 * @param isDark - 是否深色模式
 * @returns 当前主题的文本颜色
 */
export function getChartTextColor(isDark: boolean): string {
  return TOKEN_COLORS[isDark ? 'dark' : 'light']['text/title'];
}

/**
 * 获取 DataV 调色板中的单个颜色
 *
 * @deprecated 请使用 `TOKEN_COLORS[isDark ? 'dark' : 'light']['dataV/categorical/N']` 代替
 * @param index1Based - 1-14 的颜色索引
 */
export function getDataVCategoricalColor(index1Based: number): string {
  const idx = Math.max(1, Math.min(14, Math.floor(index1Based)));
  const key = `dataV/categorical/${idx}` as TokenColorKey;
  return TOKEN_COLORS.light[key]; // DataV 颜色在 light/dark 下相同
}

/**
 * 获取 DataV 14 色调色板数组
 *
 * @deprecated 内部使用，请使用 TOKEN_COLORS 中的 dataV/categorical/* 代替
 */
export function getDataVCategoricalPalette14(): string[] {
  return Array.from({ length: 14 }, (_, i) => {
    const key = `dataV/categorical/${i + 1}` as TokenColorKey;
    return TOKEN_COLORS.light[key];
  });
}

// ============================================
// VChart 主题注册
// ============================================

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
