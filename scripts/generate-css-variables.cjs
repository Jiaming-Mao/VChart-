#!/usr/bin/env node

/**
 * Token to CSS Variables Generator
 * 
 * 此脚本读取 token.json 文件，将设计 token 转换为 CSS 变量文件。
 * 生成的文件包含：
 *   - token.json 中的所有颜色变量
 *   - 语义化别名（--bg, --text, --muted 等）
 *   - DataV 图表调色板
 *   - color-scheme 声明
 * 
 * 使用方法: node scripts/generate-css-variables.cjs
 * 
 * 输出文件:
 *   - src/styles/themes/_generated-light.css
 *   - src/styles/themes/_generated-dark.css
 */

const fs = require('fs');
const path = require('path');

// 路径配置
const TOKEN_JSON_PATH = path.join(__dirname, '../src/styles/themes/token.json');
const OUTPUT_DIR = path.join(__dirname, '../src/styles/themes');

/**
 * DataV 图表调色板（浅色和深色主题共用）
 */
const DATAV_CATEGORICAL_COLORS = [
  { name: '--token-dataV-categorical-1', value: '#3370EB' },
  { name: '--token-dataV-categorical-2', value: '#1BCEBF' },
  { name: '--token-dataV-categorical-3', value: '#FFC60A' },
  { name: '--token-dataV-categorical-4', value: '#ED6D0C' },
  { name: '--token-dataV-categorical-5', value: '#DCA1E4' },
  { name: '--token-dataV-categorical-6', value: '#25B2E5' },
  { name: '--token-dataV-categorical-7', value: '#6DCDEB' },
  { name: '--token-dataV-categorical-8', value: '#288FCB' },
  { name: '--token-dataV-categorical-9', value: '#94B5F5' },
  { name: '--token-dataV-categorical-10', value: '#8F61D1' },
  { name: '--token-dataV-categorical-11', value: '#BF78E9' },
  { name: '--token-dataV-categorical-12', value: '#008280' },
  { name: '--token-dataV-categorical-13', value: '#27AD8E' },
  { name: '--token-dataV-categorical-14', value: '#7BC335' },
];

/**
 * 语义化别名配置
 * 使用 var() 引用已生成的 token 变量
 */
const SEMANTIC_ALIASES = {
  light: {
    '--bg': 'var(--token-bg-body-overlay)',
    '--text': 'var(--palette-neutral-900)',
    '--text-title': 'var(--token-text-title)',
    '--muted': 'var(--token-text-caption)',
    '--border': 'var(--token-line-border-card)',
    '--shadow': '0 1px 2px var(--token-shadow-default-sm), 0 6px 20px var(--token-shadow-default-lg)',
    '--primary': 'var(--token-primary-fill-default)',
    '--primary-contrast': 'var(--palette-neutral-00)',
    '--danger': 'var(--token-function-danger-fill-default)',
    '--success': 'var(--token-function-success-fill-default)',
    '--focus': 'var(--token-primary-fill-transparent-01)',
    '--panel-elevated': 'var(--palette-neutral-00)',
  },
  dark: {
    '--bg': 'var(--token-bg-body-overlay)',
    '--text': 'var(--palette-neutral-900)',
    '--text-title': 'var(--token-text-title)',
    '--muted': 'var(--token-text-caption)',
    '--border': 'var(--token-line-border-card)',
    '--shadow': '0 1px 2px var(--token-shadow-default), 0 12px 30px var(--token-shadow-default)',
    '--primary': 'var(--token-primary-fill-default)',
    '--primary-contrast': 'var(--palette-neutral-00)',
    '--danger': 'var(--token-function-danger-fill-default)',
    '--success': 'var(--token-function-success-fill-default)',
    '--focus': 'var(--token-primary-fill-transparent-01)',
    '--panel-elevated': 'var(--palette-neutral-100)',
  },
};

/**
 * 将 0-1 范围的 RGBA 值转换为 CSS 颜色格式
 * @param {Object} colorOrigin - { r, g, b, a } 范围 0-1
 * @returns {string} CSS 颜色字符串
 */
function rgbaToCSS(colorOrigin) {
  const r = Math.round(colorOrigin.r * 255);
  const g = Math.round(colorOrigin.g * 255);
  const b = Math.round(colorOrigin.b * 255);
  const a = colorOrigin.a;

  if (a === 1) {
    // 完全不透明时使用 hex 格式
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } else {
    // 有透明度时使用 rgba 格式
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
}

/**
 * 将变量名转换为 CSS 变量格式
 * token/text/caption -> --token-text-caption
 * palette/blue/500 -> --palette-blue-500
 * token/transparent/neutral/N00 5% -> --token-transparent-neutral-n00-5pct
 * 
 * @param {string} variableName 
 * @returns {string}
 */
function toCSSVariableName(variableName) {
  // 将 / 替换为 -，处理空格和特殊字符
  const normalized = variableName
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/%/g, 'pct')  // 将 % 替换为 pct（CSS 变量名不支持 %）
    .toLowerCase();
  return `--${normalized}`;
}

