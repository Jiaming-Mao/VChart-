import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Layout } from 'react-grid-layout';

// ⚠️ 布局结构变化时升级版本号
const LAYOUT_VERSION = 'v2';
const STORAGE_KEY = `dashboard-layout-${LAYOUT_VERSION}`;

export function useLayoutPersist(defaultLayout: Layout) {
  const stableDefault = useMemo(() => defaultLayout, [defaultLayout]);

  const [layout, setLayout] = useState<Layout>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Layout) : stableDefault;
    } catch {
      return stableDefault;
    }
  });

  const handleLayoutChange = useCallback((newLayout: Layout) => {
    setLayout(newLayout);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
    } catch {
      // ignore
    }
  }, []);

  const resetLayout = useCallback(() => {
    setLayout(stableDefault);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [stableDefault]);

  // defaultLayout 改变时，保持一致（通常不会变）
  useEffect(() => {
    // no-op: only keep for future extension
  }, [stableDefault]);

  return { layout, handleLayoutChange, resetLayout };
}

