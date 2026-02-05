import type { ISankeyChartSpec } from '@visactor/vchart';
import type { SankeyData } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 桑基图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
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

    // ============================================
    // [FIXED] 固定样式配置 - AI 不可修改
    // ============================================
    // [FIXED] 节点透明度
    node: {
      style: {
        fillOpacity: 0.9,
      },
    },
    // [FIXED] 连接线透明度
    link: {
      style: {
        fillOpacity: 0.3,
      },
    },

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 标签配置
    label: {
      visible: true,
      style: {
        fill: getChartTextColor(isDark),
      },
    },
  };
}

