import React, { useEffect, useMemo } from 'react';
import { VChart } from '@visactor/react-vchart';
import { createCirclePackingSpec } from '@/chart-configs/circlePacking.config';
import { useTheme } from '@/hooks/useTheme';
import type { CirclePackingBubbleDatum } from '@/types/dashboard';

interface CirclePackingChartProps {
  data: CirclePackingBubbleDatum[];
}

const VCHART_OPTIONS = { autoFit: true } as const;

export const CirclePackingChart: React.FC<CirclePackingChartProps> = ({ data }) => {
  const { isDark } = useTheme();

  const spec = useMemo(() => createCirclePackingSpec(data, isDark), [data, isDark]);

  // 懒加载场景：挂载后触发一次 resize，确保 autoFit 立即生效
  useEffect(() => {
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }, []);

  if (!data || data.length === 0) {
    return (
      <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>
        暂无数据
      </div>
    );
  }

  return <VChart spec={spec} style={{ width: '100%', height: '100%' }} options={VCHART_OPTIONS} />;
};

export default CirclePackingChart;
