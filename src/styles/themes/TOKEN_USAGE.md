# Design Token 使用指南

本文档说明如何在项目中正确使用设计 Token 颜色变量。

## 目录

1. [概述](#概述)
2. [文件结构](#文件结构)
3. [Token 分类](#token-分类)
4. [CSS 中使用 Token](#css-中使用-token)
5. [TypeScript 中使用 Token](#typescript-中使用-token)
6. [常用 Token 速查表](#常用-token-速查表)
7. [主题切换机制](#主题切换机制)
8. [新增 Token 流程](#新增-token-流程)

---

## 概述

项目使用基于 `token.json` 的设计系统颜色变量。**所有颜色都定义在生成的 CSS 文件中**，这是唯一的颜色来源。

### 核心原则

1. **单一来源** - 所有颜色定义在 `_generated-*.css` 中
2. **不要硬编码** - 使用 `var(--token-*)` 或语义别名
3. **自动主题切换** - Token 会自动适配浅色/深色主题

### 数据流

```
token.json  ──┐
              ├──> generate-css-variables.cjs ──> _generated-light.css
硬编码配置  ──┘                               ──> _generated-dark.css
                                                       │
                                              ┌────────┴────────┐
                                              ▼                 ▼
                                           组件 CSS          theme.ts
```

---

## 文件结构

```
src/styles/themes/
├── token.json              # 源文件：设计师提供的 Token 定义
├── _generated-light.css    # 自动生成：浅色主题（Token + 别名 + DataV）
├── _generated-dark.css     # 自动生成：深色主题（Token + 别名 + DataV）
└── TOKEN_USAGE.md          # 本文档

scripts/
└── generate-css-variables.cjs  # 生成脚本
```

### 生成脚本

```bash
# 当 token.json 更新后，运行此命令重新生成 CSS 变量
node scripts/generate-css-variables.cjs
```

### 生成的 CSS 内容

每个生成的 CSS 文件包含三部分：

1. **Token 变量** (424 个) - 来自 token.json
2. **语义别名** (12 个) - `--bg`, `--text`, `--muted` 等
3. **DataV 颜色** (14 个) - 图表调色板

### 变量命名转换规则

| 原始名称 | CSS 变量名 |
|----------|-----------|
| `token/text/caption` | `--token-text-caption` |
| `palette/blue/500` | `--palette-blue-500` |
| `token/transparent/neutral/N00 5%` | `--token-transparent-neutral-n00-5pct` |

> 注意：`%` 字符会被转换为 `pct`，因为 CSS 变量名不支持百分号。

---

## Token 分类

Token 变量按用途分为以下类别：

| 前缀 | 说明 | 使用场景 |
|------|------|----------|
| `--token-text-*` | 文本颜色 | 标题、正文、说明文字、链接 |
| `--token-bg-*` | 背景颜色 | 页面背景、卡片背景、浮层 |
| `--token-fill-*` | 填充颜色 | 按钮填充、选中状态、hover 状态 |
| `--token-icon-*` | 图标颜色 | 各级图标颜色 |
| `--token-line-*` | 线条/边框 | 分割线、卡片边框、组件边框 |
| `--token-shadow-*` | 阴影 | 卡片阴影、浮层阴影 |
| `--token-primary-*` | 主色调 | 品牌色、强调色、主按钮 |
| `--token-function-*` | 功能色 | info/danger/success/warning 状态 |
| `--token-colorful-*` | 彩色系列 | 标签、徽章等装饰性颜色 |
| `--token-transparent-*` | 透明色 | 遮罩、透明背景 |
| `--token-static-*` | 固定色 | 纯黑、纯白（不随主题变化） |
| `--palette-*` | 基础调色板 | 原子级颜色（一般不直接使用） |
| `--token-dataV-*` | DataV 图表 | 图表调色板 |

---

## CSS 中使用 Token

### 推荐：使用语义别名

```css
.card {
  background: var(--token-bg-body);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.button-primary {
  background: var(--primary);
  color: var(--primary-contrast);
}

.error-message {
  color: var(--danger);
}
```

### 直接使用 Token 变量

```css
.custom-element {
  color: var(--token-function-danger-content-default);
  background: var(--palette-blue-100);
}
```

### 禁止的写法

```css
/* 错误：硬编码颜色 */
.bad-example {
  color: #1f2329;           /* ❌ 使用 var(--text) */
  background: #ffffff;      /* ❌ 使用 var(--token-bg-body) */
  border: 1px solid #dee0e3; /* ❌ 使用 var(--border) */
}
```

---

## TypeScript 中使用 Token

### 图表配置中使用

对于 VChart 等需要实际颜色值的场景，使用 `@/vchart/theme` 提供的工具函数：

```typescript
import { getChartTextColor, getDataVCategoricalColor } from '@/vchart/theme';

// 获取文本颜色（自动从 CSS 变量读取）
const spec = {
  label: {
    style: {
      fill: getChartTextColor(isDark),
    },
  },
};

// 获取 DataV 调色板颜色
const barColor = getDataVCategoricalColor(1); // 第 1 个颜色
```

### 读取任意 CSS 变量

```typescript
function getCSSVariable(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

// 使用示例
const primaryColor = getCSSVariable('--primary');
```

---

## 常用 Token 速查表

### 语义别名（推荐使用）

| 别名 | 用途 |
|------|------|
| `--bg` | 页面背景 |
| `--text` | 主文本颜色 |
| `--text-title` | 标题颜色 |
| `--muted` | 次要文本、说明文字 |
| `--border` | 边框颜色 |
| `--shadow` | 卡片阴影（组合值） |
| `--primary` | 主色/品牌色 |
| `--primary-contrast` | 主色上的文字颜色 |
| `--danger` | 错误/危险状态 |
| `--success` | 成功状态 |
| `--focus` | 聚焦环颜色 |
| `--panel-elevated` | 浮层/卡片背景 |

### 文本颜色

| Token | 用途 |
|-------|------|
| `--token-text-title` | 标题文字 |
| `--token-text-caption` | 说明文字、次要文字 |
| `--token-text-disabled` | 禁用状态文字 |
| `--token-text-placeholder` | 占位符文字 |

### 背景颜色

| Token | 用途 |
|-------|------|
| `--token-bg-body` | 页面/卡片主背景 |
| `--token-bg-body-overlay` | 覆盖层背景 |
| `--token-bg-float` | 浮层背景 |

### 功能色

| Token | 用途 |
|-------|------|
| `--token-primary-fill-default` | 主色填充 |
| `--token-function-danger-fill-default` | 错误/危险状态 |
| `--token-function-success-fill-default` | 成功状态 |
| `--token-function-warning-fill-default` | 警告状态 |

### DataV 图表颜色

| Token | 颜色 |
|-------|------|
| `--token-dataV-categorical-1` | #3370EB |
| `--token-dataV-categorical-2` | #1BCEBF |
| `--token-dataV-categorical-3` | #FFC60A |
| ... | ... |
| `--token-dataV-categorical-14` | #7BC335 |

---

## 主题切换机制

### HTML 结构

主题通过 `data-theme` 属性控制：

```html
<html data-theme="light">  <!-- 浅色主题 -->
<html data-theme="dark">   <!-- 深色主题 -->
```

### CSS 选择器

```css
/* 生成的 CSS 使用 data-theme 选择器 */
:root[data-theme='light'] {
  --token-text-title: #1f2329;
  --bg: var(--token-bg-body-overlay);
  /* ... */
}

:root[data-theme='dark'] {
  --token-text-title: #ebebeb;
  --bg: var(--token-bg-body-overlay);
  /* ... */
}
```

### React 中切换主题

```typescript
import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      当前: {theme === 'light' ? '浅色' : '深色'}
    </button>
  );
}
```

---

## 新增 Token 流程

当设计师提供新的 Token 时：

1. **更新 `token.json`**
   - 将新的 Token 数据添加到 `浅色模式` 和 `深色模式` 数组中

2. **（可选）更新生成脚本**
   - 如果需要新的语义别名，在 `scripts/generate-css-variables.cjs` 的 `SEMANTIC_ALIASES` 中添加

3. **重新生成 CSS**
   ```bash
   node scripts/generate-css-variables.cjs
   ```

4. **更新本文档**
   - 在速查表中添加新 Token 的说明

---

## 检查清单

在提交代码前，请确认：

- [ ] 没有使用硬编码的颜色值（如 `#ffffff`、`rgba(0,0,0,0.5)`）
- [ ] CSS 中使用 `var(--token-*)` 或语义别名
- [ ] TypeScript 中使用 `getChartTextColor()` 或 `getDataVCategoricalColor()`
- [ ] 新增的 UI 组件已测试浅色和深色主题

---

## 参考资源

- `token.json` - 完整的 Token 定义
- `_generated-light.css` - 浅色主题变量（包含 Token + 别名 + DataV）
- `_generated-dark.css` - 深色主题变量（包含 Token + 别名 + DataV）
- `scripts/generate-css-variables.cjs` - 生成脚本（包含语义别名和 DataV 配置）
