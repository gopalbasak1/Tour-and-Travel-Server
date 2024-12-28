/* eslint-disable prettier/prettier */
import globals from 'globals'
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config} */
export default {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: tsParser,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error', // Ensures Prettier issues are surfaced
  },
  ignorePatterns: ['node_modules', 'dist'], // Ignore folders
  globals: {
    ...globals.browser,
    ...globals.node,
  },
}
