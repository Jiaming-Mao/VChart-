import type { Layout } from 'react-grid-layout';

// 默认布局配置
export const DEFAULT_LAYOUT: Layout = [
  { i: 'circlePacking', x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
  { i: 'waterfall', x: 4, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
  { i: 'rose', x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
  { i: 'sankey', x: 0, y: 4, w: 6, h: 4, minW: 2, minH: 2 },
  { i: 'treemap', x: 6, y: 4, w: 6, h: 4, minW: 2, minH: 2 },
];

// Grid 配置
export const GRID_CONFIG = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 80,
};

