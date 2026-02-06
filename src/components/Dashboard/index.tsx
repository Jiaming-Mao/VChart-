import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLayoutPersist } from '@/hooks/useLayoutPersist';
import { DEFAULT_LAYOUT } from '@/constants/layout';
import { DashboardGrid } from './DashboardGrid';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { layout, handleLayoutChange, resetLayout } = useLayoutPersist(DEFAULT_LAYOUT);

  // 背景截图：light / dark
  // 注意：GitHub Pages 会部署在子路径（base）下，使用 BASE_URL 确保资源路径正确
  const screenshotSrc =
    theme === 'dark'
      ? `${import.meta.env.BASE_URL}dark@2x.png`
      : `${import.meta.env.BASE_URL}light@2x.png`;

  return (
    <div className={styles.page}>
      {/* 放置 2x 截图（文件位于 public/ 目录） */}
      <img className={styles.pageScreenshot} src={screenshotSrc} alt="" />

      {/* 右下角图表画布：1516*999，内 padding 20px */}
      <main className={styles.canvas} aria-label="chart-canvas">
        <DashboardGrid layout={layout} onLayoutChange={handleLayoutChange} />

        <div className={styles.canvasActions}>
          <button className={styles.resetBtn} onClick={resetLayout} type="button">
            重置布局
          </button>
          <button className={styles.themeBtn} onClick={toggleTheme} type="button">
            {theme === 'light' ? '深色模式' : '浅色模式'}
          </button>
        </div>
      </main>
    </div>
  );
};

