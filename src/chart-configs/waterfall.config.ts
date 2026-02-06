import type { IWaterfallChartSpec } from '@visactor/vchart';
import type { WaterfallDatum } from '@/types/dashboard';
import { TOKEN_COLORS } from '@/vchart/theme';

/**
 * 瀑布图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createWaterfallSpec(data: WaterfallDatum[], isDark = false): IWaterfallChartSpec {
  const t = TOKEN_COLORS[isDark ? 'dark' : 'light'];

  return {
    type: 'waterfall',

    data: [{ id: 'data', values: data }],

    xField: 'category',
    yField: 'value',

    // ============================================
    // [FIXED] 瀑布图色板 - 按 [increase, decrease, total] 顺序
    // ============================================
    color: [
      t['dataV/categorical/1'], // 正值（increase）- 蓝色
      t['dataV/categorical/2'], // 负值（decrease）- 绿色
      t['dataV/categorical/3'], // 合计（total）- 黄色
    ],

    // ============================================
    // [FIXED] 图表内边距 - AI 不可修改
    // ============================================
    padding: {
      top: 0,
      right: 20,
      bottom: 20,
      left: 20,
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
      visible: true,
      // [DEFAULT] 图例位置 - 居顶
      orient: 'top',
      // [DEFAULT] 图例对齐 - 居左
      position: 'start',
      // [DEFAULT] 自定义图例项（中文名称）
      data: (items) =>
        items.map((item) => ({
          ...item,
          label:
            item.label === 'increase'
              ? '增加'
              : item.label === 'decrease'
                ? '减少'
                : item.label === 'total'
                  ? '合计'
                  : item.label,
        })),

      // ============================================
      // [FIXED] 图例固定样式 - AI 不可修改
      // ============================================
      // [FIXED] 最多一行
      maxRow: 1,
      // [FIXED] 自动分页
      autoPage: true,
      // [FIXED] 图例与图表间距 16
      padding: { bottom: 16 },
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

    series: [
      {
        type: 'waterfall',
        xField: 'category',
        yField: 'value',

        // ============================================
        // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
        // ============================================
        // [DEFAULT] 总计/小计配置（数据中 total: true 的项显示为合计柱）
        total: {
          type: 'field',
          tagField: 'total',
        },
        // [DEFAULT] 堆叠标签配置
        stackLabel: {
          visible: true,
          valueType: 'change',
          style: {
            fill: t['text/title'],
          },
        },

      },
    ],
  };
}
