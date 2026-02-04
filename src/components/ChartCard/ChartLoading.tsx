import React from 'react';
import styles from './ChartCard.module.css';

export const ChartLoading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <span>加载中...</span>
    </div>
  );
};

