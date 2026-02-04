import React, { useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import type { Layout } from 'react-grid-layout/legacy';

import { ChartCard } from '@/components/ChartCard';
import { GRID_CONFIG } from '@/constants/layout';

// 按需加载图表组件（符合方案 v2.0“动态导入”建议，也可减少首屏 bundle）
const CirclePackingChart = React.lazy(() => import('@/components/charts/CirclePackingChart'));
const WaterfallChart = React.lazy(() => import('@/components/charts/WaterfallChart'));
const RoseChart = React.lazy(() => import('@/components/charts/RoseChart'));
const SankeyChart = React.lazy(() => import('@/components/charts/SankeyChart'));
const TreemapChart = React.lazy(() => import('@/components/charts/TreemapChart'));

import { circlePackingData } from '@/mock-data/circlePacking.data';
import { waterfallData } from '@/mock-data/waterfall.data';
import { roseData } from '@/mock-data/rose.data';
import { sankeyData } from '@/mock-data/sankey.data';
import { treemapData } from '@/mock-data/treemap.data';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './Dashboard.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  layout: Layout;
  onLayoutChange: (next: Layout) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ layout, onLayoutChange }) => {
  const dispatchResize = useCallback(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <ResponsiveGridLayout
      className={styles.grid}
      layouts={{ lg: layout }}
      breakpoints={GRID_CONFIG.breakpoints}
      cols={GRID_CONFIG.cols}
      rowHeight={GRID_CONFIG.rowHeight}
      draggableHandle=".drag-handle"
      onLayoutChange={(currentLayout: Layout) => onLayoutChange(currentLayout)}
      onDragStop={dispatchResize}
      onResizeStop={dispatchResize}
      useCSSTransforms
    >
      <div key="circlePacking">
        <ChartCard title="圆形打包图">
          <CirclePackingChart data={circlePackingData} />
        </ChartCard>
      </div>

      <div key="waterfall">
        <ChartCard title="瀑布图">
          <WaterfallChart data={waterfallData} />
        </ChartCard>
      </div>

      <div key="rose">
        <ChartCard title="玫瑰图">
          <RoseChart data={roseData} />
        </ChartCard>
      </div>

      <div key="sankey">
        <ChartCard title="桑基图">
          <SankeyChart data={sankeyData} />
        </ChartCard>
      </div>

      <div key="treemap">
        <ChartCard title="矩形树图">
          <TreemapChart data={treemapData} />
        </ChartCard>
      </div>
    </ResponsiveGridLayout>
  );
};

