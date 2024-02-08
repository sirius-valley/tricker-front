import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(path.join(__dirname, '/src/components'))
      },
      {
        find: '@utils',
        replacement: path.resolve(path.join(__dirname, '/src/utils'))
      },
      {
        find: '@hooks',
        replacement: path.resolve(path.join(__dirname, '/src/hooks'))
      },
      {
        find: '@styles',
        replacement: path.resolve(path.join(__dirname, '/src/styles'))
      },
      {
        find: '@assets',
        replacement: path.resolve(path.join(__dirname, '/src/assets'))
      }
    ]
  }
})
