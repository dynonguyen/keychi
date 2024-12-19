import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  { plugins: { prettier } },

  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-prettier',
      'prettier'
    )
  ),

  ...fixupConfigRules(compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended')).map((config) => ({
    ...config,
    files: ['**/*.tsx']
  })),

  // JS, TS
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'prettier/prettier': ['warn'],

      'no-console': ['warn', { allow: ['error', 'warn'] }],

      camelcase: ['warn', { ignoreGlobals: true, ignoreImports: true, properties: 'never', ignoreDestructuring: true }],

      'no-warning-comments': [
        'error',
        {
          terms: ['MOCK', 'BUG', 'FIXME'],
          location: 'start'
        }
      ],

      'max-lines': ['error', 500]
    }
  },

  // React
  {
    files: ['**/*.tsx'],
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/jsx-fragments': ['error', 'element'],
      'react-hooks/rules-of-hooks': 'error'
    }
  },

  // React web
  {
    files: ['apps/web/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { importNames: ['useSearchParams'], name: 'react-router-dom', message: "'useSafeSearchParams' instead." }
          ]
        }
      ]
    }
  }
];
