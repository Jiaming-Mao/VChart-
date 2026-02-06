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

  // 计算 Y 轴最大值，预留约 8% 顶部空间
  const maxAcc = (() => {
    let acc = 0;
    let m = 0;
    for (const d of data) {
      if (d.total) acc = Number(d.value) || 0;
      else acc += Number(d.value) || 0;
      m = Math.max(m, acc);
    }
    return m;
  })();
  const yMax = Math.ceil(maxAcc * 1.08);

  // 标签/样式使用的柱子颜色（与瀑布图色板 [increase, decrease, total] 保持一致）
  // 注：stackLabel 的 datum 不是原始 WaterfallDatum，而是瀑布图内部的「累计数据」
  // - total 用 isTotal 标识
  // - 正负可用 end - start 表示本段增量
  const getWaterfallBarColor = (d: any) => {
    if (d?.total || d?.isTotal) return t['dataV/categorical/3'];

    const start = Number(d?.start);
    const end = Number(d?.end);
    if (Number.isFinite(start) && Number.isFinite(end)) {
      return end - start >= 0 ? t['dataV/categorical/1'] : t['dataV/categorical/2'];
    }

    return (Number(d?.value) || 0) >= 0 ? t['dataV/categorical/1'] : t['dataV/categorical/2'];
  };

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
    // [FIXED] 坐标轴配置 - AI 不可修改
    // ============================================
    axes: [
      {
        orient: 'bottom',
        type: 'band',
        // [FIXED] paddingOuter: 柱组与图表边缘的间距比例
        // 注：当比例计算结果 paddingOuter 绝对值间距 < 2px 时，建议设为 0
        // 当前设为 0.075，若柱宽过小导致间距 < 2px，可手动调整为 0
        paddingOuter: 0.075,
        // [FIXED] paddingInner: 柱组与柱组之间的间距比例
        paddingInner: 0.45,
      },
      { orient: 'left', type: 'linear', min: 0, max: yMax },
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

    series: [
      {
        type: 'waterfall',
        xField: 'category',
        yField: 'value',

        // ============================================
        // [FIXED] 柱子样式配置 - AI 不可修改
        // ============================================
        // [FIXED] 柱子最大宽度 52px
        barMaxWidth: 52,
        // [FIXED] 柱子样式
        bar: {
          style: {
            // [FIXED] 柱子圆角 - 根据柱宽自适应
            cornerRadius: 6,
          },
        },

        // ============================================
        // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
        // ============================================
        // [DEFAULT] 总计/小计配置（数据中 total: true 的项显示为合计柱）
        total: {
          type: 'field',
          tagField: 'total',
        },
        // [DEFAULT] 去掉柱子之间的连接线（leaderLine）
        leaderLine: {
          style: {
            stroke: t['border/line-divider'],
          },
        },
        // [DEFAULT] 堆叠标签配置
        stackLabel: {
          //position: 'max',
          visible: true,
          offset: 8,
          valueType: 'change',
          style: {
            fontSize: 12,
            // 标签颜色跟随柱子颜色：正值=色板1, 负值=色板2, 总计=色板3
            fill: (datum: any) => getWaterfallBarColor(datum),
          },
        },

      },
    ],
  };
}
