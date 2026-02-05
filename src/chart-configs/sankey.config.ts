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
): ISankeyChartSpec & { padding?: { top?: number; right?: number; bottom?: number; left?: number } } {
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
    // [FIXED] 图表内边距
    padding: {
      top: 0,
      right: 20,
      bottom: 20,
      left: 20,
    },
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

