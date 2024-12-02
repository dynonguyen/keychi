import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
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
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-prettier',
      'plugin:@nx/typescript',
      'prettier'
    )
  ),

  { plugins: { '@nx': fixupPluginRules(nx), prettier } },

  ...fixupConfigRules(compat.extends('plugin:@nx/typescript')).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/.vue']
  })),

  // Nx	rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],

          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            },
            {
              sourceTag: 'scope:app:*',
              notDependOnLibsWithTags: ['scope:app:*']
            }
          ],

          allowCircularSelfDependency: true
        }
      ]
    }
  },

  // JS, TS
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

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

      'no-console': [
        'warn',
        {
          allow: ['error', 'warn']
        }
      ],

      camelcase: [
        'warn',
        {
          ignoreGlobals: true,
          ignoreImports: true,
          properties: 'never',
          ignoreDestructuring: true
        }
      ],

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

  ...fixupConfigRules(compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended')).map((config) => ({
    ...config,
    files: ['**/*.tsx', '**/*.jsx']
  })),

  // React
  {
    files: ['**/*.tsx', '**/*.jsx'],

    settings: { react: { version: 'detect' } },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/jsx-fragments': ['error', 'element'],
      'react-hooks/rules-of-hooks': 'error',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              importNames: ['useSearchParams'],
              name: 'react-router-dom',
              message: "Please import { useSafeSearchParams } from '@shared/hooks/react' instead."
            }
          ]
        }
      ]
    }
  }
];
