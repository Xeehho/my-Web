import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginNext from 'eslint-config-next'

const compat = new FlatCompat()

export default [
  {
    ignores: ['node_modules/', '.next/', 'dist/'],
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  pluginNext,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // 自定义规则可以在这里添加
    },
  },
]