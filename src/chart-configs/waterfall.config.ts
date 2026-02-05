import type { IWaterfallChartSpec } from '@visactor/vchart';
import type { WaterfallDatum } from '@/types/dashboard';
import { getDataVCategoricalColor } from '@/vchart/theme';

/**
 * 瀑布图 - 创建 Spec（工厂函数模式）
 *
 * 🎨 可修改项：
 * - stackLabel: 标签显示规则
 * - bar: 正值/负值/总计颜色
 */
export function createWaterfallSpec(data: WaterfallDatum[], isDark = false): IWaterfallChartSpec {
  return {
    type: 'waterfall',

    data: [{ id: 'data', values: data }],

    xField: 'category',
    yField: 'value',

    // 用 series 显式声明瀑布系列（类型更准确）
    series: [
      {
        type: 'waterfall',
        xField: 'category',
        yField: 'value',
        total: {
          type: 'end',
          text: '总计',
        },
        stackLabel: {
          visible: true,
          valueType: 'change',
          style: {
            fill: isDark ? '#eee' : '#333',
          },
        },
        // 颜色配置：正值/负值/总计（符合验收“正负值颜色区分”）
        bar: {
          style: {
            fill: (datum: Record<string, unknown>) => {
              const category = typeof datum.category === 'string' ? datum.category : '';
              const value = typeof datum.value === 'number' ? datum.value : 0;
              // mapping:
              // - 正值：色板 1
              // - 负值：色板 2
              // - 总计：色板 3
              if (category === '总计') return getDataVCategoricalColor(3);
              return value >= 0 ? getDataVCategoricalColor(1) : getDataVCategoricalColor(2);
            },
          },
        },
      },
    ],
  };
}

