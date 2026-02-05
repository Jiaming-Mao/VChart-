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
  const screenshotSrc = theme === 'dark' ? '/dark@2x.png' : '/light@2x.png';

  return (
    <div className={styles.page}>
      {/* 放置 2x 截图（请将文件放到 public/page@2x.png） */}
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

