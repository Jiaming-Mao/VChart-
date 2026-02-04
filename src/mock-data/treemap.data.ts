import type { TreemapNode } from '@/types/dashboard';

export const treemapData: TreemapNode[] = [
  {
    name: '业务总览',
    children: [
      {
        name: '电商',
        children: [
          { name: '服饰', value: 320 },
          { name: '家居', value: 260 },
          { name: '数码', value: 210 },
        ],
      },
      {
        name: '本地生活',
        children: [
          { name: '餐饮', value: 280 },
          { name: '出行', value: 190 },
          { name: '酒旅', value: 160 },
        ],
      },
      {
        name: '内容',
        children: [
          { name: '图文', value: 140 },
          { name: '短视频', value: 240 },
          { name: '直播', value: 180 },
        ],
      },
    ],
  },
];

