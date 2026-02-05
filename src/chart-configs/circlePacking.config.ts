import type { ICirclePackingChartSpec } from '@visactor/vchart';
import type { CirclePackingBubbleDatum } from '@/types/dashboard';
import { TOKEN_COLORS } from '@/vchart/theme';

/**
 * 圆形打包图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createCirclePackingSpec(
  data: CirclePackingBubbleDatum[],
  isDark = false
): ICirclePackingChartSpec {
  const t = TOKEN_COLORS[isDark ? 'dark' : 'light'];

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
    // [DEFAULT] 标签样式
    label: {
      // [DEFAULT] 智能反色 - 根据气泡颜色自动调整标签颜色
      // @ts-expect-error smartInvert 是 VChart 运行时支持的属性，但类型定义中尚未包含
      smartInvert: true,
      style: {
        fontSize: 10,
        fill: t['static/white'],
        // [DEFAULT] 标签无描边
        stroke: 'transparent',
        // [DEFAULT] 标签垂直居中
        textBaseline: 'middle',
        // [DEFAULT] 标签超出气泡范围则隐藏（通过透明度控制）
        // 使用回调函数根据 value 和标签文本长度判断是否显示
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fillOpacity: (datum: any) => {
          // VChart CirclePacking 在 datum 中提供了计算后的半径 datum.radius
          const radius = datum?.radius || 0;
          const text = datum?.name || '';
          const textWidth = text.length * 6; // 估算文本宽度（每字符约 6px）
          // 标签宽度小于直径的 80% 时显示，否则透明
          return textWidth < radius * 1.6 ? 1 : 0;
        },
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
    // [DEFAULT] 钻取交互
    drill: true,

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
      // [FIXED] 图例与图表间距 40
      padding: { bottom: 40 },
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

