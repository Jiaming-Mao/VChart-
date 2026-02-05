import type { IWaterfallChartSpec } from '@visactor/vchart';
import type { WaterfallDatum } from '@/types/dashboard';
import { getDataVCategoricalColor, getChartTextColor } from '@/vchart/theme';

/**
 * 瀑布图 - 创建 Spec（工厂函数模式）
 *
 * 样式配置分类说明见 ./CHART_CONFIG_RULES.md
 */
export function createWaterfallSpec(data: WaterfallDatum[], isDark = false): IWaterfallChartSpec {
  return {
    type: 'waterfall',

    data: [{ id: 'data', values: data }],

    xField: 'category',
    yField: 'value',

    series: [
      {
        type: 'waterfall',
        xField: 'category',
        yField: 'value',

        // ============================================
        // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
        // ============================================
        // [DEFAULT] 总计配置
        total: {
          type: 'end',
          text: '总计',
        },
        // [DEFAULT] 堆叠标签配置
        stackLabel: {
          visible: true,
          valueType: 'change',
          style: {
            fill: getChartTextColor(isDark),
          },
        },

        // ============================================
        // [FIXED] 固定样式配置 - AI 不可修改
        // ============================================
        // [FIXED] 颜色映射逻辑（正值=色板1, 负值=色板2, 总计=色板3）
        bar: {
          style: {
            fill: (datum: Record<string, unknown>) => {
              const category = typeof datum.category === 'string' ? datum.category : '';
              const value = typeof datum.value === 'number' ? datum.value : 0;
              if (category === '总计') return getDataVCategoricalColor(3);
              return value >= 0 ? getDataVCategoricalColor(1) : getDataVCategoricalColor(2);
            },
          },
        },
      },
    ],
  };
}
