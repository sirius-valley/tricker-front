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
        find: '@pages',
        replacement: path.resolve(path.join(__dirname, '/src/pages'))
      },
      {
        find: '@assets',
        replacement: path.resolve(path.join(__dirname, '/src/assets'))
      },
      {
        find: '@utils',
        replacement: path.resolve(path.join(__dirname, '/src/utils'))
      },
      {
        find: '@redux',
        replacement: path.resolve(path.join(__dirname, '/src/redux'))
      }
    ]
  }
})
