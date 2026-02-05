import type { ITreemapChartSpec } from '@visactor/vchart';
import type { TreemapNode } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 矩形树图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createTreemapSpec(data: TreemapNode[], isDark = false): ITreemapChartSpec {
  return {
    type: 'treemap',

    data: [{ id: 'data', values: data }],

    categoryField: 'name',
    valueField: 'value',
    drillField: 'name',

    // ============================================
    // [FIXED] 固定样式配置 - AI 不可修改
    // ============================================
    // （当前无固定样式配置）

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 标签配置
    label: {
      visible: true,
      smartInvert: true,
      style: {
        fontSize: 12,
        fill: getChartTextColor(isDark),
      },
    },
    // [DEFAULT] 钻取交互
    drill: true,
    // [DEFAULT] 非叶节点显示
    nonLeaf: {
      visible: false,
    },
  };
}

