import type { SankeyData } from '@/types/dashboard';

export const sankeyData: SankeyData = {
  nodes: [
    { nodeName: '访问' },
    { nodeName: '咨询' },
    { nodeName: '订单' },
    { nodeName: '完成' },
    { nodeName: '流失' },
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 1, target: 2, value: 60 },
    { source: 1, target: 4, value: 40 },
    { source: 2, target: 3, value: 50 },
    { source: 2, target: 4, value: 10 },
  ],
};