/**
 * 生成 CSS 文件内容
 * @param {Array} tokens - token 数组
 * @param {string} themeName - 主题名称 ('light' | 'dark')
 * @returns {string} CSS 文件内容
 */
function generateCSSContent(tokens, themeName) {
  const lines = [
    `/**`,
    ` * 自动生成的 ${themeName === 'light' ? '浅色' : '深色'}主题变量`,
    ` * `,
    ` * 此文件由 scripts/generate-css-variables.cjs 自动生成`,
    ` * 请勿手动编辑此文件！`,
    ` * `,
    ` * 生成时间: ${new Date().toISOString()}`,
    ` * `,
    ` * 包含内容:`,
    ` *   - Token 变量: ${tokens.length} 个`,
    ` *   - 语义别名: ${Object.keys(SEMANTIC_ALIASES[themeName]).length} 个`,
    ` *   - DataV 颜色: ${DATAV_CATEGORICAL_COLORS.length} 个`,
    ` */`,
    ``,
    `:root[data-theme='${themeName}'] {`,
  ];

  // 1. 按类别分组输出 token 变量
  const groups = {};
  tokens.forEach(token => {
    const parts = token.variableName.split('/');
    const category = parts[0] + (parts.length > 1 ? '/' + parts[1] : '');
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(token);
  });

  const sortedCategories = Object.keys(groups).sort();
  sortedCategories.forEach((category, idx) => {
    if (idx > 0) {
      lines.push('');
    }
    lines.push(`  /* ${category} */`);
    
    groups[category].forEach(token => {
      const cssVarName = toCSSVariableName(token.variableName);
      const cssValue = rgbaToCSS(token.colorOrigin);
      lines.push(`  ${cssVarName}: ${cssValue};`);
    });
  });

  // 2. 添加语义别名
  lines.push('');
  lines.push('  /* ==================== */');
  lines.push('  /* 语义别名 (Semantic Aliases) */');
  lines.push('  /* ==================== */');
  const aliases = SEMANTIC_ALIASES[themeName];
  Object.entries(aliases).forEach(([name, value]) => {
    lines.push(`  ${name}: ${value};`);
  });

  // 3. 添加 DataV 图表颜色
  lines.push('');
  lines.push('  /* ==================== */');
  lines.push('  /* DataV 图表调色板 */');
  lines.push('  /* ==================== */');
  DATAV_CATEGORICAL_COLORS.forEach(({ name, value }) => {
    lines.push(`  ${name}: ${value};`);
  });

  // 4. 添加 color-scheme
  lines.push('');
  lines.push('  /* 系统 UI 配色方案 */');
  lines.push(`  color-scheme: ${themeName};`);

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * 主函数
 */
function main() {
  console.log('🎨 Token CSS Variables Generator');
  console.log('================================\n');

  // 检查 token.json 是否存在
  if (!fs.existsSync(TOKEN_JSON_PATH)) {
    console.error(`❌ 错误: 找不到 token.json 文件`);
    console.error(`   路径: ${TOKEN_JSON_PATH}`);
    process.exit(1);
  }

  // 读取 token.json
  console.log(`📖 读取 token.json...`);
  const tokenData = JSON.parse(fs.readFileSync(TOKEN_JSON_PATH, 'utf-8'));

  // 检查数据结构
  const lightTokens = tokenData['浅色模式'];
  const darkTokens = tokenData['深色模式'];

  if (!lightTokens || !darkTokens) {
    console.error('❌ 错误: token.json 格式不正确，需要包含 "浅色模式" 和 "深色模式" 字段');
    process.exit(1);
  }

  console.log(`   浅色模式 tokens: ${lightTokens.length}`);
  console.log(`   深色模式 tokens: ${darkTokens.length}`);

  // 生成浅色主题 CSS
  console.log(`\n🌞 生成浅色主题 CSS...`);
  const lightCSS = generateCSSContent(lightTokens, 'light');
  const lightOutputPath = path.join(OUTPUT_DIR, '_generated-light.css');
  fs.writeFileSync(lightOutputPath, lightCSS, 'utf-8');
  console.log(`   ✅ 已生成: ${lightOutputPath}`);

  // 生成深色主题 CSS
  console.log(`\n🌙 生成深色主题 CSS...`);
  const darkCSS = generateCSSContent(darkTokens, 'dark');
  const darkOutputPath = path.join(OUTPUT_DIR, '_generated-dark.css');
  fs.writeFileSync(darkOutputPath, darkCSS, 'utf-8');
  console.log(`   ✅ 已生成: ${darkOutputPath}`);

  // 输出统计信息
  console.log(`\n📊 统计信息:`);
  
  // 统计类别
  const categories = new Set();
  [...lightTokens, ...darkTokens].forEach(token => {
    const parts = token.variableName.split('/');
    categories.add(parts[0] + (parts.length > 1 ? '/' + parts[1] : ''));
  });
  
  console.log(`   Token 类别数: ${categories.size}`);
  console.log(`   语义别名数: ${Object.keys(SEMANTIC_ALIASES.light).length}`);
  console.log(`   DataV 颜色数: ${DATAV_CATEGORICAL_COLORS.length}`);

  console.log(`\n✨ 完成！`);
}

// 执行
main();
