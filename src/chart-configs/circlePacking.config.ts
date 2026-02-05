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
    // [FIXED] 图表内边距
    padding: {
      top: 0,
      right: 20,
      bottom: 20,
      left: 20,
    },
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

    // ============================================
    // 图例配置
    // ============================================
    legends: {
      // [DEFAULT] 图例显示
      visible: false,
      // [DEFAULT] 图例位置 - 居顶
      orient: 'top',
      // [DEFAULT] 图例对齐 - 居左
      position: 'start',

      // ============================================
      // [FIXED] 图例固定样式 - AI 不可修改
      // ============================================
      // [FIXED] 最多一行
      maxRow: 1,
      // [FIXED] 自动分页
      autoPage: true,
      // [FIXED] 图例与图表间距 8
      padding: { bottom: 8 },
      // [FIXED] 图例项配置
      item: {
        shape: {
          // [FIXED] 圆形与文字间距 6
          space: 6,
          style: {
            // [FIXED] 圆形图例
            symbolType: 'circle',
            // [FIXED] 图例圆形大小 8×8 像素
            size: 8,
          },
        },
        // [FIXED] 图例项背景配置 - hover 无背景色
        background: {
          state: {
            selectedHover: { fillOpacity: 0 },
            unSelectedHover: { fillOpacity: 0 },
          },
        },
      },
      // [FIXED] 分页器配置
      pager: {
        // [FIXED] 不显示分页数字
        textStyle: { visible: false },
        // [FIXED] 翻页按钮 - 箭头为上下
        handler: {
          preShape: 'triangleUp',
          nextShape: 'triangleDown',
        },
      },
    },
  };
}

// 导出数据结构说明（供参考）
export const dataStructureExample = [
  { name: 'bubble-1', value: 1 },
  { name: 'bubble-2', value: 2 },
];

