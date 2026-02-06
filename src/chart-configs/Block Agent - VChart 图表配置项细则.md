## Block Agent - VChart 图表配置项细则

- **适用范围**：`src/chart-configs/*.config.ts` 中导出的 `create*Spec()`（当前包含：Circle Packing / Waterfall / Rose / Sankey / Treemap）。
- **原型**：`https://vchartprev-f8htwcqv.manus.space`
- **评审反馈**：[Block Agent 图表默认配置 - 评审反馈](https://bytedance.larkoffice.com/wiki/Dcpxwz58gihnEPkqJKqchzDDnSg?from=from_copylink)

本文档以代码为准：所有“配置路径/默认值”均对齐到当前仓库 `chart-configs` 实际实现。

## 配置分类（与代码注释一致）

| 类别 | 标记 | 说明 |
| --- | --- | --- |
| 第一类：固定配置 | `[FIXED]` | 设计规范的一部分，确保视觉一致性；**AI 不可修改** |
| 第二类：可调整配置 | `[DEFAULT]` | 有默认值；**AI 可根据用户意图修改** |
| 第三类：软性约束 | - | Prompt 层面的引导建议；不直接映射为 Spec 字段 |

## 第一类：固定配置（跨图表通用）

### 1) 布局（统一内边距）

所有当前图表统一内边距为：

| 配置路径 | 默认值 | 说明 |
| --- | --- | --- |
| `padding.top` | `0` | 图表上内边距 |
| `padding.right` | `20` | 图表右内边距 |
| `padding.bottom` | `20` | 图表下内边距 |
| `padding.left` | `20` | 图表左内边距 |

### 2) 图例（统一样式）

以下为各图表 `legends` 的共同固定项（字段名以代码为准）：

| 配置路径 | 默认值 | 说明 |
| --- | --- | --- |
| `legends.maxRow` | `1` | 图例最多一行 |
| `legends.autoPage` | `true` | 超出容器自动分页（注意：不是 `pager.enable`） |
| `legends.padding.bottom` | `8` | 图例与图表间距 |
| `legends.item.shape.style.symbolType` | `'circle'` | 圆形图例 |
| `legends.item.shape.style.size` | `8` | 图例圆点大小 |
| `legends.item.shape.space` | `6` | 圆点与文字间距 |
| `legends.item.background.state.selectedHover.fillOpacity` | `0` | hover 无背景（用透明度控制） |
| `legends.item.background.state.unSelectedHover.fillOpacity` | `0` | 未选中 hover 无背景（用透明度控制） |
| `legends.pager.textStyle.visible` | `false` | 不显示分页数字（注意：不是把 `fill` 设透明） |
| `legends.pager.handler.preShape` | `'triangleUp'` | 翻页按钮：上 |
| `legends.pager.handler.nextShape` | `'triangleDown'` | 翻页按钮：下 |

### 3) Tooltip（统一面板样式，随主题切换）

所有当前图表的 `tooltip.style` 均使用主题 token（来自 `TOKEN_COLORS[isDark ? 'dark' : 'light']`），而不是写死的 hex：

| 配置路径 | 默认值 | 说明 |
| --- | --- | --- |
| `tooltip.visible` | `true` | 默认显示 |
| `tooltip.style.panel.backgroundColor` | `'bg/float'` | 浮层背景色 |
| `tooltip.style.panel.border.color` | `'border/card'` | 边框色 |
| `tooltip.style.panel.border.width` | `0.5` | 边框宽度 |
| `tooltip.style.panel.border.radius` | `10` | 圆角 |
| `tooltip.style.panel.shadow.x` | `0` | 阴影 X |
| `tooltip.style.panel.shadow.y` | `4` | 阴影 Y |
| `tooltip.style.panel.shadow.blur` | `20` | 模糊 |
| `tooltip.style.panel.shadow.spread` | `0` | 扩散 |
| `tooltip.style.panel.shadow.color` | `'shadow/n900-5pct'` | 阴影色 |
| `tooltip.style.panel.padding` | `12` | 内边距 |
| `tooltip.style.titleLabel.fontSize` | `12` | 标题字号 |
| `tooltip.style.titleLabel.fontWeight` | `'bold'` | 标题字重 |
| `tooltip.style.titleLabel.fill` | `'text/caption'` | 标题颜色 |
| `tooltip.style.keyLabel.fontSize` | `12` | 键名字号 |
| `tooltip.style.keyLabel.fill` | `'text/caption'` | 键名颜色 |
| `tooltip.style.valueLabel.fontSize` | `12` | 值字号 |
| `tooltip.style.valueLabel.fontWeight` | `'bold'` | 值字重 |
| `tooltip.style.valueLabel.fill` | `'text/title'` | 值颜色 |
| `tooltip.style.shape.size` | `8` | 引导形状大小 |
| `tooltip.style.shape.shapeType` | `'circle'` | 引导形状类型 |
| `tooltip.style.spaceRow` | `6` | 行间距 |

## 第二类：可调整配置（跨图表通用）

以下为目前各图表在代码中“普遍存在且默认开启”的可调整项：

| 配置路径 | 默认值 | 说明 |
| --- | --- | --- |
| `legends.visible` | `true` | 显示图例 |
| `legends.orient` | `'top'` | 图例在上方 |
| `legends.position` | `'start'` | 图例左对齐 |
| `tooltip.visible` | `true` | 显示 tooltip |

> 说明：不同图表对 `label` 的配置位置不完全一致（例如 Rose 的 label 必须写在 `series[]` 内才能生效），因此 “label 的默认开关/路径” 放到各图表小节中逐一说明。

## 图表特有配置（按图表）

### Circle Packing（圆形打包图）

文件：`src/chart-configs/circlePacking.config.ts`

| 类别 | 配置路径 | 默认值 | 说明 |
| --- | --- | --- | --- |
|      |                            |                  |                                                          |
|      |                            |                  |                                                          |
|      |                            |                  |                                                          |
|      |                            |                  |                                                          |
| 可调 | `label.style.fontSize` | `12` | 标签字号 |
| 可调 | `label.style.fill` | `'static/white'` | 标签颜色（当前实现为白色） |
| 固定 | `label.style.stroke` | `'transparent'` | 标签无描边 |
| 可调 | `label.style.textBaseline` | `'middle'` | 垂直居中 |
| 可调 | `label.style.fillOpacity` | 回调函数 | 文本放不下则隐藏（按 `datum.radius` 与文本估算宽度判断） |
|      |                            |                  |                                                          |

补充说明：
- 当前实现未配置 `label.position`（使用组件默认定位）。
- 数据按 `seriesField: 'productLine'` 着色并作为图例系列。

### Rose（玫瑰图）

文件：`src/chart-configs/rose.config.ts`

| 类别 | 配置路径 | 默认值 | 说明 |
| --- | --- | --- | --- |
|      |                                     |                         |                                  |
|      |                                     |                         |                                  |
| 可调 | `rose.style.stroke` | `'bg/body'` | 扇形描边色（用背景色制造分隔感） |
| 可调 | `rose.style.lineWidth` | `2` | 扇形描边宽度 |
|      |                                     |                         |                                  |
| 可调 | `series[0].label.visible` | `true` | 标签开关（必须在 `series[]` 内） |
| 可调 | `series[0].label.position` | `'outside'` | 标签在外侧 |
| 可调 | `series[0].label.showRule` | `'all'` | 展示规则 |
| 可调 | `series[0].label.style.fontSize` | `12` | 标签字号 |
| 可调 | `series[0].label.style.fill` | `'text/title'` | 标签颜色（随主题 token） |
| 可调 | `series[0].label.line.visible` | `true` | 是否显示引导线 |
| 可调 | `series[0].label.line.style.stroke` | `'border/line-divider'` | 引导线颜色 |
| 可调 | `series[0].label.layout.align` | `'edge'` | 布局对齐策略 |

### Waterfall（瀑布图）

文件：`src/chart-configs/waterfall.config.ts`

| 类别 | 配置路径 | 默认值 | 说明 |
| --- | --- | --- | --- |
| 固定 | `color` | 跟随主题色 | 色板顺序为 `[increase, decrease, total]` |
| 固定 | `axes[0].orient` | `'bottom'` | X 轴在下 |
| 固定 | `axes[0].type` | `'band'` | X 轴类型 |
| 固定 | `axes[0].paddingOuter` | `0.075` | 柱组与边缘间距比例 |
| 固定 | `axes[0].paddingInner` | `0.45` | 柱组之间间距比例 |
| 固定 | `axes[1].orient` | `'left'` | Y 轴在左 |
| 固定 | `axes[1].type` | `'linear'` | Y 轴类型 |
| 固定 | `axes[1].min` | `0` | Y 轴最小值 |
| 固定 | `axes[1].max` | `ceil(maxAcc * 1.08)` | Y 轴最大值（累计最大值上浮约 8%） |
| 固定 | `series[0].barMaxWidth` | `52` | 柱子最大宽度 |
| 固定 | `series[0].bar.style.cornerRadius` | `6` | 柱子圆角 |
| 可调 | `series[0].total` | `{ type: 'field', tagField: 'total' }` | 数据项 `total: true` 作为合计柱 |
| 可调 | `series[0].leaderLine.style.stroke` | `t['border/line-divider']` | 连接线颜色（当前实现为显示连接线，非隐藏） |
| 可调 | `series[0].stackLabel.visible` | `true` | 堆叠标签开关 |
| 可调 | `series[0].stackLabel.offset` | `8` | 标签偏移 |
| 可调 | `series[0].stackLabel.valueType` | `'change'` | 显示增量 |
| 可调 | `series[0].stackLabel.style.fill` | 回调函数 | 标签颜色随柱子正负/合计变化 |

### Sankey（桑基图）

文件：`src/chart-configs/sankey.config.ts`

| 类别 | 配置路径 | 默认值 | 说明 |
| --- | --- | --- | --- |
| 固定 | `nodeWidth` | `8` | 节点宽度 |
|      |                           |                  |                                                   |
| 可调 | `node.style.cornerRadius` | `2` | 节点圆角 |
| 可调 | `link.style.fillOpacity` | `0.15` | 连线半透明 |
| 可调 | `link.style.fill` | 回调函数 | 连线使用线性渐变（源→目标），颜色来自 14 色调色板 |
| 可调 | `label.visible` | `true` | 标签开关 |
| 可调 | `label.offset` | `8` | 标签距离节点 |
| 可调 | `label.style.fontSize` | `12` | 标签字号 |
| 可调 | `label.style.fill` | `'text/caption'` | 标签颜色（随主题 token） |

> 说明：当前实现未在 spec 中配置 `nodeAlign` / `nodeGap`，不要在文档里写成默认存在。

### Treemap（矩形树图）

文件：`src/chart-configs/treemap.config.ts`

| 类别 | 配置路径 | 默认值 | 说明 |
| --- | --- | --- | --- |
| 可调 | `gapWidth` | `[8, 4, 2]` | 间距配置：分组/层级/方块间距（当前实现为三段数组） |
| 可调 | `leaf.style.cornerRadius` | `2` | 叶子节点圆角 |
| 可调 | `label.visible` | `true` | 标签开关 |
| 可调 | `label.style.fontSize` | `12` | 标签字号 |
| 可调 | `label.style.fill` | `t['static/white']` | 标签颜色 |
| 可调 | `label.style.textAlign` | `'center'` | 水平居中 |
| 可调 | `label.style.maxLineWidth` | 回调函数 | 根据方块宽度动态计算可用行宽 |
| 可调 | `label.style.ellipsis` | `'...'` | 超出省略 |
|      |                            |                     |                                                    |
|      |                            |                     |                                                    |

## 第三类：软性约束（Prompt 建议）

这些约束不直接对应 spec 字段，用于对话层引导（可按场景扩展）。

| 约束项 | 描述 |
| --- | --- |
| 颜色使用 | 优先按色板顺序使用颜色，避免跳跃；必要时按业务语义固定颜色（如 Waterfall 的 increase/decrease/total） |
| 数据标签位置 | 优先放在图元内部；空间不足时放外部；避免互相遮挡与溢出容器 |
| 数据标签取舍 | 标签过密时优先隐藏次要标签（例如 Circle Packing 使用 `fillOpacity` 回调隐藏放不下的文字） |
| 对比度 | 确保文字与背景有足够对比度；优先使用主题 token（`t[...]`）而非写死色值 |
| 图例长度 | 系列过多时考虑分页、合并或分组；保持最多一行与分页箭头可用 |