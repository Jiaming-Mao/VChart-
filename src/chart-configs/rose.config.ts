import type { IRoseChartSpec } from '@visactor/vchart';
import type { RoseDatum } from '@/types/dashboard';

/**
 * 玫瑰图 - 创建 Spec（工厂函数模式）
 *
 * 🎨 可修改项：
 * - color: 调色板（验收：修改这里无需改组件代码）
 * - outerRadius: 预留空间防止 Label 溢出
 * - label / legends: 标签与图例样式
 */
export function createRoseSpec(data: RoseDatum[], isDark = false): IRoseChartSpec {
  return {
    type: 'rose',

    data: [{ id: 'data', values: data }],

    categoryField: 'category',
    valueField: 'value',
    seriesField: 'category',

    outerRadius: 0.75,
    innerRadius: 0,

    label: {
      visible: true,
      position: 'outside',
      style: {
        fill: isDark ? '#eee' : '#333',
      },
    },

    legends: {
      visible: true,
      orient: 'right',
    },
  };
}

