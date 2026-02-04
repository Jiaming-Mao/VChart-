import React, { Suspense, useCallback, useMemo, useRef } from 'react';
import { debounce } from 'lodash-es';
import { ChartErrorBoundary } from './ChartErrorBoundary';
import { ChartLoading } from './ChartLoading';
import { useDebouncedResize } from '@/hooks/useDebouncedResize';
import styles from './ChartCard.module.css';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatchResize = useCallback(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  // 额外兜底：卡片尺寸变化时触发一次 resize（配合 autoFit）
  useDebouncedResize(containerRef, dispatchResize, 150);

  // 防抖触发（给外部需要时复用）
  const debouncedResize = useMemo(() => debounce(dispatchResize, 150), [dispatchResize]);

  return (
    <section className={styles.card} onTransitionEnd={() => debouncedResize()}>
      <div className={`${styles.header} drag-handle`} title="拖拽移动">
        <span className={styles.title}>{title}</span>
      </div>

      <div ref={containerRef} className={styles.chartContainer}>
        <ChartErrorBoundary>
          <Suspense fallback={<ChartLoading />}>{children}</Suspense>
        </ChartErrorBoundary>
      </div>
    </section>
  );
};

