import type { Layout } from 'react-grid-layout';

// 默认布局配置
export const DEFAULT_LAYOUT: Layout = [
  // 画布横向 48 格：上 3 下 2 的经典布局
  { i: 'circlePacking', x: 0, y: 0, w: 16, h: 18, minW: 8, minH: 8 },
  { i: 'waterfall', x: 16, y: 0, w: 16, h: 18, minW: 8, minH: 8 },
  { i: 'rose', x: 32, y: 0, w: 16, h: 18, minW: 8, minH: 8 },
  { i: 'sankey', x: 0, y: 18, w: 24, h: 18, minW: 8, minH: 8 },
  { i: 'treemap', x: 24, y: 18, w: 24, h: 18, minW: 8, minH: 8 },
];

// Grid 配置
export const GRID_CONFIG = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  // 固定画布：始终用 48 列（宽度随容器变化）
  cols: { lg: 48, md: 48, sm: 48, xs: 48, xxs: 48 },
  // 纵向格子高度固定 10px
  rowHeight: 10,
};

