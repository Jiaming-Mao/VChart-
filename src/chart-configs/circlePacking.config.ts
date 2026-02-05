import type { ICirclePackingChartSpec } from '@visactor/vchart';
import type { CirclePackingBubbleDatum } from '@/types/dashboard';
import { getChartTextColor } from '@/vchart/theme';

/**
 * 圆形打包图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
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

    categoryField: 'name',
    valueField: 'value',

    // ============================================
    // [FIXED] 固定样式配置 - AI 不可修改
    // ============================================
    // [FIXED] 气泡间距
    layoutPadding: 5,
    // [FIXED] 入场动画缓动
    animationEnter: {
      easing: 'cubicInOut',
    },
    // [FIXED] 退场动画缓动
    animationExit: {
      easing: 'cubicInOut',
    },
    // [FIXED] 更新动画缓动
    animationUpdate: {
      easing: 'cubicInOut',
    },

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 提示框显示
    tooltip: {
      visible: true,
    },
    // [DEFAULT] 标签样式
    label: {
      style: {
        fontSize: 10,
        fill: getChartTextColor(isDark),
      },
    },
    // [DEFAULT] 钻取交互
    drill: true,
  };
}

// 导出数据结构说明（供参考）
export const dataStructureExample = [
  { name: 'bubble-1', value: 1 },
  { name: 'bubble-2', value: 2 },
];

