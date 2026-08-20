import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import neostandard from 'neostandard'

const eslintConfig = defineConfig([
  ...neostandard({
    ts: true,
    env: ['browser']
  }),
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
])

export default eslintConfig
