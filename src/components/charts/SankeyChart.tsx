import React, { useEffect, useMemo } from 'react';
import { VChart } from '@visactor/react-vchart';
import { createSankeySpec } from '@/chart-configs/sankey.config';
import { useTheme } from '@/hooks/useTheme';
import type { SankeyData } from '@/types/dashboard';

interface SankeyChartProps {
  data: SankeyData;
}

const VCHART_OPTIONS = { autoFit: true } as const;

export const SankeyChart: React.FC<SankeyChartProps> = ({ data }) => {
  const { isDark } = useTheme();

  const spec = useMemo(() => createSankeySpec(data, isDark), [data, isDark]);

  // 懒加载场景：挂载后触发一次 resize，确保 autoFit 立即生效
  useEffect(() => {
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }, []);

  const isEmpty = !data || !Array.isArray(data.nodes) || data.nodes.length === 0 || !Array.isArray(data.links) || data.links.length === 0;
  if (isEmpty) {
    return (
      <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>
        暂无数据
      </div>
    );
  }

  return <VChart spec={spec} style={{ width: '100%', height: '100%' }} options={VCHART_OPTIONS} />;
};

export default SankeyChart;
