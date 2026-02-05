import type { ICirclePackingChartSpec } from '@visactor/vchart';
import type { CirclePackingBubbleDatum } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 圆形打包图 - 创建 Spec（工厂函数模式）
 *
 * 🎨 可修改项：
 * - color: 调色板
 * - label: 标签样式
 * - layoutPadding: 气泡间距
 */
export function createCirclePackingSpec(
  data: CirclePackingBubbleDatum[],
  isDark = false
): ICirclePackingChartSpec {
  return {
    type: 'circlePacking',

    data: [
      {
        id: 'data',
        values: data,
      },
    ],

    // 参考官方 demo：气泡图使用一维数组数据（不要用树）
    // 气泡间距（series 层字段，但 demo 支持写在 chart spec 上）
    layoutPadding: 5,

    tooltip: {
      visible: true,
    },

    // label 配置（先保证渲染稳定；需要按层级控制显示再加 visible 回调）
    label: {
      style: {
        fontSize: 10,
        fill: getChartTextColor(isDark),
      },
    },

    // 层级配置
    categoryField: 'name',
    valueField: 'value',

    // 钻取交互（可选）
    drill: true,

    animationEnter: {
      easing: 'cubicInOut',
    },
    animationExit: {
      easing: 'cubicInOut',
    },
    animationUpdate: {
      easing: 'cubicInOut',
    },
  };
}

// 导出数据结构说明（供参考）
export const dataStructureExample = [
  { name: 'bubble-1', value: 1 },
  { name: 'bubble-2', value: 2 },
];

