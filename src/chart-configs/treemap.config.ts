import type { ITreemapChartSpec } from '@visactor/vchart';
import type { TreemapNode } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 矩形树图 - 创建 Spec（工厂函数模式）
 *
 * 🎨 可修改项：
 * - label: 字体大小 / smartInvert
 * - drill: 层级钻取
 */
export function createTreemapSpec(data: TreemapNode[], isDark = false): ITreemapChartSpec {
  return {
    type: 'treemap',

    data: [{ id: 'data', values: data }],

    categoryField: 'name',
    valueField: 'value',

    label: {
      visible: true,
      smartInvert: true,
      style: {
        fontSize: 12,
        fill: getChartTextColor(isDark),
      },
    },

    drill: true,
    drillField: 'name',

    nonLeaf: {
      visible: false,
    },
  };
}

