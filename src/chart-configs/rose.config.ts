import type { IRoseChartSpec } from '@visactor/vchart';
import type { RoseDatum } from '@/types/dashboard';
import { TOKEN_COLORS } from '@/vchart/theme';

/**
 * 玫瑰图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createRoseSpec(data: RoseDatum[], isDark = false): IRoseChartSpec {
  const t = TOKEN_COLORS[isDark ? 'dark' : 'light'];

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

    // [DEFAULT] 扇形样式配置
    rose: {
      style: {
        // [DEFAULT] 扇形边框颜色 - 使用背景色让扇形间有间距
        stroke: t['bg/body'],
        // [DEFAULT] 边框宽度 2px
        lineWidth: 2,
      },
      state: {
        // [DEFAULT] hover 状态 - 无变化
        hover: {
          fillOpacity: 1,
        },
      },
    },

    // [DEFAULT] 标签配置（放在 series 内确保生效，玫瑰图不会自动合并顶层 label 到系列）
    series: [
      {
        type: 'rose',
        categoryField: 'category',
        valueField: 'value',
        label: {
          visible: true,
          position: 'outside',
          showRule: 'all',
          style: {
            fontSize: 12,
            fill: t['text/title'],
          },
          line: {
            visible: true,
            style: {
              stroke: t['border/line-divider'],
            },
          },
          layout: {
            align: 'edge',
          },
        },
      },
    ],

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

