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
    // [FIXED] 图表内边距
    padding: {
      top: 0,
      right: 20,
      bottom: 20,
      left: 20,
    },

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
    // ============================================
    // 图例配置
    // ============================================
    legends: {
      // [DEFAULT] 图例显示
      visible: true,
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

