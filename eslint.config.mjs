import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: ['dist', 'node_modules', 'build', 'eslint.config.mjs', 'vite.config.js'],
  },

  {
    files: ['**/*.js', '**/*.jsx'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, 
        },
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },

    rules: {
      ...js.configs.recommended.rules,
      
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules, 
      
      ...reactHooks.configs.recommended.rules,

      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'windows'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],

      'eqeqeq': ['error', 'always'],
      'no-console': 0, 
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      
     
      'react/prop-types': 'off', 
    },
    
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]