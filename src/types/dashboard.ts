export type ChartKey = 'circlePacking' | 'waterfall' | 'rose' | 'sankey' | 'treemap';

export interface ChartCardMeta {
  key: ChartKey;
  title: string;
}

// ===== Chart data types (用于配置/Mock/组件强类型) =====

export interface CirclePackingNode {
  name: string;
  value?: number;
  children?: CirclePackingNode[];
}

// CirclePacking 气泡图（官方 demo 方式：一维数组）
export interface CirclePackingBubbleDatum {
  name: string;
  value: number;
}

export interface WaterfallDatum {
  category: string;
  value: number;
}

export interface RoseDatum {
  category: string;
  value: number;
}

export interface SankeyNode {
  nodeName: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
}

