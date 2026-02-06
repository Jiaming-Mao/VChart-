import type { WaterfallDatum } from '@/types/dashboard';

/**
 * 瀑布图数据 - 来自「AI Block 效果评测 P&L 损益分析」
 * 阶段/变化项 → category，类型 初始值/减少 → value（减少为负），中间值/最终值 → total: true
 */
export const waterfallData: WaterfallDatum[] = [
  { category: '总收入', value: 5000 },
  { category: '销售成本', value: -1800 },
  { category: '毛利润', value: 3200, total: true },
  { category: '运营费用 - 销售', value: -750 },
  { category: '运营费用 - 研发', value: -900 },
  { category: '运营费用 - 管理', value: -550 },
  { category: '运营利润', value: 1000, total: true },
];
