// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

/**
 * 项目 lint 基线
 *
 * 定位：只拦「会导致运行期错误 / 明显的死代码」的问题，不做格式化。
 * 纯排版类规则（缩进、属性顺序、自闭合、换行）全部关闭，避免上万条噪音淹没真实缺陷；
 * 如需统一格式请交给编辑器的 Vue 插件或 Prettier，而不是 lint 闸门。
 */
export default withNuxt(
  {
    ignores: ['.output/**', 'dist/**', 'public/**', 'docs/**', 'scripts/_tmp-*']
  },
  {
    rules: {
      // —— 纯排版，关闭 ——
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',

      // SEO 文案全部来自仓库内静态数据（data/seo/*.js 与 *.vue 模板），不存在用户输入
      'vue/no-v-html': 'off',

      // Vue 3 支持多根节点；组件命名沿用现有约定（AppHeader/Breadcrumb/Toast…）
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',

      // 允许 _ 前缀的占位参数（Feign/回调签名里常见）
      // 存量未使用变量暂降为 warn（约 80 处），清理完成后改回 error
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
      ]
    }
  }
)
