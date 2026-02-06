import type { ISankeyChartSpec } from '@visactor/vchart';
import type { SankeyData } from '@/types/dashboard';
import { TOKEN_COLORS, getDataVCategoricalPalette14 } from '@/vchart/theme';

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
  const t = TOKEN_COLORS[isDark ? 'dark' : 'light'];
  // DataV 14 色调色板，用于 link 渐变
  const palette = getDataVCategoricalPalette14();

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
    // [FIXED] 节点样式
    nodeWidth: 8,
    node: {
      style: {
        fillOpacity: 1.0,
        // [DEFAULT] 节点圆角
        cornerRadius: 2,
        
      },
    },
    // [FIXED] 连接线样式
    link: {
      style: {
        fillOpacity: 0.15,
        // [DEFAULT] 连接线渐变填充（从源节点颜色到目标节点颜色）
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fill: ((datum: any) => {
          // 获取源节点和目标节点在调色板中的颜色
          const sourceIndex = typeof datum.source === 'number' ? datum.source : 0;
          const targetIndex = typeof datum.target === 'number' ? datum.target : 0;
          const sourceColor = palette[sourceIndex % palette.length];
          const targetColor = palette[targetIndex % palette.length];
          return {
            gradient: 'linear',
            x0: 0,
            y0: 0.5,
            x1: 1,
            y1: 0.5,
            stops: [
              { offset: 0, color: sourceColor },
              { offset: 1, color: targetColor },
            ],
          };
        }) as any,
      },
    },

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 标签配置
    label: {
      visible: true,
      // [DEFAULT] 标签距离节点距离
      offset: 8,
      style: {
        fill: t['text/caption'],
        // [DEFAULT] 标签字号
        fontSize: 12,
      },
    },

    // ============================================
    // Tooltip 配置
    // ============================================
    tooltip: {
      // [DEFAULT] 显示提示框
      visible: true,

      // ============================================
      // [FIXED] 提示框固定样式 - AI 不可修改
      // ============================================
      style: {
        panel: {
          // [FIXED] 背景色 - token: bg/float
          backgroundColor: t['bg/float'],
          // [FIXED] 边框
          border: {
            color: t['border/card'],
            width: 0.5,
            radius: 10,
          },
          // [FIXED] 阴影
          shadow: {
            x: 0,
            y: 4,
            blur: 20,
            spread: 0,
            color: t['shadow/n900-5pct'],
          },
          // [FIXED] 内边距
          padding: 12,
        },
        // [FIXED] 标题标签样式
        titleLabel: {
          fontSize: 12,
          fontWeight: 'bold',
          fill: t['text/caption'],
        },
        // [FIXED] 键名标签样式
        keyLabel: {
          fontSize: 12,
          fill: t['text/caption'],
        },
        // [FIXED] 值标签样式
        valueLabel: {
          fontSize: 12,
          fontWeight: 'bold',
          fill: t['text/title'],
        },
        // [FIXED] 形状样式
        shape: {
          size: 8,
          shapeType: 'circle',
        },
        // [FIXED] 行间距
        spaceRow: 6,
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

