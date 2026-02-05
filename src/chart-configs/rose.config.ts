import type { IRoseChartSpec } from '@visactor/vchart';
import type { RoseDatum } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 玫瑰图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createRoseSpec(data: RoseDatum[], isDark = false): IRoseChartSpec {
  return {
    type: 'rose',

    data: [{ id: 'data', values: data }],

    categoryField: 'category',
    valueField: 'value',
    seriesField: 'category',

    // ============================================
    // [FIXED] 固定样式配置 - AI 不可修改
    // ============================================
    // （当前无固定样式配置）

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 外半径
    outerRadius: 0.75,
    // [DEFAULT] 内半径
    innerRadius: 0,
    // [DEFAULT] 标签配置
    label: {
      visible: true,
      position: 'outside',
      style: {
        fill: getChartTextColor(isDark),
      },
    },
    // [DEFAULT] 图例配置
    legends: {
      visible: true,
      orient: 'right',
    },
  };
}

