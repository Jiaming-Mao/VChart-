# 图表样式配置分类规则

本文档说明图表样式配置的分类规则，供 AI 搭建组件时参考。

---

## 一、配置范围

**本文档只涉及样式类配置**，不包括：

- `type` - 图表类型
- `data` - 数据结构
- 字段映射（`categoryField`, `valueField`, `xField`, `yField` 等）

这些是图表运行的基础结构，不属于"配置"范畴。

---

## 二、分类规则

| 分类 | 标注 | 说明 | AI 权限 |
|------|------|------|---------|
| **固定配置** | `[FIXED]` | 核心视觉样式，修改可能破坏整体美观 | 不可修改 |
| **默认配置** | `[DEFAULT]` | 有默认值，可根据用户需求调整 | 可修改 |

### 固定配置 [FIXED] 包含

- **透明度**（`fillOpacity`）
- **间距**（`layoutPadding`, `gap`）
- **动画缓动函数**（`easing`）
- **颜色映射逻辑**（如瀑布图的正负值颜色规则）

### 默认配置 [DEFAULT] 包含

- **布局**（`outerRadius`, `innerRadius`）
- **显示/隐藏**（`visible`）
- **位置**（`position`, `orient`）
- **文案**（`text`）
- **字体大小**（`fontSize`）
- **交互开关**（`drill`）

---

## 三、AI 修改指南

### AI 可以做的

- 根据用户需求修改 `[DEFAULT]` 标注的配置
- 例如：用户说"把标签放到内部" → 修改 `label.position: 'inside'`
- 例如：用户说"隐藏图例" → 修改 `legends.visible: false`

### AI 不可以做的

- 修改 `[FIXED]` 标注的配置
- 这些配置已经调优，修改可能破坏视觉一致性

---

## 四、通用组件配置

### Padding（图表内边距）

图表内边距配置适用于所有图表。

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `padding.top` | FIXED | `0` | 上内边距 |
| `padding.right` | FIXED | `20` | 右内边距 |
| `padding.bottom` | FIXED | `20` | 下内边距 |
| `padding.left` | FIXED | `20` | 左内边距 |

### Legend（图例）

图例配置适用于所有图表。瀑布图、玫瑰图、矩形树图默认显示图例（`visible: true`），其他图表默认隐藏图例（`visible: false`）。

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `legends.visible` | DEFAULT | `true/false` | 图例显示 |
| `legends.orient` | DEFAULT | `'top'` | 图例位置（居顶） |
| `legends.position` | DEFAULT | `'start'` | 图例对齐（居左） |
| `legends.maxRow` | FIXED | `1` | 最多一行 |
| `legends.autoPage` | FIXED | `true` | 自动分页 |
| `legends.padding.bottom` | FIXED | `8` | 图例与图表间距 |
| `legends.item.shape.space` | FIXED | `6` | 图例圆形与文字间距 |
| `legends.item.shape.style.symbolType` | FIXED | `'circle'` | 圆形图例 |
| `legends.item.shape.style.size` | FIXED | `8` | 图例圆形大小（8×8 像素） |
| `legends.item.background.state.*.fillOpacity` | FIXED | `0` | hover 无背景色 |
| `legends.pager.textStyle.visible` | FIXED | `false` | 不显示分页数字 |
| `legends.pager.handler.preShape` | FIXED | `'triangleUp'` | 上翻页箭头 |
| `legends.pager.handler.nextShape` | FIXED | `'triangleDown'` | 下翻页箭头 |

---

## 五、各图表配置分类

### 1. CirclePacking（圆形打包图）

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `layoutPadding` | FIXED | `5` | 气泡间距 |
| `animationEnter.easing` | FIXED | `'cubicInOut'` | 入场动画缓动 |
| `animationExit.easing` | FIXED | `'cubicInOut'` | 退场动画缓动 |
| `animationUpdate.easing` | FIXED | `'cubicInOut'` | 更新动画缓动 |
| `tooltip.visible` | DEFAULT | `true` | 提示框显示 |
| `label.style.fontSize` | DEFAULT | `10` | 标签字号 |
| `drill` | DEFAULT | `true` | 钻取交互 |
| `legends` | - | 见第四章 | 图例配置（默认隐藏） |

### 2. Rose（玫瑰图）

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `outerRadius` | DEFAULT | `0.75` | 外半径 |
| `innerRadius` | DEFAULT | `0` | 内半径 |
| `label.visible` | DEFAULT | `true` | 标签显示 |
| `label.position` | DEFAULT | `'outside'` | 标签位置 |
| `legends` | - | 见第四章 | 图例配置 |

### 3. Sankey（桑基图）

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `node.style.fillOpacity` | FIXED | `0.9` | 节点透明度 |
| `link.style.fillOpacity` | FIXED | `0.3` | 连接线透明度 |
| `label.visible` | DEFAULT | `true` | 标签显示 |
| `legends` | - | 见第四章 | 图例配置（默认隐藏） |

### 4. Treemap（矩形树图）

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `label.visible` | DEFAULT | `true` | 标签显示 |
| `label.smartInvert` | DEFAULT | `true` | 智能反色 |
| `label.style.fontSize` | DEFAULT | `12` | 标签字号 |
| `drill` | DEFAULT | `true` | 钻取交互 |
| `nonLeaf.visible` | DEFAULT | `false` | 非叶节点显示 |
| `legends` | - | 见第四章 | 图例配置 |

### 5. Waterfall（瀑布图）

| 配置项 | 分类 | 默认值 | 说明 |
|--------|------|--------|------|
| `bar.style.fill` | FIXED | 颜色映射函数 | 正值=色板1, 负值=色板2, 总计=色板3 |
| `total.type` | DEFAULT | `'end'` | 总计位置 |
| `total.text` | DEFAULT | `'总计'` | 总计文案 |
| `stackLabel.visible` | DEFAULT | `true` | 堆叠标签显示 |
| `stackLabel.valueType` | DEFAULT | `'change'` | 标签值类型 |
| `legends` | - | 见第四章 | 图例配置 |

---

## 六、新增配置指南

### 代码注释格式

新增图表配置时，请按以下格式添加注释：

```typescript
export function createXxxSpec(data: XxxDatum[], isDark = false): IXxxChartSpec {
  return {
    type: 'xxx',
    data: [{ id: 'data', values: data }],
    categoryField: 'name',
    valueField: 'value',

    // ============================================
    // [FIXED] 固定样式配置 - AI 不可修改
    // ============================================
    // [FIXED] 配置说明
    layoutPadding: 5,

    // ============================================
    // [DEFAULT] 默认样式配置 - AI 可根据用户需求修改
    // ============================================
    // [DEFAULT] 配置说明
    tooltip: { visible: true },
  };
}
```

### 文档更新

新增图表后，请在本文档「四、各图表配置分类」章节添加对应的配置分类表。
