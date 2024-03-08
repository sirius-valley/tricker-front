import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  {
    extends: './vite.config.ts',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup'
    }
  },
  {
    test: {
      include: ['tests/**/*.{node}.test.{ts,js}'],
      name: 'node',
      environment: 'node'
    }
  }
])
