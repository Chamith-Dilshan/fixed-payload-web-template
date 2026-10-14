import { globalIgnores } from "eslint/config"
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = [
  // Next.js configs
  ...nextVitals,
  ...nextTs,

  // Prettier
  prettier,

  {
    settings: {
      react: {
        version: '19.2.6' // Use your actual React version
      }
    }
  },

  // Your custom rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    "out/**",
    "build/**",
    "next-env.d.ts",
    '.next/**',
    'node_modules/**',
    'src/payload-types.ts',
    'src/payload-generated-schema.ts',
  ]),
]

export default eslintConfig
