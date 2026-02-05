import type { ISankeyChartSpec } from '@visactor/vchart';
import type { SankeyData } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 桑基图 - 创建 Spec（工厂函数模式）
 *
 * 🎨 可修改项：
 * - node / link: 透明度、样式
 * - label: 字体颜色
 *
 * 数据结构（与 mock / types 保持一致）：
 * {
 *   nodes: [{ nodeName: string }],
 *   links: [{ source: number; target: number; value: number }]
 * }
 */
export function createSankeySpec(
  data: SankeyData,
  isDark = false
): ISankeyChartSpec {
  return {
    type: 'sankey',

    data: [
      {
        id: 'data',
        values: [data],
      },
    ],

    categoryField: 'nodeName',
    valueField: 'value',
    sourceField: 'source',
    targetField: 'target',

    node: {
      style: {
        fillOpacity: 0.9,
      },
    },

    link: {
      style: {
        fillOpacity: 0.3,
      },
    },

    label: {
      visible: true,
      style: {
        fill: getChartTextColor(isDark),
      },
    },
  };
}

