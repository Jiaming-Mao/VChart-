/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeManager } from '@visactor/vchart';
import { registerDataVThemes } from '@/vchart/theme';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (next: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'dashboard-theme';

function readInitialTheme(): ThemeMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => readInitialTheme());

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isDark = theme === 'dark';

  // 同步更新 VChart 全局主题 + DOM（CSS 变量）
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      // Ensure palette is registered after DOM theme is applied
      registerDataVThemes();
      ThemeManager.setCurrentTheme(theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark, toggleTheme, setTheme }),
    [theme, isDark, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

