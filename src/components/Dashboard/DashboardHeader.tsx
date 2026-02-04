import React from 'react';
import type { ThemeMode } from '@/contexts/ThemeContext';
import styles from './Dashboard.module.css';

interface DashboardHeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onResetLayout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  theme,
  onToggleTheme,
  onResetLayout,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>数据仪表盘</h1>
        <span className={styles.subTitle}>VChart + 可拖拽布局 + 主题切换</span>
      </div>

      <div className={styles.actions}>
        <button onClick={onResetLayout}>重置布局</button>
        <button onClick={onToggleTheme}>{theme === 'light' ? '深色模式' : '浅色模式'}</button>
      </div>
    </header>
  );
};

