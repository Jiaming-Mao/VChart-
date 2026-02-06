import type { TreemapNode } from '@/types/dashboard';

export const treemapData: TreemapNode[] = [
  {
    name: '年度销售额',
    children: [
      {
        name: '智能硬件',
        children: [
          { name: 'Pro Max 281', value: 1839, category: '智能硬件' },
          { name: 'Lite 5G 618', value: 3610, category: '智能硬件' },
          { name: 'Pro Max 368', value: 1910, category: '智能硬件' },
          { name: 'Ultra Z 680', value: 1334, category: '智能硬件' },
          { name: 'Basic S 210', value: 2557, category: '智能硬件' },
          { name: 'Pro Max 370', value: 2614, category: '智能硬件' },
          { name: 'Basic S 480', value: 3372, category: '智能硬件' },
          { name: 'Lite 5G 498', value: 5414, category: '智能硬件' },
          { name: 'Basic S 797', value: 1347, category: '智能硬件' },
          { name: 'Lite 5G 586', value: 5340, category: '智能硬件' },
          { name: 'Lite 5G 732', value: 2804, category: '智能硬件' },
          { name: 'Pro Max 315', value: 4330, category: '智能硬件' },
          { name: 'Lite 5G 986', value: 2438, category: '智能硬件' },
          { name: 'Compact C 136', value: 1331, category: '智能硬件' },
        ],
      },
      {
        name: '食品饮料',
        children: [
          { name: 'Nut Mix 735', value: 500, category: '食品饮料' },
          { name: 'Organic Coffee 958', value: 2235, category: '食品饮料' },
          { name: 'Energy Bar 715', value: 837, category: '食品饮料' },
          { name: 'Nut Mix 573', value: 1085, category: '食品饮料' },
          { name: 'Nut Mix 621', value: 622, category: '食品饮料' },
          { name: 'Energy Bar 477', value: 605, category: '食品饮料' },
          { name: 'Fresh Juice 736', value: 924, category: '食品饮料' },
          { name: 'Organic Coffee 207', value: 1186, category: '食品饮料' },
          { name: 'Nut Mix 965', value: 1849, category: '食品饮料' },
          { name: 'Energy Bar 916', value: 517, category: '食品饮料' },
        ],
      },
      {
        name: '家居日用',
        children: [
          { name: 'Home Clean 105', value: 790, category: '家居日用' },
          { name: 'Quick Dry 995', value: 767, category: '家居日用' },
          { name: 'Kitchen Master 586', value: 529, category: '家居日用' },
          { name: 'Home Clean 588', value: 1044, category: '家居日用' },
          { name: 'Home Clean 244', value: 914, category: '家居日用' },
          { name: 'Aero Fan 410', value: 1617, category: '家居日用' },
          { name: 'Home Clean 477', value: 2266, category: '家居日用' },
        ],
      },
      {
        name: '服饰箱包',
        children: [
          { name: 'Urban Jacket 498', value: 500, category: '服饰箱包' },
          { name: 'Sport Tee 490', value: 557, category: '服饰箱包' },
          { name: 'Classic Dress 155', value: 500, category: '服饰箱包' },
          { name: 'Sport Tee 275', value: 1224, category: '服饰箱包' },
        ],
      },
      {
        name: '企业软件',
        children: [
          { name: 'Security Guard 841', value: 1710, category: '企业软件' },
          { name: 'DataHub Pro 354', value: 2333, category: '企业软件' },
          { name: 'Finance ERP 534', value: 1267, category: '企业软件' },
          { name: 'Connect Link 739', value: 2016, category: '企业软件' },
          { name: 'DataHub Pro 608', value: 2457, category: '企业软件' },
        ],
      },
    ],
  },
];

