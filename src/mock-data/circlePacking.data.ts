import type { CirclePackingBubbleDatum } from '@/types/dashboard';

// 数据来源：AI Block 效果评测 气泡图 (1).csv
// 颜色按产品线，值为年度营收（百万美元）
export const circlePackingData: CirclePackingBubbleDatum[] = [
  { name: '云服务平台', value: 180, productLine: '软件与服务' },
  { name: '智能手机 A', value: 320, productLine: '硬件设备' },
  { name: '智能手表 B', value: 95, productLine: '硬件设备' },
  { name: '办公软件套件', value: 150, productLine: '软件与服务' },
  { name: '智能家居 C', value: 60, productLine: '硬件设备' },
  { name: '大数据分析工具', value: 210, productLine: '软件与服务' },
  { name: '游戏主机 D', value: 250, productLine: '硬件设备' },
  { name: '支付系统 E', value: 75, productLine: '软件与服务' },
  { name: '笔记本电脑 F', value: 120, productLine: '硬件设备' },
  { name: '芯片 G', value: 140, productLine: '硬件设备' },
];
