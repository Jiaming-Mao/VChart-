import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLayoutPersist } from '@/hooks/useLayoutPersist';
import { DEFAULT_LAYOUT } from '@/constants/layout';
import { DashboardHeader } from './DashboardHeader';
import { DashboardGrid } from './DashboardGrid';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { layout, handleLayoutChange, resetLayout } = useLayoutPersist(DEFAULT_LAYOUT);

  return (
    <div className={styles.container} data-theme={theme}>
      <DashboardHeader theme={theme} onToggleTheme={toggleTheme} onResetLayout={resetLayout} />
      <main className={styles.main}>
        <DashboardGrid layout={layout} onLayoutChange={handleLayoutChange} />
      </main>
    </div>
  );
};

